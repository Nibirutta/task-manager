import React, { useMemo } from 'react';

import TaskColumn from '../TaskColumn/TaskColumn';

import style from './TaskBoard.module.css';
import type { ITask } from '../../types/TaskApiTypes';
import TaskCard from '../../components/TaskCard/TaskCard';

// Define a estrutura e a ordem de nossas colunas.
// O 'id' deve corresponder ao 'status' vindo da API.
const columnsConfig = [
  { id: 'pending', title: 'Pendente' },
  { id: 'in_progress', title: 'Em Progresso' },
  { id: 'completed', title: 'Concluído' },
] as const; // 'as const' torna os tipos mais específicos e seguros.

type ColumnId = typeof columnsConfig[number]['id'];

interface TaskBoardProps {
  tasks: ITask[];
  onDetailsClick: (task: ITask) => void;
}

function TaskBoard({ tasks, onDetailsClick }: TaskBoardProps) {
  // Usamos useMemo para organizar as tarefas em colunas.
  // Isso evita recalcular a cada renderização, a menos que a lista de tarefas mude.
  const tasksByColumn = useMemo(() => {
    const groupedTasks = new Map<ColumnId, ITask[]>();
    columnsConfig.forEach(col => groupedTasks.set(col.id, []));

    tasks.forEach(task => {
      // Garante que o status da tarefa é uma coluna válida antes de tentar colocá-la.
      if (groupedTasks.has(task.status)) {
        groupedTasks.get(task.status)!.push(task);
      }
    });

    return groupedTasks;
  }, [tasks]);

  return (
    <div className={style.board}>
      {columnsConfig.map(column => (
        <TaskColumn key={column.id} title={column.title}>
          {tasksByColumn.get(column.id)?.map(task => (
            <TaskCard key={task.id} task={task} onDetailsClick={onDetailsClick} />
          ))}
        </TaskColumn>
      ))}
    </div>
  );
}

export default TaskBoard;