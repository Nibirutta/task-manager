import React from 'react';
import style from './TaskColumn.module.css';

interface TaskColumnProps {
  title: string;
  children: React.ReactNode;
  // Futuramente, props para o drag-and-drop virão aqui.
}

function TaskColumn({ title, children }: TaskColumnProps) {
  return (
    <section className={style.column}>
      <h2 className={style.title}>{title}</h2>
      <div className={style.content}>
        {children}
      </div>
    </section>
  );
}

export default TaskColumn;
