import { ClockAlert, ClockFading, ClockPlus, FilePenLine, Flag, MoreHorizontal, Trash2 } from 'lucide-react';
import style from './TaskCard.module.css';
import type { ITask } from '../../types/taskTypes';
import formatDate from '../../utils/formatDate';

// As props que o componente espera receber.
interface TaskCardProps {
  task: ITask;
  onDetailsClick: (task: ITask) => void;
  onDeleteClick: (task: ITask) => void;
  onEditClick: (task: ITask) => void;
}

function TaskCard({ task, onDetailsClick, onDeleteClick, onEditClick}: TaskCardProps) {
  const formattedDueDate = formatDate(task.dueDate);

  const getExpirationStatus = (dueDate: string): 'expired' | 'deadline' | 'in-time' => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normaliza para o início do dia

    const due = new Date(dueDate);
    // A data da API já vem como YYYY-MM-DD, o que o construtor de Date interpreta como UTC.
    // Para evitar problemas de fuso, adicionamos o fuso horário local.
    const timeZoneOffset = due.getTimezoneOffset() * 60000;
    const dueLocal = new Date(due.getTime() + timeZoneOffset);
    dueLocal.setHours(0, 0, 0, 0);

    const timeDiff = dueLocal.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) {
      return 'expired';
    } else if (daysDiff <= 1) { // Vence hoje ou amanhã
      return 'deadline';
    } else {
      return 'in-time';
    }
  };

  const priorityObject = {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',
      urgent: 'Urgente',
      optional: 'Opcional'
  } as const;

  const priorityClass = `priority-${task.priority}`;
  const expirationClass = getExpirationStatus(task.dueDate);


  const cardClasses = `${style.card} ${style[priorityClass] || ''}`;

  return (

    <div className={cardClasses}>
      <header className={style.header}>
          <div className={`${style.priority} ${style[priorityClass]}}`}>
            <Flag size={14} />
            <span>{priorityObject[task.priority]}</span>
          </div>
      
        
                 <div className={`${style.badge} ${style[expirationClass]}`}>
          {expirationClass === 'expired' ? (
            <ClockAlert size={14} />
          ) : expirationClass === 'in-time' ? (
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
        </div>


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
      </footer>
    </div>
  );
}

export default TaskCard;
