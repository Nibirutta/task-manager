interface ITask {
    title?: string;
    status?: string;
    priority?: 'high' | 'medium' | 'low';
    from?: Date;
    to?: Date;
}
    

interface INewTask {
    title: string;
    dueDate: Date;
    description?: string;
    status?: string;
    priority?: 'high' | 'medium' | 'low';
}

interface IUpdateTask {
    id: string;
    description?: string;
    status?: string;
    priority?: 'high' | 'medium' | 'low';
    title?: string;
    dueDate?: Date;
}

interface IDeleteTask {
    id: string;
}


export type { ITask, INewTask, IUpdateTask, IDeleteTask }
