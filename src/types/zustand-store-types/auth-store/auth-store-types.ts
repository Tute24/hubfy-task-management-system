import { UserType } from '@/types/user-type';

export type AuthStoreState = {
  token: string | null;
  user: UserType | null;
  sessionValidated: boolean;
  hasHydrated: boolean;
};

export type AuthStoreAction = {
  setToken: (token: string | null) => void;
  setUser: (user: UserType | null) => void;
  setSessionValidated: (sessionValidated: boolean) => void;
  reset: () => void;
};

export type AuthStoreType = AuthStoreState & AuthStoreAction;
