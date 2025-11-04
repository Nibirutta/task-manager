
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import type { TaskPriority, TaskStatus, TaskType } from "../../types/taskServiceTypes";
import { getTaskExpirationStatus,  type ExpirationStatus } from "../../utils/getTaskStatus";
import { createTask, deleteTask, getTasks, updateTask } from "../../api/Task API/services/taskService";
import formatDate from "../../utils/formatDate";

import BackgroundGrid from "./BackgroundGrid";
import TaskFilter from "../../features/TaskFilter/TaskFilter";
import Spinner from "../../components/Spinner/Spinner";
import TaskBoard from '../../features/TaskBoard/TaskBoard';
import TaskFormDialog, { type TaskFormValues } from '../../features/TaskFormDialog/TaskFormDialog';
import TaskDetailsDialog from '../../features/TaskDetailsDialog/TaskDetailsDialog';
import DeleteTaskDialog from "../../features/DeleteTaskDialog/DeleteTaskDialog";
import style from "./DashboardPage.module.css";
import { FilePlus, RefreshCw } from "lucide-react";

// Tipagem para a tarefa processada, que inclui dados formatados para a UI
export type IProcessedTask = TaskType & {
  expirationStatus: ExpirationStatus;
  formattedDueDate: string;
};

const priorityFilterOptions: { value: TaskPriority | 'all'; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'urgent', label: 'Urgente' },
  { value: 'high', label: 'Alta' },
  { value: 'medium', label: 'Média' },
  { value: 'low', label: 'Baixa' },
  { value: 'optional', label: 'Opcional' },
];

function DashboardPage() {
  // --- ESTADOS DE DADOS E UI ---
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- ESTADOS DOS FILTROS ---
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>('all');

  // --- ESTADOS DOS MODAIS (DIALOGS) ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskType | null>(null);
  const [initialStatusForNewTask, setInitialStatusForNewTask] = useState<TaskStatus | undefined>();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [taskForDetails, setTaskForDetails] = useState<TaskType | null>(null);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<TaskType | null>(null);

  // --- LÓGICA DE BUSCA DE DADOS (FETCHING) ---
  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Monta a query string para a API baseada no filtro de prioridade
      const filters = filterPriority === 'all' ? '' : `?priority=${filterPriority}`;
      const fetchedTasks = await getTasks(filters);
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao buscar tarefas.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [filterPriority]); // Re-executa a busca quando o filtro de prioridade muda

  // Efeito para buscar as tarefas na montagem do componente e quando o filtro muda
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // --- PROCESSAMENTO DE DADOS (MEMOIZATION) ---
  const processedTasks = useMemo((): IProcessedTask[] => {
    return tasks.map(task => ({
      ...task,
      expirationStatus: getTaskExpirationStatus(task.dueDate),
      formattedDueDate: task.dueDate ? formatDate(task.dueDate) : 'Sem data',

    }));
  }, [tasks]);

  // --- HANDLERS DE AÇÕES (CRUD) ---

  const handleOpenFormForCreate = useCallback((status: TaskStatus) => {
    setTaskToEdit(null);
    setInitialStatusForNewTask(status);
    setIsFormOpen(true);
  }, []);

  const handleOpenFormForEdit = useCallback((task: TaskType) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  }, []);

  const handleOpenDetails = useCallback((task: TaskType) => {
    setTaskForDetails(task);
    setIsDetailsOpen(true);
  }, []);

  const handleOpenDeleteConfirm = useCallback((task: TaskType) => {
    setTaskToDelete(task);
    setIsDeleteConfirmOpen(true);
  }, []);

  const handleSubmitForm = useCallback(async (data: TaskFormValues, id?: string) => {
    const isEditing = !!id;
    let apiCall;

    if (isEditing) {
      const payload = {
        ...data,
        dueDate: data.dueDate ? data.dueDate.toISOString() : undefined,
      };
      apiCall = updateTask(payload, id);
    } else {
      // Na criação, garantimos que dueDate seja uma string, conforme a API exige.
      // O formulário já define um valor padrão (new Date()), então data.dueDate sempre existirá.
      apiCall = createTask({ ...data, dueDate: data.dueDate!.toISOString() });
    }

    const successMessage = id ? 'Tarefa atualizada com sucesso!' : 'Tarefa criada com sucesso!';

    await toast.promise(apiCall, {
      pending: id ? 'Atualizando tarefa...' : 'Criando tarefa...',
      success: successMessage,
      error: `Falha ao ${id ? 'atualizar' : 'criar'} a tarefa.`,
    });

    setIsFormOpen(false);
    fetchTasks(); // Re-busca as tarefas para atualizar a UI
  }, [fetchTasks]);

  const handleConfirmDelete = useCallback(async (task: TaskType) => {
    // Fecha o modal de detalhes se estiver aberto para a tarefa sendo deletada
    if (taskForDetails?.id === task.id) {
      setIsDetailsOpen(false);
    }

    setIsDeleteConfirmOpen(false);

    await toast.promise(deleteTask(task.id), {
      pending: 'Deletando tarefa...',
      success: 'Tarefa deletada com sucesso!',
      error: 'Falha ao deletar a tarefa.',
    });

    fetchTasks(); // Re-busca as tarefas para atualizar a UI
  }, [fetchTasks, taskForDetails?.id]);

  const handleTaskStatusChange = useCallback(async (taskId: string, newStatus: TaskStatus) => {
    const originalTasks = tasks;

    const optimisticTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(optimisticTasks);

    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (!taskToUpdate) return;

    try {
      await updateTask({ status: newStatus, priority: taskToUpdate.priority }, taskId);
      toast.success('Tarefa movida!'); 
    } catch (error) {
      toast.error('Falha ao mover a tarefa. Desfazendo alteração.');
      setTasks(originalTasks);
      console.error(error);
    }

  }, [tasks]);

  // --- RENDERIZAÇÃO ---

  if (error) {
    return <div className={style.errorState}>Erro: {error}</div>;
  }

  return (
    <div className={style.dashboardContainer}>
      <BackgroundGrid />
      <div className={style.header}>
        <h1 className={style.title}>Meu Painel de Tarefas</h1>
        <div className={style.actions}>
          <TaskFilter
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            priorityFilterOptions={priorityFilterOptions}
          />
          <button
            className={style.newTaskButton}
            onClick={fetchTasks}
            disabled={isLoading}
            aria-label="Atualizar tarefas"
          >
            <RefreshCw size={24} className={isLoading ? style.spinning : ''} />
          </button>
          <button className={style.newTaskButton}  onClick={() => handleOpenFormForCreate('to-do')} aria-label="Criar Nova Tarefa">
            < FilePlus size={24} />
          </button>
        </div>
      </div>

      <div className={style.mainContent}>
        {isLoading ? (
          <Spinner size={50} color="var(--dashboard-page-spinner-color)" text="Carregando tarefas..." />
        ) : (
          <TaskBoard
            tasks={processedTasks}
            onAddTask={handleOpenFormForCreate}
            onDeleteClick={handleOpenDeleteConfirm}
            onEditClick={handleOpenFormForEdit}
            onDetailsClick={handleOpenDetails}
            onTaskStatusChange={handleTaskStatusChange}
          />
        )}
      </div>

      <TaskFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        taskToEdit={taskToEdit}
        initialStatus={initialStatusForNewTask}
        onSubmit={handleSubmitForm}
      />

      <TaskDetailsDialog
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        task={taskForDetails}
        onEditClick={handleOpenFormForEdit}
        onDeleteClick={handleOpenDeleteConfirm}
      />

      <DeleteTaskDialog
        isOpen={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
        task={taskToDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default DashboardPage;