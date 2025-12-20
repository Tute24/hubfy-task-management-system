import prisma from '@/core/lib/prisma';

import { AuthRepository } from '../interfaces/auth-repository-interface';
import { Prisma } from '@prisma/client';

export class PrismaAuthRespository implements AuthRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = prisma.user.create({ data });

    return user;
  }

  async findByEmail(email: string) {
    const user = prisma.user.findUnique({ where: { email } });

    return user;
  }
}
