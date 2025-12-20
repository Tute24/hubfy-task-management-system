import { describe, it, expect } from 'vitest';
import { testApiHandler } from 'next-test-api-route-handler';
import * as deleteTaskRoute from '@/app/api/tasks/[id]/route';
import { registerUser } from '../../helpers/auth/register-helper';
import { createTasks } from '../../helpers/tasks/create-tasks-helper';
import prisma from '@/core/lib/prisma';
import { authMock } from '../../__mocks__/auth-mock';

describe('DELETE /api/tasks/:id', () => {
  it('should delete a task successfully', async () => {
    const { token } = await registerUser({
      name: authMock.name,
      email: authMock.email,
      password: authMock.password,
    });

    await createTasks(token);

    const task = await prisma.task.findFirst();
    expect(task).not.toBeNull();

    await testApiHandler({
      appHandler: deleteTaskRoute,
      params: { id: String(task!.id) },
      async test({ fetch }) {
        const res = await fetch({
          method: 'DELETE',
          headers: [['Authorization', `Bearer ${token}`]],
        });

        const body = await res.json();

        expect(res.status).toBe(200);
        expect(body.message).toBe('Task successfully deleted.');
      },
    });

    const deletedTask = await prisma.task.findUnique({
      where: { id: task!.id },
    });

    expect(deletedTask).toBeNull();
  });

  it('should throw 401 if token is invalid', async () => {
    await testApiHandler({
      appHandler: deleteTaskRoute,
      params: { id: '1' },
      async test({ fetch }) {
        const res = await fetch({
          method: 'DELETE',
          headers: [['Authorization', 'Bearer token']],
        });

        expect(res.status).toBe(401);
      },
    });
  });

  it('should throw 404 if task does not exist', async () => {
    const { token } = await registerUser({
      name: authMock.name,
      email: authMock.email,
      password: authMock.password,
    });

    await testApiHandler({
      appHandler: deleteTaskRoute,
      params: { id: '1' }, //não existe pq o user não criou nenhuma task
      async test({ fetch }) {
        const res = await fetch({
          method: 'DELETE',
          headers: [['Authorization', `Bearer ${token}`]],
        });

        expect(res.status).toBe(404);
      },
    });
  });

  it('should return 403 when deleting another user task', async () => {
    //teste de isolamento de usuários
    const firstUser = await registerUser({
      name: authMock.name,
      email: authMock.email,
      password: authMock.password,
    });

    await createTasks(firstUser.token);

    const task = await prisma.task.findFirst();
    expect(task).not.toBeNull();

    const secondUser = await registerUser({
      name: 'User 2',
      email: 'user2@email.com',
      password: 'Pass12345!',
    });

    await testApiHandler({
      appHandler: deleteTaskRoute,
      params: { id: String(task!.id) },
      async test({ fetch }) {
        const res = await fetch({
          method: 'DELETE',
          headers: [['Authorization', `Bearer ${secondUser.token}`]], //secondUser tentando apagar task que não é dele
        });

        expect(res.status).toBe(403);
      },
    });
  });
});
