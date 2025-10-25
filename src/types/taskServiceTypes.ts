type TaskStatus = 'to-do' | 'in-progress' | 'in-review' | 'done';
type TaskPriority = 'high' | 'medium' | 'low' | 'urgent' | 'optional';

type TaskType =  {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
}

type GetTasksResponseType = TaskType[];
    

type CreatTaskRequestType  = {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
}

type CreatTaskResponseType = {
    task: TaskType
}

type UpdateTaskRequestType = {
        title?: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string;
}

type UpdateTaskResponseType = {
    task: TaskType
}

type DeleteTaskResponseType = {
    message: string
}


export type {
    TaskStatus,
    TaskPriority,
    TaskType,
    GetTasksResponseType,
    CreatTaskRequestType,
    CreatTaskResponseType,
    UpdateTaskRequestType,
    UpdateTaskResponseType,
    DeleteTaskResponseType
}
