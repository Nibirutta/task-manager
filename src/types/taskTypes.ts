interface ITask {
    id: string;
    title: string;
    description?: string;
    status: 'to-do' | 'in-progress' | 'in-review' | 'done'
    priority: 'high' | 'medium' | 'low' | 'urgent' | 'optional';
    dueDate: string;
}

export type { ITask }