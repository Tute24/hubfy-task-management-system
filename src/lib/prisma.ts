import { PrismaClient } from '../../prisma/generated/client';

const prisma = new PrismaClient({ log: ['error'], accelerateUrl: '' });
export default prisma;
