import { RegisterType } from '@/components/forms/register-form';
import { RegisterLoginResponseType } from '@/types/responses/register-login-response-type';
import { axiosHelper } from '@/utils/axios-helper';
import requestErrorHandler from '@/utils/request-error-handler';
import { useAuthStore } from '@/zustand-stores/auth/auth.store';
import { useGeneralStore } from '@/zustand-stores/general/general.store';

export async function registerRequest(data: RegisterType) {
  const { setIsLoading, setStatusMessage } = useGeneralStore.getState();
  const { setToken, setUser } = useAuthStore.getState();

  try {
    setIsLoading(true);
    const res = await axiosHelper({
      httpMethod: 'post',
      route: '/auth/register',
      body: data,
    });

    const resBody = res.data as RegisterLoginResponseType;
    setToken(resBody.token);
    setUser(resBody.user);
    console.log(resBody.message);
    return { success: true };
  } catch (error) {
    requestErrorHandler({ error, setStatusMessage });
    return { success: false };
  } finally {
    setIsLoading(false);
  }
}
