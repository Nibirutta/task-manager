import  { memo, useEffect, useRef } from 'react';
import style from './TaskColumn.module.css';
import type {  TaskStatus, TaskType } from '../../types/taskServiceTypes';
import { Plus } from 'lucide-react';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import TaskCard from '../TaskCard/TaskCard'; // Importe o TaskCard aqui
import type { ExpirationStatus } from '../../utils/getTaskStatus';

// Adicione as props que o TaskCard precisa
type IProcessedTask = TaskType & {
  expirationStatus: ExpirationStatus;
  formattedDueDate: string;
};

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: IProcessedTask[]; // Recebe o array de tarefas
  isDraggingOver: boolean;
  onAddTask: (status: TaskStatus) => void;
  // Adicione as funções que serão passadas para o TaskCard
  onDetailsClick: (task: TaskType) => void;
  onEditClick: (task: TaskType) => void;
  onDeleteClick: (task: TaskType) => void;
}

function TaskColumn({ 
  title, 
  status, 
  tasks, 
  isDraggingOver, 
  onAddTask,
  onDetailsClick,
  onEditClick,
  onDeleteClick
}: TaskColumnProps) {
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


  const taskIds = tasks.map(t => t.id);
  const hasDuplicates = new Set(taskIds).size !== taskIds.length;
  
  if (hasDuplicates) {
    console.warn(`ALERTA DE DEBUG: Foram encontrados IDs duplicados na coluna "${title}"`, taskIds);
  }

  return (
    <section ref={ref} className={columnClasses}>
      <header className={style.header}>
        <h2 className={style.title}>
          {title}
          <span className={style.taskCount}>{tasks.length}</span>
        </h2>
        <button onClick={() => onAddTask(status)} className={style.addButton} aria-label={`Adicionar tarefa em ${title}`}>
          <Plus size={18} />
        </button>
      </header>

      <main className={style.content}>
        {tasks.length > 0 ? (
          
          tasks.map(task => {
            return (
              <TaskCard 
                key={task.id}
                task={task} 
                onDetailsClick={onDetailsClick} 
                onEditClick={onEditClick} 
                onDeleteClick={onDeleteClick} 
              />
            );
          })
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
