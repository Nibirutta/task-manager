import { useEffect, useState, useCallback } from 'react';
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
import TaskDetailsDialog from '../features/TaskDetailsDialog/TaskDetailsDialog';


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
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [taskToView, setTaskToView] = useState<ITask | null>(null);
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

  const fetchTasks = useCallback(async (filters: { title?: string; priority?: TaskPriority | 'all' } = {}) => {
      if (!accessToken) return;
      setLoading(true);
      try {
        const apiParams = {
          title: filters.title || undefined,
          priority: filters.priority === 'all' ? undefined : filters.priority,
        };
        const response = await getTasks(apiParams, accessToken);
        setTasks(response.data || []);
      } catch (error) {
        toast.error('Falha ao buscar as tarefas.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [accessToken] // A função fetchTasks só será recriada se o accessToken mudar.
  );

  // Efeito para buscar tarefas quando os filtros mudam
  useEffect(() => {
    fetchTasks({ title: filterTitle, priority: filterPriority });
  }, [filterTitle, filterPriority, fetchTasks]);

  const handleDetailsClick = (task: ITask) => {
    // Abre o modal de detalhes com a tarefa clicada
    setTaskToView(task);
    setIsDetailsDialogOpen(true);
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

      const taskDataWithDefaultStatus: INewTask = { ...data, status: 'to-do' };

      try {
        const response = await toast.promise(newTask(taskDataWithDefaultStatus, accessToken!), {
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
        tasks={tasks}
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

      <TaskDetailsDialog
        isOpen={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        task={taskToView}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </div>
  );
};

export default DashboardPage;