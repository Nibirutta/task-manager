import { useEffect, useMemo, useState } from 'react';
import style from './TaskBoard.module.css';
import type {  TaskStatus, TaskType } from '../../types/taskServiceTypes';
import TaskColumn from '../../components/TaskColumn/TaskColumn'; 

import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { ExpirationStatus } from '../../utils/getTaskStatus';
import { motion,  type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';

 const boardVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Atraso entre a animação de cada coluna
      delayChildren: 0.2,
    },
  },
};

 const columnVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2, ease: 'easeIn' } },
};

type IProcessedTask = TaskType & {
  expirationStatus: ExpirationStatus;
  formattedDueDate: string;
};
interface TaskBoardProps {
  tasks: IProcessedTask[];
  onDetailsClick: (task: TaskType) => void;
  onEditClick: (task: TaskType) => void;
  onDeleteClick: (task: TaskType) => void;
  onAddTask: (status: TaskStatus) => void;
  onTaskStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

function TaskBoard({
  tasks,
  onDetailsClick,
  onEditClick,
  onDeleteClick,
  onAddTask,
  onTaskStatusChange,
}: TaskBoardProps) {
  const { t } = useTranslation();

  const columnsConfig = useMemo(() => (
    Object.keys(t('taskBoard.columns', { returnObjects: true })) as TaskStatus[]
  ).map(key => ({
    id: key,
    title: t(`taskBoard.columns.${key}`)
  })), [t]);

  const [draggingOverColumn, setDraggingOverColumn] = useState<TaskStatus | null>(null);

  useEffect(() => {
    return monitorForElements({
      onDrag: ({ location }) => {
        const destination = location.current.dropTargets[0];
        if (destination) {
          setDraggingOverColumn(destination.data.columnId as TaskStatus);
        } else {
          setDraggingOverColumn(null);
        }
      },
      onDrop: ({ source, location }) => {
        setDraggingOverColumn(null);
        const destination = location.current.dropTargets[0];
        // Verifica se o dado do 'source' tem o formato esperado
        if (!destination || source.data.type !== 'card' || !source.data.task) return;

        const taskId = (source.data.task as TaskType).id; 
        const newStatus = destination.data.columnId as TaskStatus;

        onTaskStatusChange(taskId, newStatus);
      },
    });
  }, [onTaskStatusChange]);

  const tasksByColumn = useMemo(() => {
    const grouped = new Map<TaskStatus, IProcessedTask[]>();
    columnsConfig.forEach(column => grouped.set(column.id, []));
    tasks.forEach(task => grouped.get(task.status)?.push(task));
    return grouped;
  }, [tasks, columnsConfig]);

  return (
    <motion.div
      className={style.board}
      variants={boardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" 
      layout 
    >
    
      {columnsConfig.map(column => {
        const columnTasks = tasksByColumn.get(column.id) || [];
        return (
          <motion.div
            key={column.id}
            variants={columnVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout // Anima a posição da coluna em si
          >
            <TaskColumn
              title={column.title}
              status={column.id}
              tasks={columnTasks}
              onAddTask={onAddTask}
              isDraggingOver={draggingOverColumn === column.id}
              onDetailsClick={onDetailsClick}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default TaskBoard;