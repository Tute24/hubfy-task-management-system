import { TaskType } from '@/types/task-type';

export type TasksStoreState = {
  tasksArray: TaskType[] | [];
  hasHydrated: boolean;
};

export type TasksStoreAction = {
  setTasksArray: (tasks: TaskType[] | []) => void;
  reset: () => void;
};

export type TasksStoreType = TasksStoreState & TasksStoreAction;
