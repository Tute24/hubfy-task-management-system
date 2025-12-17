import { axiosHelper } from '@/utils/axios-helper';
import requestErrorHandler from '@/utils/request-error-handler';
import { useGeneralStore } from '@/zustand-stores/general/general.store';
import { useTasksStore } from '@/zustand-stores/tasks/tasks.store';

export async function deleteTaskRequest(id: number) {
  const { setTasksArray, tasksArray } = useTasksStore.getState();
  const { setStatusMessage } = useGeneralStore.getState();

  try {
    const res = await axiosHelper({
      httpMethod: 'delete',
      route: `tasks/${id}`,
    });
    const resBody = res.data as { message: string };
    setTasksArray(tasksArray.filter((task) => task.id !== id));
    return { success: true, message: resBody.message };
  } catch (error) {
    requestErrorHandler({ error, setStatusMessage });
    return { success: false };
  }
}
