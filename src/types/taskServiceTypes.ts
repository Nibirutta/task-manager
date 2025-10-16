type TaskStatus = 'to-do' | 'in-progress' | 'in-review' | 'done';
type TaskPriority = 'high' | 'medium' | 'low' | 'urgent' | 'optional';

type TaskType =  {
    _id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
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
    _id: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    title?: string;
    dueDate?: Date;
}

interface IDeleteTask {
    _id: string;
}


export type { TaskStatus, TaskPriority, TaskType, IGetTasks, INewTask, IUpdateTask, IDeleteTask }