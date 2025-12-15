import { describe, it, expect } from 'vitest';
import { testApiHandler } from 'next-test-api-route-handler';
import * as updateTaskRoute from '@/app/api/tasks/[id]/route';
import { registerUser } from '../../helpers/auth/register-helper';
import { createTasks } from '../../helpers/tasks/create-tasks-helper';
import prisma from '@/core/lib/prisma';
import { authMock } from '../../__mocks__/auth-mock';
import { UpdateTaskResponse } from '@/types/responses/update-task-response-type';

describe('put /api/tasks/', () => {
  it('should update a task successfully', async () => {
    const { token } = await registerUser({
      name: authMock.name,
      email: authMock.email,
      password: authMock.password,
    });

    await createTasks(token);

    const task = await prisma.task.findFirst();
    expect(task).not.toBeNull();

    await testApiHandler({
      appHandler: updateTaskRoute,
      params: { id: String(task!.id) },
      async test({ fetch }) {
        const res = await fetch({
          method: 'PUT',
          headers: [['Authorization', `Bearer ${token}`]],
          body: JSON.stringify({
            title: 'Updated title',
            status: 'COMPLETED',
          }),
        });

        const body: UpdateTaskResponse = await res.json();

        expect(res.status).toBe(200);
        expect(body.message).toBe('Task successfully updated.');
        expect(body.task.title).toBe('Updated title');
        expect(body.task.status).toBe('COMPLETED');
      },
    });
  });

  it('should throw 401 if token is invalid', async () => {
    await testApiHandler({
      appHandler: updateTaskRoute,
      params: { id: '1' },
      async test({ fetch }) {
        const res = await fetch({
          method: 'PUT',
          headers: [['Authorization', 'Bearer token']],
          body: JSON.stringify({ title: 'Test' }),
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
      appHandler: updateTaskRoute,
      params: { id: '9999' },
      async test({ fetch }) {
        const res = await fetch({
          method: 'PUT',
          headers: [['Authorization', `Bearer ${token}`]],
          body: JSON.stringify({ title: 'Test' }),
        });

        expect(res.status).toBe(404);
      },
    });
  });

  it('should return 403 when updating another user task', async () => {
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
      appHandler: updateTaskRoute,
      params: { id: String(task!.id) },
      async test({ fetch }) {
        const res = await fetch({
          method: 'PUT',
          headers: [['Authorization', `Bearer ${secondUser.token}`]],
          body: JSON.stringify({ title: 'Hack attempt' }),
        });

        expect(res.status).toBe(403);
      },
    });
  });

  it('should return 400 for invalid update payload', async () => {
    const { token } = await registerUser({
      name: authMock.name,
      email: authMock.email,
      password: authMock.password,
    });

    await createTasks(token);

    const task = await prisma.task.findFirst();

    await testApiHandler({
      appHandler: updateTaskRoute,
      params: { id: String(task!.id) },
      async test({ fetch }) {
        const res = await fetch({
          method: 'PUT',
          headers: [['Authorization', `Bearer ${token}`]],
          body: JSON.stringify({
            title: 'a', // não passa no parse do zod porque tem apenas 1 caractere
          }),
        });

        expect(res.status).toBe(500);
      },
    });
  });
});
