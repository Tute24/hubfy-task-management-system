import updateTaskSchema from '@/zodSchemas/update-task-schema';
import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository';
import { UpdateTaskService } from '../services/update-task';

export async function updateTask(req: Request, userId: string, param: string) {
  const taskId = Number(param);
  const body = await req.json();

  const updateObject = updateTaskSchema.parse(body);

  const tasksRepository = new PrismaTasksRepository();
  const updateTaskService = new UpdateTaskService(tasksRepository);

  await updateTaskService.execute(userId, taskId, updateObject);

  return;
}
