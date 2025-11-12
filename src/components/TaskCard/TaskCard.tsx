import { useEffect, useMemo, useRef, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { ClockAlert, ClockFading, ClockPlus, FilePenLine, Flag, MoreHorizontal, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import style from './TaskCard.module.css';


import PopoverTaskCard from '../PopoverTaskCard/PopoverTaskCard';
import type { ExpirationStatus } from '../../utils/getTaskStatus';
import type { TaskPriority, TaskType } from '../../types/taskServiceTypes';
import { useTranslation } from 'react-i18next';


// As props que o componente espera receber.
interface TaskCardProps {
  task: TaskType & {
    expirationStatus: ExpirationStatus;
    formattedDueDate: string;
  };
  onDetailsClick: (task: TaskType) => void;
  onDeleteClick: (task: TaskType) => void;
  onEditClick: (task: TaskType) => void;
}

function TaskCard({ task, onDetailsClick, onDeleteClick, onEditClick }: TaskCardProps) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { expirationStatus, formattedDueDate } = task;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;


    return draggable({
      element: el,
      getInitialData: () => ({ type: 'card', task: task }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
    });
  }, [task]);

  const priorityLabels = useMemo(() => (
    t('taskForm.priority', { returnObjects: true }) as Record<TaskPriority, string>
  ), [t]);

  const priorityClass = `priority-${task.priority}`;

  // Adiciona a classe 'isDragging' condicionalmente
  const cardClasses = `${style.card} ${style[priorityClass] || ''} ${
    isDragging ? style.isDragging : ''}`;

  return (

    <motion.div
      ref={ref}
      className={cardClasses}
      layout="position" // Anima a posição do card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <header className={style.header}>
          <div className={`${style.priority} ${style[priorityClass]}`}>
            <Flag size={14} />
            <span>{priorityLabels[task.priority]}</span>
          </div>
      
        
                 <div className={`${style.badge} ${style[expirationStatus]}`}>
          {expirationStatus === 'expired' ? (
            <ClockAlert size={14} />
          ) : expirationStatus === 'in-time' ? (
            <ClockPlus size={14} />
          ) : (
            <ClockFading size={14} />
          )
          }
          <span>{formattedDueDate}</span>
        </div>
      </header>

      <div className='w-full'>
        <h5 className={style.title}>{task.title}</h5>
      </div>

      <footer className={style.footer}>

        <div className={style.leftFooter}>
          <PopoverTaskCard text={t('taskBoard.card.deletePopover')}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(task);
              }}
              className={style.deleteButton}
              aria-label={t('taskBoard.card.deleteLabel', { title: task.title })}
            >
              <Trash2 size={18} />
            </button>
          </PopoverTaskCard>

          <PopoverTaskCard text={t('taskBoard.card.editPopover')}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditClick(task);
              }}
              className={style.editButton}
              aria-label={t('taskBoard.card.editLabel', { title: task.title })}
            >
              <FilePenLine size={18} />
            </button>
          </PopoverTaskCard>
        </div>

        <PopoverTaskCard text={t('taskBoard.card.detailsPopover')}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDetailsClick(task);
            }}
            className={style.detailsButton}
            aria-label={t('taskBoard.card.detailsLabel', { title: task.title })}
          >
            <MoreHorizontal size={18} />
          </button>
        </PopoverTaskCard>
      </footer>
    </motion.div>
  );
}

export default TaskCard;
