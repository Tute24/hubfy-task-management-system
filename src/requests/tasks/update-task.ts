import { UpdateTaskResponse } from '@/types/responses/update-task-response-type';
import { UpdateTaskType } from '@/types/task-request-types';
import { axiosHelper } from '@/utils/axios-helper';
import requestErrorHandler from '@/utils/request-error-handler';
import { useGeneralStore } from '@/zustand-stores/general/general.store';
import { useTasksStore } from '@/zustand-stores/tasks/tasks.store';

export async function updateTaskRequest(id: number, data: UpdateTaskType) {
  const { setTasksArray, tasksArray } = useTasksStore.getState();
  const { setStatusMessage } = useGeneralStore.getState();

  try {
    const res = await axiosHelper({
      httpMethod: 'put',
      route: `tasks/${id}`,
      body: data,
    });
    const resBody = res.data as UpdateTaskResponse;
    setTasksArray(
      tasksArray.map((task) => (task.id === resBody.task.id ? (task = resBody.task) : task)),
    );
    return { success: true, message: resBody.message };
  } catch (error) {
    requestErrorHandler({ error, setStatusMessage });
    return { success: false };
  }
}
