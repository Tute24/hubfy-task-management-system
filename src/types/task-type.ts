export type TaskType = {
  id: number;
  title: string;
  description?: string;
  user_id: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  created_at: string;
  updated_at: string;
};
