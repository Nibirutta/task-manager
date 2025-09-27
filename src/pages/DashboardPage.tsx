import TaskCard from "../components/TaskCard/TaskCard";

const DashboardPage = () => {
  return (
    <div >
      <header >
        <h1 >Meu Quadro de Tarefas</h1>
        {/* Futuramente, aqui teremos filtros e o botão de "Adicionar Tarefa" */}
      </header>

      <TaskCard
        key={1}
        task={{
          id: '1',
          title: "Tarefa 1",
          description: "Descrição da Tarefa 1",
          status: "in-review",
          dueDate: "2023-11-30",
          priority: "Urgent"
        }}
        onDetailsClick={() => {}}
      />
    </div>
  );
};

export default DashboardPage;