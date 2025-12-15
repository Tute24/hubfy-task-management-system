export type TaskRequestType = {
  title: string;
  description?: string;
  user_id: string;
};

export type UpdateTaskType = {
  title?: string;
  description?: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
};
