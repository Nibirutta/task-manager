import { useEffect, useState, useCallback, useReducer, useMemo } from 'react';
import { toast } from 'react-toastify';

import { getTasks, deleteTask, newTask, updateTask } from '../../api/Task API/services/taskService';
import type { TaskType, TaskStatus, INewTask, IUpdateTask, TaskPriority } from '../../types/taskServiceTypes';
import TaskBoard from '../../features/TaskBoard/TaskBoard';
import style from './DashboardPage.module.css'
import Spinner from '../../components/Spinner/Spinner';
import DeleteTaskDialog from '../../features/DeleteTaskDialog/DeleteTaskDialog';
import TaskFormDialog from '../../features/TaskFormDialog/TaskFormDialog';

// import { Input } from '../../lib/Reui/input/input';

import TaskDetailsDialog from '../../features/TaskDetailsDialog/TaskDetailsDialog';
import getTaskStatus from '../../utils/getTaskStatus'; // Importa a função pura, não o default export
import FlickeringGrid from '../../lib/magicUI/grid';
import TaskFilter from '../../features/TaskFilter/TaskFilter';


// Reducer para gerenciar o estado dos diálogos
type DialogState = {
  delete: { isOpen: boolean; task: TaskType | null };
  form: { isOpen: boolean; task: TaskType | null; initialStatus?: TaskStatus };
  details: { isOpen: boolean; task: TaskType | null };
};

type DialogAction =
  | { type: 'OPEN_DELETE'; payload: TaskType }
  | { type: 'OPEN_DETAILS'; payload: TaskType }
  | { type: 'OPEN_FORM'; payload: { task: TaskType | null; initialStatus?: TaskStatus } }
  | { type: 'CLOSE_ALL' };

const initialDialogState: DialogState = {
  delete: { isOpen: false, task: null },
  form: { isOpen: false, task: null },
  details: { isOpen: false, task: null },
};

const dialogReducer = (state: DialogState, action: DialogAction): DialogState => {
  switch (action.type) {
    case 'OPEN_DELETE':
      return { ...initialDialogState, delete: { isOpen: true, task: action.payload } };
    case 'OPEN_DETAILS':
      return { ...initialDialogState, details: { isOpen: true, task: action.payload } };
    case 'OPEN_FORM':
      return { ...initialDialogState, form: { isOpen: true, ...action.payload } };
    case 'CLOSE_ALL':
      return initialDialogState;
    default:
      return state;
  }
};

