import { TaskNotFoundError } from '@/core/errors/task-not-found-error';
import { TasksRepository } from '../interfaces/tasks-repository-interface';
import { ForbiddenUserError } from '@/core/errors/forbidden-user-error';
import { MissingParamError } from '@/core/errors/missing-params-error';

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
