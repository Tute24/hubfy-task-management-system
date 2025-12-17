import { deleteTaskRequest } from '@/requests/tasks/delete-task';

export interface deleteTaskHandlerProps {
  taskId: number;
  setIsDeleting: (isDeleting: boolean) => void;
}

export async function deleteTaskHandler({ taskId, setIsDeleting }: deleteTaskHandlerProps) {
  try {
    setIsDeleting(true);
    const response = await deleteTaskRequest(taskId);
    if (response?.success) window.alert(response.message);
  } finally {
    setIsDeleting(false);
  }
}
