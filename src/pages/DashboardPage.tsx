import TaskCard from "../components/TaskCard/TaskCard";
import TaskColumn from "../components/TaskColumn/TaskColumn";


const DashboardPage = () => {
  return (
    <div >
      <header >
        <h1 >Meu Quadro de Tarefas</h1>
        {/* Futuramente, aqui teremos filtros e o botão de "Adicionar Tarefa" */}
      </header>

      <TaskColumn
          title="em progresso"
          key='1'
          status="in-progress"
          children= 
          {<>
                <TaskCard
                  key={'first'}
                  onDetailsClick={() => {}}
                  onDeleteClick={() => {}}
                  onEditClick={() => {}}
                  task={{
                    title: 'Primeira tarefa',
                    description: 'Esta é a descrição da primeira tarefa',
                    status: 'in-progress',
                    id: '1',
                    priority: 'low',
                    dueDate:'2025-09-28' ,
                  }}
                />

                <TaskCard
                  key={'second'}
                  onDetailsClick={() => {}}
                  onDeleteClick={() => {}}
                  onEditClick={() => {}}
                  task={{
                    title: 'Segunda tarefa',
                    description: 'Esta é a descrição da segunda tarefa',
                    status: 'in-progress',
                    id: '2',
                    priority: 'medium',
                    dueDate:'2025-09-29' ,
                  }}
                />
          </>
          }
          taskCount={2}
          isDraggingOver={false}
          onAddTask={() => {}}
      />

    </div>
  );
};

export default DashboardPage;