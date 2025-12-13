import tasksBodySchema from '@/zodSchemas/tasks-body-schema';
import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository';
import { CreateTasksService } from '../services/create-tasks';

export async function createTasks(req: Request, id: string) {
  const body = await req.json();

  const { tasks } = tasksBodySchema.parse(body);

  const formattedtasks = tasks.map((task) => ({
    title: task.title,
    description: task.description,
    user_id: id,
  }));

  const tasksRepository = new PrismaTasksRepository();
  const createTaskService = new CreateTasksService(tasksRepository);

  const { createCount } = await createTaskService.execute({ tasks: formattedtasks });

  return { status: 201, data: { message: `New tasks created: ${createCount}` } };
}
