import { axiosHelper } from '@/utils/axios-helper';
import { useAuthStore } from '@/zustand-stores/auth/auth.store';
import axios from 'axios';

export async function tokenCheckRequest() {
  const { setSessionValidated } = useAuthStore.getState();
  try {
    const res = await axiosHelper({
      httpMethod: 'post',
      route: '/auth/token-check',
    });
    setSessionValidated(true);
    return { success: true, status: res.status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status, error);
      return { success: false, status: error.response?.status };
    }
    console.log(error);
  }
}
