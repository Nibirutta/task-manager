import  { memo, useEffect, useRef } from 'react';
import style from './TaskColumn.module.css';
import type {  TaskStatus, TaskType } from '../../types/taskServiceTypes';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import TaskCard from '../TaskCard/TaskCard';
import type { ExpirationStatus } from '../../utils/getTaskStatus';


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

  const columnClasses = `${style.column} ${isDraggingOver ? style.isDraggingOver : ''}`;


  const taskIds = tasks.map(t => t.id);
  const hasDuplicates = new Set(taskIds).size !== taskIds.length;
  
  if (hasDuplicates) {
    console.warn(`ALERTA DE DEBUG: Foram encontrados IDs duplicados na coluna "${title}"`, taskIds);
  }

  return (
    <motion.section ref={ref} className={columnClasses} layout>
      <header className={style.header}>
        <h2 className={style.title}>
          {title}
          <span className={style.taskCount}>{tasks.length}</span>
        </h2>
        <button onClick={() => onAddTask(status)} className={style.addButton} aria-label={`Adicionar tarefa em ${title}`}>
          <Plus size={18} />
        </button>
      </header>

      <div className={style.content}>
        <AnimatePresence>
          {tasks.length > 0 ? (
            tasks.map(task => (
                <TaskCard 
                  key={task.id}
                  task={task} 
                  onDetailsClick={onDetailsClick} 
                  onEditClick={onEditClick} 
                  onDeleteClick={onDeleteClick} 
                />
            ))
          ) : (
          <div className={style.emptyState}>
            <p>Arraste suas tarefas para cá</p>
            <p>
              Ou crie uma nova clicando no <Plus size={18} /> 
            </p>
          </div>
        )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export default memo(TaskColumn);
