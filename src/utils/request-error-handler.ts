import { useAuthStore } from '@/zustand-stores/auth/auth.store';
import axios from 'axios';

export interface RequestErrorHandlerProps {
  error: unknown;
  setStatusMessage?: (statusMessage: string) => void;
}

export default function requestErrorHandler({ error, setStatusMessage }: RequestErrorHandlerProps) {
  const { reset } = useAuthStore.getState();
  if (axios.isAxiosError(error)) {
    if (setStatusMessage) {
      setStatusMessage(error.response?.data?.message); //de acordo com os erros personalizados da pasta src/core/errors
    }
    if (error.response?.status === 401) reset();

    console.log(error.response?.status, error);
  } else {
    if (setStatusMessage) {
      if (setStatusMessage) {
        setStatusMessage('Something went wrong - Internal server error.');
      }
      console.log(error);
    }
  }
}
