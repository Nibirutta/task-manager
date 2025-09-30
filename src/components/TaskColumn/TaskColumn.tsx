import React, { memo, useEffect, useRef } from 'react';
import style from './TaskColumn.module.css';
import type { TaskStatus } from '../../types/taskTypes';
import { Plus } from 'lucide-react';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';


interface TaskColumnProps {
  title: string;
  children: React.ReactNode;
  status: TaskStatus;
  taskCount: number;
  isDraggingOver: boolean;
  onAddTask: (status: TaskStatus) => void;
}

function TaskColumn({ title, children, status, taskCount, isDraggingOver, onAddTask }: TaskColumnProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return dropTargetForElements({
      element: el,
      getData: () => ({ columnId: status }),
    });
  }, [status]);

  // Combina as classes dinamicamente para o feedback visual
  const columnClasses = `${style.column} ${isDraggingOver ? style.isDraggingOver : ''}`;

  return (
    <section ref={ref} className={columnClasses}>
      <header className={style.header}>
        <h2 className={style.title}>
          {title}
          <span className={style.taskCount}>{taskCount}</span>
        </h2>
        <button onClick={() => onAddTask(status)} className={style.addButton} aria-label={`Adicionar tarefa em ${title}`}>
          <Plus size={18} />
        </button>
      </header>

      <main className={style.content}>
        {taskCount > 0 ? (
          children
        ) : (
          <div className={style.emptyState}>
            <p>Arraste suas tarefas para cá</p>
            <p>
              Ou crie uma nova clicando no <Plus size={18} /> 
            </p>
          </div>
        )}
      </main>
    </section>
  );
}

export default memo(TaskColumn);



