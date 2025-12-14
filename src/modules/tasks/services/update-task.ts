import { UpdateTaskType } from '@/types/task-request-types';
import { TasksRepository } from '../interfaces/tasks-repository-interface';
import { MissingParamError } from '@/core/errors/missing-params-error';
import { MissingPropsError } from '@/core/errors/missing-props-error';
import { TaskNotFoundError } from '@/core/errors/task-not-found-error';
import { ForbiddenUserError } from '@/core/errors/forbidden-user-error';

export class UpdateTaskService {
  constructor(private tasksRepository: TasksRepository) {}
  async execute(userId: string, taskId: number, data: UpdateTaskType) {
    if (!taskId) throw new MissingParamError();

    if (Object.keys(data).length === 0) throw new MissingPropsError();

    const task = await this.tasksRepository.findById(taskId);

    if (!task) throw new TaskNotFoundError();

    if (task.user_id !== userId) throw new ForbiddenUserError();

    await this.tasksRepository.update(taskId, data);

    return;
  }
}
