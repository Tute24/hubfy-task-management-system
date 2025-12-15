import { describe, it, expect } from 'vitest';
import { testApiHandler } from 'next-test-api-route-handler';
import * as createAndGetTasksRoute from '@/app/api/tasks/route';
import { registerUser } from '../../helpers/auth/register-helper';
import { createTasks } from '../../helpers/tasks/create-tasks-helper';
import { GetTasksResponse } from '@/types/responses/get-tasks-response-type';
import { authMock } from '../../__mocks__/auth-mock';

describe('get /api/tasks/', () => {
  it('should get tasks successfully', async () => {
    const { token } = await registerUser({
      name: authMock.name,
      email: authMock.email,
      password: authMock.password,
    });
    await createTasks(token);
    await testApiHandler({
      appHandler: createAndGetTasksRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'GET',
          headers: [['Authorization', `Bearer ${token}`]],
        });

        const body: GetTasksResponse = await res.json();
        expect(res.status).toBe(200);
        expect(body.message).toBe('Tasks successfully fetched');
        expect(body.tasks).toHaveLength(2);
      },
    });
  });

  it('should throw 401 if token is invalid', async () => {
    await testApiHandler({
      appHandler: createAndGetTasksRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'GET',
          headers: [['Authorization', `Bearer token`]],
        });

        expect(res.status).toBe(401);
      },
    });
  });

  it('isolates users on get request', async () => {
    const firstUser = await registerUser({
      name: authMock.name,
      email: authMock.email,
      password: authMock.password,
    });
    const firstUserToken = firstUser.token;
    await createTasks(firstUserToken);

    const secondUser = await registerUser({
      name: 'User2',
      email: 'user2@email.com',
      password: 'Pass12345!',
    });
    const secondUserToken = secondUser.token; //o segundo user não cria nenhuma task

    await testApiHandler({
      appHandler: createAndGetTasksRoute,
      async test({ fetch }) {
        const firstUserRes = await fetch({
          method: 'GET',
          headers: [['Authorization', `Bearer ${firstUserToken}`]],
        });

        const secondUserRes = await fetch({
          method: 'GET',
          headers: [['Authorization', `Bearer ${secondUserToken}`]],
        });

        const firstUserBody: GetTasksResponse = await firstUserRes.json();
        expect(firstUserRes.status).toBe(200);
        expect(firstUserBody.message).toBe('Tasks successfully fetched');
        expect(firstUserBody.tasks).toHaveLength(2);
        const secondUserBody: GetTasksResponse = await secondUserRes.json();
        expect(secondUserRes.status).toBe(200);
        expect(secondUserBody.message).toBe('Tasks successfully fetched');
        expect(secondUserBody.tasks).toHaveLength(0); //como o segundo user não criou tasks, o array de tasks deles vem vazio - há um isolamento
      },
    });
  });
});
