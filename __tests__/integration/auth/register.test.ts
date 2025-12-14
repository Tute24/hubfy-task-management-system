import { describe, it, expect } from 'vitest';
import { testApiHandler } from 'next-test-api-route-handler';
import * as registerRoute from '@/app/api/auth/register/route';
import { authMock } from '../../__mocks__/auth-mock';

describe('/api/auth/register', () => {
  it('should register a new user successfully', async () => {
    await testApiHandler({
      appHandler: registerRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            name: authMock.name,
            email: authMock.email,
            password: authMock.password,
            confirmPassword: authMock.password,
          }),
        });

        const body = await res.json();

        expect(res.status).toBe(201);
        expect(body.user).toHaveProperty('id');
        expect(body.user.email).toBe(authMock.email);
        expect(body.token).toBeDefined();
      },
    });
  });

  it('should not allow registering with an existing email', async () => {
    await testApiHandler({
      appHandler: registerRoute,
      async test({ fetch }) {
        const payload = {
          name: authMock.name,
          email: authMock.email,
          password: authMock.password,
          confirmPassword: authMock.password,
        };

        await fetch({
          method: 'POST',
          body: JSON.stringify(payload),
        });

        const res = await fetch({
          method: 'POST',
          body: JSON.stringify(payload),
        });

        const body = await res.json();

        expect(res.status).toBe(409);
        expect(body.message).toBe(`There's already an user with this e-mail on the database!`);
      },
    });
  });

  it('should return error when passwords do not match', async () => {
    await testApiHandler({
      appHandler: registerRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            name: authMock.name,
            email: authMock.email,
            password: authMock.password,
            confirmPassword: 'Teste1234567!',
          }),
        });

        expect(res.status).toBe(500);
      },
    });
  });

  it('should return error for invalid email', async () => {
    await testApiHandler({
      appHandler: registerRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            name: authMock.name,
            email: 'johnemail.com',
            password: authMock.password,
            confirmPassword: authMock.password,
          }),
        });

        expect(res.status).toBe(500);
      },
    });
  });

  it('should return error when required fields are missing', async () => {
    await testApiHandler({
      appHandler: registerRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          body: JSON.stringify({
            email: authMock.email,
            password: authMock.password,
            confirmPassword: authMock.password,
          }),
        });

        expect(res.status).toBe(500);
      },
    });
  });
  //O últmos 3 testes simulam erros na validação do zod, que retornam 500
});
