import { updateTaskRequest } from '@/requests/tasks/update-task';
import { UpdateTaskType } from '@/types/task-request-types';

export interface updateTaskHandlerProps {
  taskId: number;
  data: UpdateTaskType;
}

export async function updateTaskHandler({ taskId, data }: updateTaskHandlerProps) {
  const response = await updateTaskRequest(taskId, data);
  if (response?.success) window.alert(response.message);
}
