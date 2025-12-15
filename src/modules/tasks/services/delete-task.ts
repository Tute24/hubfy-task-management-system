import { MissingParamError, TaskNotFoundError, ForbiddenUserError } from '@/core/errors';
import { TasksRepository } from '../interfaces/tasks-repository-interface';

interface DeleteTaskRequest {
  userId: string;
  taskId: number;
}

export class DeleteTaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ userId, taskId }: DeleteTaskRequest) {
    if (!taskId) {
      throw new MissingParamError();
    }
    const task = await this.tasksRepository.findById(taskId);

    if (!task) throw new TaskNotFoundError();

    if (task.user_id !== userId) throw new ForbiddenUserError();

    await this.tasksRepository.delete(taskId);

    return;
  }
}
