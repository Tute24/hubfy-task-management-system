import prisma from '@/core/lib/prisma';

export default async function resetDb() {
  await prisma.$transaction([prisma.user.deleteMany(), prisma.task.deleteMany()]);
} //esser helper serve para que todos os registros da db de testes, entre um teste e outro, sejam apagados pra evitar interferências e comportamentos inesperados
