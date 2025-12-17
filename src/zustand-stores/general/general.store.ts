import { GeneralStoreType } from '@/types/zustand-store-types/general-store/general-store-types';
import { create } from 'zustand';

export const useGeneralStore = create<GeneralStoreType>()(
  (set): GeneralStoreType => ({
    isLoading: false,
    statusMessage: null,
    hasHydrated: false,

    setIsLoading: (isLoading) => set({ isLoading }),
    setStatusMessage: (statusMessage) => set({ statusMessage }),
  }), //diferentemente das outras stores, não foi utilizado o persist aqui, pois são estados efêmeros por natureza
);
