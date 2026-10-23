export interface Task {
  id: number;
  title: string;
  description: string;
  createdDate?: string;
  formattedDate?: string;
  userId?: number;
}

export interface UpdateTaskPayload {
  id: number;
  userId: number;
  title: string;
  description: string;
}
