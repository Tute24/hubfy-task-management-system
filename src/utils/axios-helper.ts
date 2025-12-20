import { useAuthStore } from '@/zustand-stores/auth/auth.store';
import axios from 'axios';

export interface AxiosHelperProps {
  httpMethod: 'get' | 'post' | 'put' | 'delete';
  route: string;
  body?: Record<string, unknown>;
}

export const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 1000 * 10, //timeout de 10s para reqs
});

export function axiosHelper({ httpMethod, route, body }: AxiosHelperProps) {
  const { token } = useAuthStore.getState();

  if (token) {
    return axiosInstance.request({
      method: httpMethod,
      url: route,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return axiosInstance.request({
      method: httpMethod,
      url: route,
      data: body,
    });
  }
}
