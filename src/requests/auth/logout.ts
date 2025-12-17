import { axiosHelper } from '@/utils/axios-helper';
import requestErrorHandler from '@/utils/request-error-handler';
import { useAuthStore } from '@/zustand-stores/auth/auth.store';
import { useTasksStore } from '@/zustand-stores/tasks/tasks.store';

export async function logoutRequest() {
  const resetAuthStore = useAuthStore.getState().reset;
  const resetTasksStore = useTasksStore.getState().reset;

  try {
    const res = await axiosHelper({
      httpMethod: 'post',
      route: '/auth/logout',
    });

    const resBody = res.data as { message: string };

    resetAuthStore();
    resetTasksStore();

    return { success: true, message: resBody.message };
  } catch (error) {
    requestErrorHandler({ error });
    return { success: false, message: 'Something went wrong - Try again.' };
  }
}
