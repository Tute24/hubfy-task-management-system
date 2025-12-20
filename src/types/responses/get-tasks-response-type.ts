import { TaskType } from '../task-type';

export type GetTasksResponse = {
  message: string;
  tasks: TaskType[];
};
