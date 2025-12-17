import { TaskType } from '@/types/task-type';

export type TasksStoreState = {
  tasksArray: TaskType[] | [];
  task: TaskType | null;
  hasHydrated: boolean;
};

export type TasksStoreAction = {
  setTasksArray: (tasks: TaskType[] | []) => void;
  setTask: (task: TaskType | null) => void;
  reset: () => void;
};

export type TasksStoreType = TasksStoreState & TasksStoreAction;
