import { TaskType } from '../task-type';

export type UpdateTaskResponse = {
  message: string;
  task: TaskType;
};
