import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { getTasks, deleteTask, newTask, updateTask } from '../api/Task API/services/taskService';
import type { ITask, TaskStatus, INewTask, IUpdateTask } from '../types/taskTypes';
import TaskBoard from '../features/TaskBoard/TaskBoard';
import style from './styles/DashboardPage.module.css';
import Spinner from '../components/Spinner/Spinner';
import DeleteTaskDialog from '../features/DeleteTaskDialog/DeleteTaskDialog';


const DashboardPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useAuth();
  // Estados para controlar o modal de exclusão
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null);

  useEffect(() => {
    if (!accessToken) return;

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await getTasks({}, accessToken);
        if (response.data) {
          setTasks(response.data);
        }
      } catch (error) {
        toast.error('Falha ao buscar as tarefas.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();

  }, [accessToken]);

  const handleDetailsClick = (task: ITask) => {

    console.log('Abrindo detalhes para:', task);
    toast.info(`Detalhes: ${task.title}`);
  };

  const handleEditClick = async (task: ITask) => {
    // Simula a edição abrindo um prompt. No futuro, isso abrirá um modal/formulário.
    const newTitle = prompt('Digite o novo título da tarefa:', task.title);
    if (!newTitle || newTitle === task.title) {
      toast.info('Edição cancelada.');
      return;
    }

    const updatedTaskData: IUpdateTask = { id: task.id, title: newTitle };

    try {
      const response = await toast.promise(
        updateTask(updatedTaskData, accessToken!),
        {
          pending: 'Atualizando tarefa...',
          success: 'Tarefa atualizada com sucesso!',
          error: 'Falha ao atualizar a tarefa.',
        }
      );

      // Atualiza o estado local com a tarefa retornada pela API
      setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  };

  // Abre o modal de confirmação
  const handleDeleteClick = (task: ITask) => {
    setTaskToDelete(task);
    setIsDeleteDialogOpen(true);
  };

  // Função chamada pelo modal ao confirmar
  const handleConfirmDelete = async (task: ITask) => {
    try {
      await toast.promise(deleteTask({ id: task.id }, accessToken!), {
        pending: 'Excluindo tarefa...',
        success: 'Tarefa excluída com sucesso!',
        error: 'Falha ao excluir a tarefa.',
      });
      // Remove a tarefa do estado local
      setTasks(tasks.filter(t => t.id !== task.id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const handleAddTask = async (status: TaskStatus) => {
    // Simula a criação de uma nova tarefa. No futuro, isso abrirá um modal/formulário.
    const newTaskData: INewTask = {
      title: `Nova Tarefa em ${status}`,
      dueDate: new Date(),
      status: status,
      priority: 'medium',
    };

    try {
      const response = await newTask(newTaskData, accessToken!);
      setTasks([...tasks, response.data]);
      toast.success('Nova tarefa adicionada!');
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      toast.error('Falha ao adicionar a nova tarefa.');
    }
  };

  return (
    <div className={style.dashboard}>
      <header className={style.header}>
        <h1 className={style.title}>Meu Quadro de Tarefas</h1>
        {/* todo: filtros de pesquisa*/}
      </header>
      {loading ? ( 
        Spinner(32, '#0d1b2a', 'Carregando...')
      ): (       <TaskBoard
        tasks={tasks}
        onDetailsClick={handleDetailsClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onAddTask={handleAddTask}
      />)}
      
      <DeleteTaskDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        task={taskToDelete}
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
};

export default DashboardPage;