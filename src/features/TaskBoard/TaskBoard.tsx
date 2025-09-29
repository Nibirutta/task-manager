import  { useMemo } from 'react';
import style from './TaskBoard.module.css';
import type { ITask, TaskStatus } from '../../types/taskTypes';
import TaskColumn from '../../components/TaskColumn/TaskColumn';
import TaskCard from '../../components/TaskCard/TaskCard';

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
  // Futuramente, receberá a prop onTaskStatusChange
}

function TaskBoard({
  tasks,
  onDetailsClick,
  onEditClick,
  onDeleteClick,
  onAddTask,
}: TaskBoardProps) {

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
            isDraggingOver={false} // Será controlado pelo D&D no futuro
          >
            {columnTasks.map(task => (
              <TaskCard key={task.id} task={task} onDetailsClick={onDetailsClick} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
            ))}
          </TaskColumn>
        );
      })}
    </div>
  );
}

export default TaskBoard;