type TaskStatus = 'to-do' | 'in-progress' | 'in-review' | 'done';
type TaskPriority = 'high' | 'medium' | 'low' | 'urgent' | 'optional';

interface ITask {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}

interface IGetTasks {
    title?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    from?: Date;
    to?: Date;
}
    

interface INewTask {
    title: string;
    dueDate: Date;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
}

interface IUpdateTask {
    id: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    title?: string;
    dueDate?: Date;
}

interface IDeleteTask {
    id: string;
}


export type { TaskStatus, TaskPriority, ITask, IGetTasks, INewTask, IUpdateTask, IDeleteTask }