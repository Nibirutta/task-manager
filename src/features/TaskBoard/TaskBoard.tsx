import { useEffect, useMemo, useState } from 'react';
import style from './TaskBoard.module.css';
import type {  TaskStatus, TaskType } from '../../types/taskServiceTypes';
import TaskColumn from '../../components/TaskColumn/TaskColumn';


import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { ExpirationStatus } from '../../utils/getTaskStatus';

// Define a estrutura e a ordem de nossas colunas.
// O 'id' deve corresponder ao 'status' vindo da API.
const columnsConfig: { id: TaskStatus; title: string }[] = [
  { id: 'to-do', title: 'Pendente' },
  { id: 'in-progress', title: 'Em Progresso' },
  { id: 'in-review', title: 'Em Revisão' },
  { id: 'done', title: 'Concluído' },
];

// Estende o ITask para incluir as propriedades calculadas no DashboardPage
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
        if (!destination || source.data.type !== 'card') return;

        const taskId = source.data._id as string; // Usa _id
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
            tasks={columnTasks} // Passa o array de dados
            onAddTask={onAddTask}
            isDraggingOver={draggingOverColumn === column.id}
            // Passe as funções de manipulação para a coluna
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