import { useEffect, useRef, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { ClockAlert, ClockFading, ClockPlus, FilePenLine, Flag, MoreHorizontal, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import style from './TaskCard.module.css';


import PopoverTaskCard from '../PopoverTaskCard/PopoverTaskCard';
import type { ExpirationStatus } from '../../utils/getTaskStatus';
import type { TaskType } from '../../types/taskServiceTypes';


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
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { expirationStatus, formattedDueDate } = task;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Adicionamos onDragStart e onDrop para controlar o estado 'isDragging'
    return draggable({
      element: el,
      getInitialData: () => ({ type: 'card', task: task }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
    });
  }, [task]);

  const priorityObject = {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',
      urgent: 'Urgente',
      optional: 'Opcional'
  } as const;

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
            <span>{priorityObject[task.priority]}</span>
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
          <PopoverTaskCard text="Excluir Tarefa">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(task);
              }}
              className={style.deleteButton}
              aria-label={`Deletar a tarefa ${task.title}`}
            >
              <Trash2 size={18} />
            </button>
          </PopoverTaskCard>

          <PopoverTaskCard text="Editar Tarefa">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditClick(task);
              }}
              className={style.editButton}
              aria-label={`Editar a tarefa ${task.title}`}
            >
              <FilePenLine size={18} />
            </button>
          </PopoverTaskCard>
        </div>

        <PopoverTaskCard text="Ver Detalhes">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDetailsClick(task);
            }}
            className={style.detailsButton}
            aria-label={`Ver detalhes da tarefa ${task.title}`}
          >
            <MoreHorizontal size={18} />
          </button>
        </PopoverTaskCard>
      </footer>
    </motion.div>
  );
}

export default TaskCard;
