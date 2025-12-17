import { AuthStoreType } from '@/types/zustand-store-types/auth-store/auth-store-types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set): AuthStoreType => ({
      token: null,
      user: null,
      sessionValidated: false,
      hasHydrated: false,

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      setSessionValidated: (sessionValidated) => set({ sessionValidated }),
      reset: () => set({ token: null, user: null, sessionValidated: false }), //pra resetar a store inteira, em casos de logout, por exemplo
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true;
      }, //isso garante que o setHasHydrate vira true na reidratação da store em questão
    },
  ),
);
