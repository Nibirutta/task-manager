import { useEffect } from "react";
import TaskDetailsDialog from "../features/TaskDetailsDialog/TaskDetailsDialog";



const HomePage = () => {
  useEffect(() => {
    document.title = "Task Manager | Home";
  }, []);
  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-center">Página de Home</h1>

      <TaskDetailsDialog
        isOpen={true}
        onOpenChange={() => {}}
        task={{
          id: '1',
          title: 'Título da Tarefa',
          description: 'Descrição da tarefa',
          dueDate: '2025-01-01',
          priority: 'urgent',
          status: 'to-do'

        }}
      />
    </div>
  );
};

export default HomePage;

