import { UpdateTaskType } from '@/types/task-request-types';
import { Prisma, Task } from '@prisma/client';

export interface TasksRepository {
  createMany(data: Prisma.TaskCreateManyInput[]): Promise<Prisma.BatchPayload>;
  getTasks(userId: string): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  delete(id: number): Promise<void>;
  update(id: number, data: UpdateTaskType): Promise<Task>;
}
