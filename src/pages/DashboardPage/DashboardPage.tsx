import { useEffect, useState, useCallback, useReducer, useMemo } from 'react';
import { toast } from 'react-toastify';
import { getTasks, deleteTask,  updateTask, createTask } from '../../api/Task API/services/taskService';
import TaskBoard from '../../features/TaskBoard/TaskBoard';
import style from './DashboardPage.module.css'
import Spinner from '../../components/Spinner/Spinner';
import DeleteTaskDialog from '../../features/DeleteTaskDialog/DeleteTaskDialog';
import TaskFormDialog, { type TaskFormValues } from '../../features/TaskFormDialog/TaskFormDialog';

import TaskDetailsDialog from '../../features/TaskDetailsDialog/TaskDetailsDialog';
import getTaskStatus from '../../utils/getTaskStatus'; // Importa a função pura, não o default export
import FlickeringGrid from '../../lib/magicUI/grid';
import TaskFilter from '../../features/TaskFilter/TaskFilter';
import { handleApiError } from '../../utils/handleApiError';

import type { CreatTaskRequestType, TaskPriority, TaskStatus, TaskType, UpdateTaskRequestType } from '../../types/taskServiceTypes';


// gerenciador de estados do dialog
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

  // Estado dos dialogs gerenciado pelo reducer
  const [dialogState, dispatchDialog] = useReducer(dialogReducer, initialDialogState);

  // Estados para os filtros

  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>('all');

  const priorityFilterOptions: { value: TaskPriority | 'all'; label: string }[] = [
    { value: 'all', label: 'Todas as Prioridades' },
    ...['urgent', 'high', 'medium', 'low', 'optional'].map(p => ({
      value: p as TaskPriority,
      label: p.charAt(0).toUpperCase() + p.slice(1)
    }))
  ];

  // Apenas processa as tarefas para adicionar dados de UI, sem filtrar.
  // A filtragem agora é responsabilidade exclusiva do backend via `fetchTasks`.
  const processedTasks = useMemo(() => {
    return tasks
      .map(task => {
        const { expirationStatus, formattedDueDate } = getTaskStatus(task.dueDate); 
        return { ...task, expirationStatus, formattedDueDate };
      });
  }, [tasks]);


  const fetchTasks = useCallback(
    async (filters: { title?: string; priority?: TaskPriority | 'all' } = {}) => 
      {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.priority && filters.priority !== 'all') {
        queryParams.append('priority', filters.priority);
      }
      try {
        const tasksResponse = await getTasks(queryParams.toString());
        setTasks(tasksResponse);
      } catch (error) {
        handleApiError(error, 'Falha ao buscar as tarefas.');
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
    setTasks(tasks.filter(t => t.id !== task.id));
    dispatchDialog({ type: 'CLOSE_ALL' });

    try {
      await toast.promise(deleteTask(task.id), {
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
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (!taskToUpdate) return;

    // Evita chamada de API se o status não mudou
    if (taskToUpdate.status === newStatus) {
      return;
    }

    const originalTasks = tasks;
    // Atualização Otimista: Mude o estado local primeiro
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );


    try {
      const updateData = {
        status: newStatus, // O novo status
        priority: taskToUpdate.priority // A prioridade atual da tarefa
      };

      // O toast.promise resolve com o valor de sucesso da promessa.
      // Neste caso, UpdateTaskResponseType, que é { task: TaskType }.
      const updateResponse = await toast.promise(
        updateTask(updateData,taskId),
        {
          pending: 'Atualizando status da tarefa...',
          success: 'Status da tarefa atualizado com sucesso!',
          error: 'Falha ao atualizar o status da tarefa.',
        }
      );
      // Adicionamos uma verificação para garantir que a resposta e a tarefa existem.
      if (updateResponse && updateResponse.task) {
        // Sincroniza o estado com a resposta final da API (que pode ter `updatedAt` etc.)
        setTasks(prevTasks =>
          prevTasks.map(task => (task.id === taskId ? updateResponse.task : task))
        );
      }
    } catch (error) {
      setTasks(originalTasks); // Rollback em caso de erro
      console.error('Erro ao atualizar o status da tarefa:', error);
    }
  };

  // Abre o modal de formulário para criação
  const handleAddTask = (status: TaskStatus) => {
    dispatchDialog({ type: 'OPEN_FORM', payload: { task: null, initialStatus: status } });
  };

  // Função chamada pelo formulário ao submeter
  const handleFormSubmit = async (formData: TaskFormValues, id?: string) => {
    const isEditing = !!id;

    if (isEditing) {
      // Lógica de Edição
      const updateData: UpdateTaskRequestType = {
        ...formData,
        // Converte para ISO string se a data existir, caso contrário, envia undefined
        // para que a API saiba que deve remover ou não alterar a data.
        dueDate: formData.dueDate ? formData.dueDate.toISOString() : undefined,
      };

      try {
        const updateResponse = await toast.promise(updateTask(updateData, id), {
          pending: 'Atualizando tarefa...',
          success: 'Tarefa atualizada com sucesso!',
          error: 'Falha ao atualizar a tarefa.',
        });
        if (updateResponse && updateResponse.task) {
          setTasks(prevTasks => prevTasks.map(t => (t.id === id ? updateResponse.task : t)));
        }
        dispatchDialog({ type: 'CLOSE_ALL' });
      } catch (error) {
        console.error('Erro ao editar tarefa:', error);
      }
    } else {
      // Lógica de Criação
      const createData: CreatTaskRequestType = {
        ...formData,
        dueDate: formData.dueDate!.toISOString(), // Garante que a data está no formato string ISO
      };

      try {
        const createResponse = await toast.promise(createTask(createData), {
          pending: 'Criando nova tarefa...',
          success: 'Nova tarefa criada com sucesso!',
          error: 'Falha ao criar a tarefa.',
        });

        if (createResponse && createResponse.task) {
          setTasks(prevTasks => [...prevTasks, createResponse.task]);
        }
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