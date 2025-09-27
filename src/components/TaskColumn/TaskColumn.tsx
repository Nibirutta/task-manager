import React, { memo } from 'react';
import style from './TaskColumn.module.css';
import type { TaskStatus } from '../../types/taskTypes';
import { Plus } from 'lucide-react';


interface TaskColumnProps {
  title: string;
  children: React.ReactNode;
  status: TaskStatus;
  taskCount: number;
  isDraggingOver: boolean;
  onAddTask: (status: TaskStatus) => void;
}

function TaskColumn({ title, children, status, taskCount, isDraggingOver, onAddTask }: TaskColumnProps) {
  // Combina as classes dinamicamente para o feedback visual
  const columnClasses = `${style.column} ${isDraggingOver ? style.isDraggingOver : ''}`;

  return (
    // Este 'section' será nosso "drop target".
    // O atributo `data-column-id` é como a biblioteca saberá qual é esta coluna.
    <section className={columnClasses} data-column-id={status}>
      <header className={style.header}>
        <h2 className={style.title}>
          {title}
          <span className={style.taskCount}>{taskCount}</span>
        </h2>
        <button onClick={() => onAddTask(status)} className={style.addButton} aria-label={`Adicionar tarefa em ${title}`}>
          <Plus size={18} />
        </button>
      </header>
      <div className={style.content}>
        {taskCount > 0 ? (
          children
        ) : (
          <div className={style.emptyState}>
            <p>Nenhuma tarefa aqui.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// Envolvemos o componente com React.memo.
// Agora, ele só será re-renderizado se uma de suas props (title, status, taskCount, etc.) mudar.
// Se você mover um card de outra coluna, esta coluna não será re-renderizada.
export default memo(TaskColumn);
