import  { memo, useEffect, useRef } from 'react';
import style from './TaskColumn.module.css';
import type {  TaskStatus, TaskType } from '../../types/taskServiceTypes';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import TaskCard from '../TaskCard/TaskCard';
import type { ExpirationStatus } from '../../utils/getTaskStatus';
import { useTranslation } from 'react-i18next';


type IProcessedTask = TaskType & {
  expirationStatus: ExpirationStatus;
  formattedDueDate: string;
};

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: IProcessedTask[]; 
  isDraggingOver: boolean;
  onAddTask: (status: TaskStatus) => void;
  onDetailsClick: (task: TaskType) => void;
  onEditClick: (task: TaskType) => void;
  onDeleteClick: (task: TaskType) => void;
  variants?: Variants; // Adiciona a prop variants para receber as variantes do pai
}

function TaskColumn({ 
  title, 
  status, 
  tasks, 
  isDraggingOver, 
  onAddTask,
  onDetailsClick,
  onEditClick,
  onDeleteClick,
  variants, // Recebe as variantes
}: TaskColumnProps) {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return dropTargetForElements({
      element: el,
      getData: () => ({ columnId: status }),
    });
  }, [status]);

  const columnClasses = `${style.column} ${isDraggingOver ? style.isDraggingOver : ''}`;


  const taskIds = tasks.map(t => t.id);
  const hasDuplicates = new Set(taskIds).size !== taskIds.length;
  
  if (hasDuplicates) {
    console.warn(`ALERTA DE DEBUG: Foram encontrados IDs duplicados na coluna "${title}"`, taskIds);
  }

  return (
    <motion.section
      ref={ref}
      className={columnClasses}
      layout
      variants={variants} 
    >
      <header className={style.header}>
        <h2 className={style.title}>
          {title}
          <span className={style.taskCount}>{tasks.length}</span>
        </h2>
        <button onClick={() => onAddTask(status)} className={style.addButton} aria-label={t('taskBoard.column.addTaskLabel', { title })}>
          <Plus size={18} />
        </button>
      </header>

      <div className={style.content}>
        <AnimatePresence>
          {tasks.length > 0 ? (
            // AnimatePresence para os cards individuais
            // TaskCard já tem suas próprias animações de initial, animate, exit e layout
            <AnimatePresence mode="popLayout">
              {tasks.map(task => (
                  <TaskCard 
                    key={task.id}
                    task={task} 
                    onDetailsClick={onDetailsClick} 
                    onEditClick={onEditClick} 
                    onDeleteClick={onDeleteClick} 
                  />
              ))}
            </AnimatePresence>
          ) : (
            // Animação para o estado vazio da coluna
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className={style.emptyState}>
              <p>{t('taskBoard.column.emptyState.drag')}</p>
              <p>
                {t('taskBoard.column.emptyState.create')} <Plus size={18} /> 
              </p>
            </motion.div>
        )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export default memo(TaskColumn);
