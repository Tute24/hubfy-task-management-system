import { CreateTasksType } from '@/components/forms/create-tasks-form';
import { axiosHelper } from '@/utils/axios-helper';
import requestErrorHandler from '@/utils/request-error-handler';
import { useGeneralStore } from '@/zustand-stores/general/general.store';

export async function createTasksRequest(data: CreateTasksType) {
  const { setStatusMessage } = useGeneralStore.getState();

  try {
    await axiosHelper({
      httpMethod: 'post',
      route: '/tasks',
      body: data,
    });

    setStatusMessage('Tasks created successfully.');
  } catch (error) {
    requestErrorHandler({ error, setStatusMessage });
  }
}
