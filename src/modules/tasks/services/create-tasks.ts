import { TaskRequestType } from '@/types/task-request-type';
import { TasksRepository } from '../interfaces/tasks-repository-interface';

interface CreateTasksRequest {
  tasks: TaskRequestType[];
}

export class CreateTasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ tasks }: CreateTasksRequest) {
    const createCount = await this.tasksRepository.createMany(tasks);

    return { createCount: createCount.count };
  }
}
