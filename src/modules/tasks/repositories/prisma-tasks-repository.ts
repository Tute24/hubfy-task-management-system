import { Prisma } from '@prisma/client';
import { TasksRepository } from '../interfaces/tasks-repository-interface';
import prisma from '@/core/lib/prisma';
import { UpdateTaskType } from '@/types/task-request-types';

export class PrismaTasksRepository implements TasksRepository {
  async createMany(data: Prisma.TaskCreateManyInput[]) {
    const task = await prisma.task.createMany({ data }); //optei por usar o createMany aqui, pois no frontend darei a opção de criar várias tasks de uma vez

    return task;
  }

  async getTasks(userId: string) {
    const tasks = await prisma.task.findMany({ where: { user_id: userId } });

    return tasks;
  }

  async findById(id: number) {
    const task = await prisma.task.findUnique({ where: { id } });

    return task;
  }

  async delete(id: number) {
    const task = await prisma.task.delete({ where: { id } });

    return task;
  }

  async update(id: number, data: UpdateTaskType) {
    await prisma.task.update({ where: { id }, data });
  }
}
