import { deleteTaskRequest } from '@/requests/tasks/delete-task';

export interface deleteUserHandlerProps {
  taskId: number;
  setIsDeleting: (isDeleting: boolean) => void;
}

export async function deleteUserHandler({ taskId, setIsDeleting }: deleteUserHandlerProps) {
  try {
    setIsDeleting(true);
    const response = await deleteTaskRequest(taskId);
    if (response?.success) window.alert(response.message);
  } finally {
    setIsDeleting(false);
  }
}
