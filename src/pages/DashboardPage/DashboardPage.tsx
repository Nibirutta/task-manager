
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
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import usePageMetadata from "../../hooks/usePageMetadata";

// Variantes para animar o cabeçalho e seus itens em cascata
const headerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

// Tipagem para a tarefa processada, que inclui dados formatados para a UI
export type IProcessedTask = TaskType & {
  expirationStatus: ExpirationStatus;
  formattedDueDate: string;
};

function DashboardPage() {
  const { t } = useTranslation();

  usePageMetadata({
    title: t("dashboard.meta.title"),
    description: t("dashboard.meta.description"),
    ogTitle: t("dashboard.meta.ogTitle"),
    ogDescription: t("dashboard.meta.ogDescription"),
  });

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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : t('dashboard.toast.fetchError');
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [filterPriority, t]); // Re-executa a busca quando o filtro de prioridade muda

  // Efeito para buscar as tarefas na montagem do componente e quando o filtro muda
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const priorityFilterOptions = useMemo(() => [
    { value: 'all' as const, label: t('dashboard.priority.all') },
    { value: 'urgent' as const, label: t('dashboard.priority.urgent') },
    { value: 'high' as const, label: t('dashboard.priority.high') },
    { value: 'medium' as const, label: t('dashboard.priority.medium') },
    { value: 'low' as const, label: t('dashboard.priority.low') },
    { value: 'optional' as const, label: t('dashboard.priority.optional') },
  ], [t]);

  // --- PROCESSAMENTO DE DADOS (MEMOIZATION) ---
  const processedTasks = useMemo((): IProcessedTask[] => {
    return tasks.map(task => ({
      ...task,
      expirationStatus: getTaskExpirationStatus(task.dueDate),
      formattedDueDate: task.dueDate ? formatDate(task.dueDate) : t('dashboard.task.noDueDate'),

    }));
  }, [tasks, t]);

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

      apiCall = createTask({ ...data, dueDate: data.dueDate!.toISOString() });
    }

    await toast.promise(apiCall, {
      pending: isEditing ? t('dashboard.toast.updatePending') : t('dashboard.toast.createPending'),
      success: isEditing ? t('dashboard.toast.updateSuccess') : t('dashboard.toast.createSuccess'),
      error: isEditing ? t('dashboard.toast.updateError') : t('dashboard.toast.createError'),
      
    }  );

    setIsFormOpen(false);
    fetchTasks(); // Re-busca as tarefas para atualizar a UI
  }, [fetchTasks, t]);

  const handleConfirmDelete = useCallback(async (task: TaskType) => {
    // Fecha o modal de detalhes se estiver aberto para a tarefa sendo deletada
    if (taskForDetails?.id === task.id) {
      setIsDetailsOpen(false);
    }

    setIsDeleteConfirmOpen(false);

    await toast.promise(deleteTask(task.id), {
      pending: t('dashboard.toast.deletePending'),
      success: t('dashboard.toast.deleteSuccess'),
      error: t('dashboard.toast.deleteError'),
    });

    fetchTasks(); // Re-busca as tarefas para atualizar a UI
  }, [fetchTasks, taskForDetails?.id, t]);

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
      toast.success(t('dashboard.toast.moveSuccess'), {
        autoClose: 2000,
        position: "bottom-right",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        
      }); 
    } catch (error) {
      toast.error(t('dashboard.toast.moveError'));
      setTasks(originalTasks);
      console.error(error);
    }

  }, [tasks, t]);

  // --- RENDERIZAÇÃO ---

  if (error) {
    return <div className={style.errorState}>Erro: {error}</div>;
  }

  return (
  <>
  
      <BackgroundGrid />
    <div className={style.dashboardContainer}>
      <motion.div
        className={style.header}
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={style.title} variants={headerItemVariants}>{t('dashboard.title')}</motion.h1>
        <motion.div className={style.actions} variants={headerItemVariants}>
          <TaskFilter
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            priorityFilterOptions={priorityFilterOptions}
          />
          <button
            className={style.newTaskButton}
            onClick={fetchTasks}
            disabled={isLoading}
            aria-label={t('dashboard.refreshButtonLabel')}
          >
            <RefreshCw size={24} className={isLoading ? style.spinning : ''} />
          </button>
          <button className={style.newTaskButton}  onClick={() => handleOpenFormForCreate('to-do')} aria-label={t('dashboard.newTaskButtonLabel')}>
            < FilePlus size={24} />
          </button>
        </motion.div>
      </motion.div>

      <div className={style.mainContent}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Spinner size={50} color="var(--column-header-bg)" text={t('dashboard.loadingTasks')} />
            </motion.div>
          ) : (
            <TaskBoard
              key="task-board"
              tasks={processedTasks}
              onAddTask={handleOpenFormForCreate}
              onDeleteClick={handleOpenDeleteConfirm}
              onEditClick={handleOpenFormForEdit}
              onDetailsClick={handleOpenDetails}
              onTaskStatusChange={handleTaskStatusChange}
            />
          )}
        </AnimatePresence>
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
    </>
  );
}

export default DashboardPage;