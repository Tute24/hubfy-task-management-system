import { describe, it, expect } from 'vitest';
import { testApiHandler } from 'next-test-api-route-handler';
import * as createAndGetTasksRoute from '@/app/api/tasks/route';
import { registerUser } from '../../helpers/auth/register-helper';
import { tasksMock } from '../../__mocks__/tasks-mock';
import { authMock } from '../../__mocks__/auth-mock';

describe('post /api/tasks/', () => {
  it('should create tasks successfully', async () => {
    const { token } = await registerUser({
      name: authMock.name,
      email: authMock.email,
      password: authMock.password,
    });
    await testApiHandler({
      appHandler: createAndGetTasksRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            tasks: tasksMock.create,
          }),
          headers: [['Authorization', `Bearer ${token}`]],
        });

        const body = await res.json();
        expect(res.status).toBe(201);
        expect(body.message).toBe(`New tasks created: ${tasksMock.create.length}`);
      },
    });
  });

  it('should throw 401 if token is invalid', async () => {
    await testApiHandler({
      appHandler: createAndGetTasksRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            tasks: tasksMock.create,
          }),
          headers: [['Authorization', `Bearer token`]],
        });

        expect(res.status).toBe(401);
      },
    });
  });

  it('should throw 500 if body has additional props', async () => {
    const { token } = await registerUser({
      name: authMock.name,
      email: authMock.email,
      password: authMock.password,
    });
    await testApiHandler({
      appHandler: createAndGetTasksRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            tasks: tasksMock.create,
            role: 'admin', //schema aceita apenas tasks como prop
          }),
          headers: [['Authorization', `Bearer ${token}`]],
        });

        expect(res.status).toBe(500);
      },
    });
  });

  it('should throw 500 if type of props is worng', async () => {
    const { token } = await registerUser({
      name: authMock.name,
      email: authMock.email,
      password: authMock.password,
    });
    await testApiHandler({
      appHandler: createAndGetTasksRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            tasks: [{ title: 1 }], //type de title tem que ser string
          }),
          headers: [['Authorization', `Bearer ${token}`]],
        });

        expect(res.status).toBe(500);
      },
    });
  });
});
