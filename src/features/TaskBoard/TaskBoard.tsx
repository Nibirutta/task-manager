import { useEffect, useMemo, useState } from 'react';
import style from './TaskBoard.module.css';
import type { ITask, TaskStatus } from '../../types/taskTypes';
import TaskColumn from '../../components/TaskColumn/TaskColumn';
import TaskCard from '../../components/TaskCard/TaskCard';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

// Define a estrutura e a ordem de nossas colunas.
// O 'id' deve corresponder ao 'status' vindo da API.
const columnsConfig: { id: TaskStatus; title: string }[] = [
  { id: 'to-do', title: 'Pendente' },
  { id: 'in-progress', title: 'Em Progresso' },
  { id: 'in-review', title: 'Em Revisão' },
  { id: 'done', title: 'Concluído' },
];

interface TaskBoardProps {
  tasks: ITask[];
  onDetailsClick: (task: ITask) => void;
  onEditClick: (task: ITask) => void;
  onDeleteClick: (task: ITask) => void;
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
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [draggingOverColumn, setDraggingOverColumn] = useState<TaskStatus | null>(null);

  useEffect(() => {
    return monitorForElements({
      onDragStart: ({ source }) => {
        if (source.data.type === 'card') {
          setDraggingTaskId(source.data.taskId as string);
        }
      },
      onDrag: ({ location }) => {
        const destination = location.current.dropTargets[0];
        if (destination) {
          setDraggingOverColumn(destination.data.columnId as TaskStatus);
        } else {
          setDraggingOverColumn(null);
        }
      },
      onDrop: ({ source, location }) => {
        setDraggingTaskId(null);
        setDraggingOverColumn(null);
        const destination = location.current.dropTargets[0];
        if (!destination || source.data.type !== 'card') return;

        const taskId = source.data.taskId as string;
        const newStatus = destination.data.columnId as TaskStatus;

        onTaskStatusChange(taskId, newStatus);
      },
    });
  }, [onTaskStatusChange]);

  const tasksByColumn = useMemo(() => {
    const groupedTasks = new Map<TaskStatus, ITask[]>();
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
            taskCount={columnTasks.length}
            onAddTask={onAddTask}
            isDraggingOver={draggingOverColumn === column.id}
          >
            {columnTasks.map(task => {
              // Oculta o card original enquanto ele está sendo arrastado
              if (task.id === draggingTaskId) {
                return null;
              }
              return <TaskCard key={task.id} task={task} onDetailsClick={onDetailsClick} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />;
            })}
          </TaskColumn>
        );
      })}
    </div>
  );
}

export default TaskBoard;