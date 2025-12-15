import { GeneralStoreType } from '@/types/zustand-store-types/general-store/general-store-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useGeneralStore = create<GeneralStoreType>()(
  persist(
    (set): GeneralStoreType => ({
      isLoading: false,
      statusMessage: null,
      hasHydrated: false,

      setIsLoading: (isLoading) => set({ isLoading }),
      setStatusMessage: (statusMessage) => set({ statusMessage }),
    }),
    {
      name: 'general-store',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true;
      },
    },
  ),
);
