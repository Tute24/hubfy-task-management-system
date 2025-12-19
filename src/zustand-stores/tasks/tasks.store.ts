import { TasksStoreType } from '@/types/zustand-store-types/tasks-store/tasks-store-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useTasksStore = create<TasksStoreType>()(
  persist(
    (set): TasksStoreType => ({
      tasksArray: [],
      hasHydrated: false,

      setTasksArray: (tasksArray) => set({ tasksArray }),
      reset: () => set({ tasksArray: [] }),
    }),
    {
      name: 'tasks-store',
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true;
      },
    },
  ),
);
