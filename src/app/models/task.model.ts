export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'TODO' | 'DOING' | 'DONE' | 'CANCELLED';
    ownerId: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskRequest {
    title: string;
    description: string;
}