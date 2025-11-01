import { useEffect, useMemo, useState } from 'react';
import style from './TaskBoard.module.css';
import type {  TaskStatus, TaskType } from '../../types/taskServiceTypes';
import TaskColumn from '../../components/TaskColumn/TaskColumn';

import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { ExpirationStatus } from '../../utils/getTaskStatus';


const columnsConfig: { id: TaskStatus; title: string }[] = [
  { id: 'to-do', title: 'Pendente' },
  { id: 'in-progress', title: 'Em Progresso' },
  { id: 'in-review', title: 'Em Revisão' },
  { id: 'done', title: 'Concluído' },
];

type IProcessedTask = TaskType & {
  expirationStatus: ExpirationStatus;
  formattedDueDate: string;
};
interface TaskBoardProps {
  tasks: IProcessedTask[];
  onDetailsClick: (task: TaskType) => void;
  onEditClick: (task: TaskType) => void;
  onDeleteClick: (task: TaskType) => void;
  onAddTask: (status: TaskStatus) => void;
  onTaskStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

function TaskBoard({
  tasks,
  onDetailsClick,
  onEditClick,
  onDeleteClick,
  onAddTask,
  onTaskStatusChange,
}: TaskBoardProps) {
  const [draggingOverColumn, setDraggingOverColumn] = useState<TaskStatus | null>(null);

  useEffect(() => {
    return monitorForElements({
      onDrag: ({ location }) => {
        const destination = location.current.dropTargets[0];
        if (destination) {
          setDraggingOverColumn(destination.data.columnId as TaskStatus);
        } else {
          setDraggingOverColumn(null);
        }
      },
      onDrop: ({ source, location }) => {
        setDraggingOverColumn(null);
        const destination = location.current.dropTargets[0];
        // Verifica se o dado do 'source' tem o formato esperado
        if (!destination || source.data.type !== 'card' || !source.data.task) return;

        const taskId = (source.data.task as TaskType).id; 
        const newStatus = destination.data.columnId as TaskStatus;

        onTaskStatusChange(taskId, newStatus);
      },
    });
  }, [onTaskStatusChange]);

  const tasksByColumn = useMemo(() => {
    const groupedTasks = new Map<TaskStatus, IProcessedTask[]>();
    // Inicializa o mapa com arrays vazios para todas as colunas definidas
    columnsConfig.forEach(column => {
      groupedTasks.set(column.id, []);
    });
    // Distribui as tarefas recebidas nas colunas correspondentes
    tasks.forEach(task => {
      groupedTasks.get(task.status)?.push(task);
    });
    return groupedTasks;
  }, [tasks]);

  return (
    <div className={style.board}>
      {columnsConfig.map(column => {
        const columnTasks = tasksByColumn.get(column.id) || [];
        return (
          <TaskColumn
            key={column.id}
            title={column.title}
            status={column.id}
            tasks={columnTasks} 
            onAddTask={onAddTask}
            isDraggingOver={draggingOverColumn === column.id}
            onDetailsClick={onDetailsClick}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        );
      })}
    </div>
  );
}

export default TaskBoard;