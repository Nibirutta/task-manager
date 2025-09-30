import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { getTasks, deleteTask, newTask, updateTask } from '../api/Task API/services/taskService';
import type { ITask, TaskStatus, INewTask, IUpdateTask, TaskPriority } from '../types/taskTypes';
import TaskBoard from '../features/TaskBoard/TaskBoard';
import style from './DashboardPage.module.css'
import Spinner from '../components/Spinner/Spinner';
import DeleteTaskDialog from '../features/DeleteTaskDialog/DeleteTaskDialog';
import TaskFormDialog from '../features/TaskFormDialog/TaskFormDialog';
import { Input } from '../lib/Reui/input/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../lib/Reui/select/select';


const DashboardPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  // Estados para controlar os modais
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null);
  const [initialStatusForNewTask, setInitialStatusForNewTask] = useState<TaskStatus | undefined>(undefined);
  // Estados para os filtros
  const [filterTitle, setFilterTitle] = useState('');
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>('all');

  const priorityFilterOptions: { value: TaskPriority | 'all'; label: string }[] = [
    { value: 'all', label: 'Todas as Prioridades' },
    ...['urgent', 'high', 'medium', 'low', 'optional'].map(p => ({
      value: p as TaskPriority,
      label: p.charAt(0).toUpperCase() + p.slice(1)
    }))
  ];

  useEffect(() => {
    if (!accessToken) return;

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await getTasks({}, accessToken);
        if (response.data) {
          setTasks(response.data);
        }
      } catch (error) {
        toast.error('Falha ao buscar as tarefas.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();

  }, [accessToken]);

  const handleDetailsClick = (task: ITask) => {

    console.log('Abrindo detalhes para:', task);
    toast.info(`Detalhes: ${task.title}`);
  };

  // Abre o modal de formulário para edição
  const handleEditClick = (task: ITask) => {
    setTaskToEdit(task);
    setIsFormDialogOpen(true);
  };

  // Abre o modal de confirmação
  const handleDeleteClick = (task: ITask) => {
    setTaskToDelete(task);
    setIsDeleteDialogOpen(true);
  };

  // Função chamada pelo modal ao confirmar
  const handleConfirmDelete = async (task: ITask) => {
    try {
      await toast.promise(deleteTask({ id: task.id }, accessToken!), {
        pending: 'Excluindo tarefa...',
        success: 'Tarefa excluída com sucesso!',
        error: 'Falha ao excluir a tarefa.',
      });
      // Remove a tarefa do estado local
      setTasks(tasks.filter(t => t.id !== task.id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const handleTaskStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    const originalTasks = tasks;
    // Atualiza o estado local otimisticamente para uma UI mais rápida
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      const updateData: IUpdateTask = { id: taskId, status: newStatus };
      await updateTask(updateData, accessToken!);
      toast.success('Tarefa movida com sucesso!');
    } catch (err) {
      toast.error('Falha ao mover a tarefa.');
      console.error(err)
      setTasks(originalTasks); // Reverte o estado em caso de erro
    }
  };

  // Abre o modal de formulário para criação
  const handleAddTask = (status: TaskStatus) => {
    setTaskToEdit(null); // Garante que estamos no modo de criação
    setInitialStatusForNewTask(status);
    setIsFormDialogOpen(true);
  };

  // Função chamada pelo formulário ao submeter
  const handleFormSubmit = async (data: INewTask | IUpdateTask) => {
    const isEditing = 'id' in data;

    if (isEditing) {
      try {
        const response = await toast.promise(updateTask(data, accessToken!), {
          pending: 'Atualizando tarefa...',
          success: 'Tarefa atualizada com sucesso!',
          error: 'Falha ao atualizar a tarefa.',
        });
        setTasks(tasks.map(t => (t.id === data.id ? response.data : t)));
      } catch (error) {
        console.error('Erro ao editar tarefa:', error);
      }
    } else {
      try {
        const response = await toast.promise(newTask(data, accessToken!), {
          pending: 'Criando nova tarefa...',
          success: 'Nova tarefa criada com sucesso!',
          error: 'Falha ao criar a tarefa.',
        });
        setTasks([...tasks, response.data]);
      } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
      }
    }
  };

  // Filtra as tarefas com base nos estados de filtro
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const titleMatch = task.title.toLowerCase().includes(filterTitle.toLowerCase());
      const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
      return titleMatch && priorityMatch;
    });
  }, [tasks, filterTitle, filterPriority]);

  return (
    <div className={style.dashboard}>
      <header className={style.header}>
        <h1 className={style.title}>Meu Quadro de Tarefas</h1>
        <div className={style.filters}>
          <Input
            type="text"
            placeholder="Buscar por título..."
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
            className={style.filterInput}
          />
          <Select value={filterPriority} onValueChange={(value) => setFilterPriority(value as TaskPriority | 'all')}>
            <SelectTrigger className={style.filterSelect}>
              <SelectValue placeholder="Filtrar por prioridade" />
            </SelectTrigger>
            <SelectContent>
              {priorityFilterOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>
      {loading ? ( 
        Spinner(32, '#0d1b2a', 'Carregando...')
      ): (       <TaskBoard
        tasks={filteredTasks}
        onDetailsClick={handleDetailsClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onAddTask={handleAddTask}
        onTaskStatusChange={handleTaskStatusChange}
      />)}
      
      <DeleteTaskDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        task={taskToDelete}
        onConfirm={handleConfirmDelete}
      />

      <TaskFormDialog
        isOpen={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        taskToEdit={taskToEdit}
        initialStatus={initialStatusForNewTask}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default DashboardPage;