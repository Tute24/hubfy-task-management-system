export type TaskType = {
  id: number;
  title: string;
  description: string | null;
  user_id: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  created_at: string;
  updated_at: string;
};
