import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository';
import { GetTasksService } from '../services/get-tasks';

export async function getTasks(id: string) {
  const tasksRepository = new PrismaTasksRepository();
  const getTasksService = new GetTasksService(tasksRepository);

  const { tasks } = await getTasksService.execute({ id });

  return tasks;
}
