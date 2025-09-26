interface ITask {
    id: string;
    title: string;
    description?: string;
    status: 'to-do' | 'in-progress' | 'in-review' | 'done'
    priority: 'High' | 'Medium' | 'Low' | 'Urgent' | 'Optional';
    dueDate: string;
}

export type { ITask }