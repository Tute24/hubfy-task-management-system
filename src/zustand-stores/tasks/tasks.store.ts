import { TasksStoreType } from '@/types/zustand-store-types/tasks-store/tasks-store-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useTasksStore = create<TasksStoreType>()(
  persist(
    (set): TasksStoreType => ({
      tasksArray: [],
      task: null,
      hasHydrated: false,

      setTasksArray: (tasksArray) => set({ tasksArray }),
      setTask: (task) => set({ task }),
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
