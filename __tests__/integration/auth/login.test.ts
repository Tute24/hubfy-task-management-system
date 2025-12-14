import { describe, it, expect } from 'vitest';
import { testApiHandler } from 'next-test-api-route-handler';
import * as loginRoute from '@/app/api/auth/login/route';
import { registerUser } from '../../helpers/auth/register-helper';
import { authMock } from '../../__mocks__/auth-mock';

describe('/api/auth/login', () => {
  it('should login a user successfully', async () => {
    await registerUser();
    await testApiHandler({
      appHandler: loginRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            email: authMock.email,
            password: authMock.password,
          }),
        });

        const body = await res.json();
        expect(res.status).toBe(200);
        expect(body.user).toHaveProperty('id');
        expect(body.user.email).toBe(authMock.email);
        expect(body.token).toBeDefined();
      },
    });
  });

  it('should throw 401 on incorrect password', async () => {
    await registerUser();
    await testApiHandler({
      appHandler: loginRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            email: authMock.email,
            password: 'Teste1234556!',
          }),
        });

        const body = await res.json();
        expect(res.status).toBe(401);
        expect(body.message).toBe(`Incorrect password. Try again.`);
      },
    });
  });

  it('should throw 401 on user not found', async () => {
    await registerUser();
    await testApiHandler({
      appHandler: loginRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            email: 'jon@test.com',
            password: authMock.password,
          }),
        });

        const body = await res.json();
        expect(res.status).toBe(404);
        expect(body.message).toBe(`There is not an user with this e-mail in the database!`);
      },
    });
  });

  it('should throw 500 on invalid body', async () => {
    await registerUser();
    await testApiHandler({
      appHandler: loginRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            email: authMock.email,
            password: authMock.password,
            role: 'admin', //role não está no zod schema da rota, o que dá erro por causa do strict()
          }),
        });
        expect(res.status).toBe(500);
      },
    });
  });

  it('should throw 500 on invalid email', async () => {
    await registerUser();
    await testApiHandler({
      appHandler: loginRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            email: 'john@testcom', //email sem .com
            password: authMock.password,
          }),
        });
        expect(res.status).toBe(500);
      },
    });
  });

  it('should throw 500 on invalid password', async () => {
    await registerUser();
    await testApiHandler({
      appHandler: loginRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            email: authMock.email,
            password: 'Teste', //senha sem 8 caracteres
          }),
        });
        expect(res.status).toBe(500);
      },
    });
  });
});
