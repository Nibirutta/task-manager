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
          children
      />
    </div>
  );
};

export default DashboardPage;