import { useEffect, useState } from "react";
import { getTasks } from "../api/Task API/services/taskService";
import useAuth from "../hooks/useAuth";
import type { ITask } from "../types/TaskApiTypes";
import style from "./styles/DashboardPage.module.css";
import { toast } from "react-toastify";
import TaskBoard from "../features/TaskBoard/TaskBoard";

const DashboardPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAuth();

  useEffect(() => {
    document.title = "Task Manager | Dashboard";

    const fetchTasks = async () => {
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const fetchedTasks = await getTasks({}, accessToken);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        toast.error("Não foi possível carregar suas tarefas.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [accessToken]);

  // Função que será chamada quando um card for clicado
  const handleDetailsClick = (task: ITask) => {
    // TODO: Implementar a lógica para abrir um dialog com os detalhes da tarefa.
    console.log("Abrindo detalhes para:", task);
    toast.info(`Abrir detalhes da tarefa: ${task.title}`);
  };

  if (isLoading) {
    return <div className={style.loading}>Carregando tarefas...</div>;
  }

  return (
    <div className={style.dashboardContainer}>
      <header className={style.header}>
        <h1 className={style.title}>Meu Quadro de Tarefas</h1>
        {/* Futuramente, aqui teremos filtros e o botão de "Adicionar Tarefa" */}
      </header>
      <TaskBoard tasks={tasks} onDetailsClick={handleDetailsClick} />
    </div>
  );
};

export default DashboardPage;