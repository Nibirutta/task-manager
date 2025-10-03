import { useEffect, useRef } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { ClockAlert, ClockFading, ClockPlus, FilePenLine, Flag, MoreHorizontal, Trash2 } from 'lucide-react';
import style from './TaskCard.module.css';
import type { ITask } from '../../types/taskTypes';

import PopoverTaskCard from '../PopoverTaskCard/PopoverTaskCard';
import type { ExpirationStatus } from '../../utils/getTaskStatus';


// As props que o componente espera receber.
interface TaskCardProps {
  task: ITask & {
    expirationStatus: ExpirationStatus;
    formattedDueDate: string;
  };
  onDetailsClick: (task: ITask) => void;
  onDeleteClick: (task: ITask) => void;
  onEditClick: (task: ITask) => void;
}

function TaskCard({ task, onDetailsClick, onDeleteClick, onEditClick }: TaskCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { _id, status, expirationStatus, formattedDueDate } = task; // Desestrutura _id

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return draggable({
      element: el, // Passa _id como taskId para compatibilidade com o TaskBoard
      getInitialData: () => ({ type: 'card', taskId: _id, status: status }),
    });
  }, [_id, status]);

  const priorityObject = {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',
      urgent: 'Urgente',
      optional: 'Opcional'
  } as const;

  const priorityClass = `priority-${task.priority}`;

  const cardClasses = `${style.card} ${style[priorityClass] || ''}`;

  return (

    <div ref={ref} className={cardClasses}>
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

      <main>
        {/* O badge de prioridade agora fica no corpo do card */}
        <h5 className={style.title}>{task.title}</h5>
      </main>

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
    </div>
  );
}

export default TaskCard;