const DashboardPage = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(false);

  // Estado dos diálogos gerenciado pelo reducer
  const [dialogState, dispatchDialog] = useReducer(dialogReducer, initialDialogState);

  // Estados para os filtros
  const [filterTitle] = useState('');
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>('all');

  const priorityFilterOptions: { value: TaskPriority | 'all'; label: string }[] = [
    { value: 'all', label: 'Todas as Prioridades' },
    ...['urgent', 'high', 'medium', 'low', 'optional'].map(p => ({
      value: p as TaskPriority,
      label: p.charAt(0).toUpperCase() + p.slice(1)
    }))
  ];

  // Processa as tarefas com useMemo para adicionar status de expiração e aplicar filtros
  const processedTasks = useMemo(() => {
    return tasks
      .map(task => {
        const { expirationStatus, formattedDueDate } = getTaskStatus(task.dueDate); 
        return { ...task, expirationStatus, formattedDueDate };
      })
      .filter(task => {
        const titleMatch = filterTitle
          ? task.title.toLowerCase().includes(filterTitle.toLowerCase())
          : true;
        const priorityMatch = filterPriority === 'all'
          ? true
          : task.priority === filterPriority;
        
        return titleMatch && priorityMatch;
      });
  }, [tasks, filterTitle, filterPriority]);


  const fetchTasks = useCallback(
    async (filters: { title?: string; priority?: TaskPriority | 'all' } = {}) => 
      {
      setLoading(true);
      try {
        const apiParams = {
          title: filters.title || undefined,
          priority: filters.priority === 'all' ? undefined : filters.priority,
        }
        const tasksResponse: TaskType[] = await getTasks(apiParams);
        setTasks(tasksResponse || []);
      } catch (error) {
        toast.error('Falha ao buscar as tarefas.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [] 
  );


  useEffect(() => {
    fetchTasks({ priority: filterPriority });
  }, [filterPriority, fetchTasks]);

  // Abre o modal de detalhes com a tarefa clicada
  const handleDetailsClick = (task: TaskType) => {
    dispatchDialog({ type: 'OPEN_DETAILS', payload: task });
  };

  // Abre o modal de formulário para edição
  const handleEditClick = (task: TaskType) => {
    dispatchDialog({ type: 'OPEN_FORM', payload: { task } });
  };

  // Abre o modal de confirmação pra deletar
  const handleDeleteClick = (task: TaskType) => {
    dispatchDialog({ type: 'OPEN_DELETE', payload: task });
  };

  // Função chamada pelo modal ao confirmar
  const handleConfirmDelete = async (task: TaskType) => {
    const originalTasks = tasks;
    setTasks(tasks.filter(t => t._id !== task._id));
    dispatchDialog({ type: 'CLOSE_ALL' });

    try {
      await toast.promise(deleteTask({ _id: task._id }), {
        pending: 'Excluindo tarefa...',
        success: 'Tarefa excluída com sucesso!',
        error: 'Falha ao excluir a tarefa.',
      });
    } catch (error) {
      // Rollback em caso de erro
      setTasks(originalTasks);
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const handleTaskStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    const originalTasks = tasks; 

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try { 
      const updateData: IUpdateTask = { _id: taskId, status: newStatus };
      await updateTask(updateData);
    } catch (err) {
      toast.error('Falha ao mover a tarefa.');
      console.error(err)
      setTasks(originalTasks); // Reverte o estado em caso de erro
    }
  };

  // Abre o modal de formulário para criação
  const handleAddTask = (status: TaskStatus) => {
    dispatchDialog({ type: 'OPEN_FORM', payload: { task: null, initialStatus: status } });
  };

  // Função chamada pelo formulário ao submeter
  const handleFormSubmit = async (data: INewTask | IUpdateTask) => {
    const isEditing = '_id' in data; 

    if (isEditing) {
      try {
        const response = await toast.promise(updateTask(data as IUpdateTask), {
          pending: 'Atualizando tarefa...',
          success: 'Tarefa atualizada com sucesso!',
          error: 'Falha ao atualizar a tarefa.',
        });
        setTasks(tasks.map(t => (t._id === response.data._id ? response.data : t))); // Compara pelo _id
        dispatchDialog({ type: 'CLOSE_ALL' });
      } catch (error) {
        console.error('Erro ao editar tarefa:', error);
      }
    } else {

      try {
        const response = await toast.promise(newTask(data as INewTask), {
          pending: 'Criando nova tarefa...',
          success: 'Nova tarefa criada com sucesso!',
          error: 'Falha ao criar a tarefa.',
        });

        setTasks(prevTasks => [...prevTasks, response.data]);
        dispatchDialog({ type: 'CLOSE_ALL' });
      } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
      }
    }
  };

  return (
    <>

    <FlickeringGrid 
        className="absolute inset-0 z-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#14213d"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
    <div className={style.dashboardContainer}>


      <header className={style.header}>
        <h1 className={style.title}>Meu Quadro de Tarefas</h1>
        <div className={style.filters}>
{/*           <Input
            type="text"
            placeholder="Buscar por título..."
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
            className={style.filterInput}
          /> */}
          <TaskFilter
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            priorityFilterOptions={priorityFilterOptions}
          />
        </div>
      </header>
      
      {loading ? ( 
        <Spinner/>
      ): (       
        <TaskBoard
        tasks={processedTasks}
        onDetailsClick={handleDetailsClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onAddTask={handleAddTask}
        onTaskStatusChange={handleTaskStatusChange}
      />
      )}
      
      <DeleteTaskDialog
        isOpen={dialogState.delete.isOpen}
        onOpenChange={() => dispatchDialog({ type: 'CLOSE_ALL' })}
        task={dialogState.delete.task}
        onConfirm={handleConfirmDelete}
      />

      <TaskFormDialog
        isOpen={dialogState.form.isOpen}
        onOpenChange={() => dispatchDialog({ type: 'CLOSE_ALL' })}
        taskToEdit={dialogState.form.task}
        initialStatus={dialogState.form.initialStatus}
        onSubmit={handleFormSubmit}
      />

      <TaskDetailsDialog
        isOpen={dialogState.details.isOpen}
        onOpenChange={() => dispatchDialog({ type: 'CLOSE_ALL' })}
        task={dialogState.details.task}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </div>
    </>
  );
};

export default DashboardPage;