import { TaskNotFoundError } from '@/core/errors/task-not-found-error';
import { TasksRepository } from '../interfaces/tasks-repository-interface';
import { ForbiddenUserError } from '@/core/errors/forbidden-user-error';

interface DeleteTaskRequest {
  userId: string;
  taskId: number;
}

export class DeleteTaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ userId, taskId }: DeleteTaskRequest) {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) throw new TaskNotFoundError();

    if (task.user_id !== userId) throw new ForbiddenUserError();

    await this.tasksRepository.delete(taskId);

    return;
  }
}
