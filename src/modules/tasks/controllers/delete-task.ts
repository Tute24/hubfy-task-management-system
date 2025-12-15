import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository';
import { DeleteTaskService } from '../services/delete-task';

export async function deleteTask(userId: string, param: string) {
  const taskId = Number(param);

  const tasksRepository = new PrismaTasksRepository();
  const deleteTaskService = new DeleteTaskService(tasksRepository);

  await deleteTaskService.execute({ userId, taskId });

  return;
}
