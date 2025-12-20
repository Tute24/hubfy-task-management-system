import { TasksRepository } from '../interfaces/tasks-repository-interface';

interface GetTasksRequest {
  id: string;
}
export class GetTasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ id }: GetTasksRequest) {
    const tasks = await this.tasksRepository.getTasks(id);

    return { tasks };
  }
}
