import { GetTasksResponse } from '@/types/responses/get-tasks-response-type';
import { axiosHelper } from '@/utils/axios-helper';
import requestErrorHandler from '@/utils/request-error-handler';
import { useGeneralStore } from '@/zustand-stores/general/general.store';
import { useTasksStore } from '@/zustand-stores/tasks/tasks.store';

export async function getTasksRequest() {
  const { setTasksArray } = useTasksStore.getState();
  const { setIsLoading } = useGeneralStore.getState();

  try {
    setIsLoading(true);

    const res = await axiosHelper({
      httpMethod: 'get',
      route: '/tasks',
    });

    const resBody = res.data as GetTasksResponse;

    setTasksArray(resBody.tasks.sort((a, b) => b.id - a.id)); //trazendo as tasks mais recentes primeiro, como id é auto_increment, o maior id sempre vai ser a task mais recentemente criada
    console.log(resBody.message);
  } catch (error) {
    requestErrorHandler({ error });
  } finally {
    setIsLoading(false);
  }
}
