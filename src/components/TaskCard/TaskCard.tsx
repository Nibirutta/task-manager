import { ClockAlert, ClockFading, ClockPlus, Flag, MoreHorizontal } from 'lucide-react';
import style from './TaskCard.module.css';
import type { ITask } from '../../types/taskTypes';
import formatDate from '../../utils/formatDate';

// As props que o componente espera receber.
interface TaskCardProps {
  task: ITask;
  onDetailsClick: (task: ITask) => void;
}

function TaskCard({ task, onDetailsClick }: TaskCardProps) {
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
      Low: 'Baixa',
      Medium: 'Média',
      High: 'Alta',
      Urgent: 'Urgente',
      Optional: 'Opcional'
  }

  const priorityClass = `priority-${task.priority}`;
  const expirationClass = getExpirationStatus(task.dueDate);

  return (
    // Aplicamos a classe de prioridade diretamente no card principal
    <div className={`${style.card} ${style[priorityClass]}`}>
      <header className={style.header}>
        <h3 className={style.title}>{task.title}</h3>
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
      </header>

      <main>
        <div className={style.priority}>
          <Flag size={14} />
          <span>{`Prioridade: ${priorityObject[task.priority]}`}</span>
        </div>
      </main>


      <footer className={style.footer}>
         <div className={expirationClass}>
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
      </footer>
    </div>
  );
}

export default TaskCard;
