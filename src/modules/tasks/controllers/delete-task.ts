import { MissingParamError } from '@/core/errors/missing-params-error';
import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository';
import { DeleteTaskService } from '../services/delete-task';

export async function deleteTask(req: Request, userId: string, param: string) {
  if (!param) throw new MissingParamError();
  const taskId = Number(param);

  const tasksRepository = new PrismaTasksRepository();
  const deleteTaskService = new DeleteTaskService(tasksRepository);

  await deleteTaskService.execute({ userId, taskId });

  return;
}
