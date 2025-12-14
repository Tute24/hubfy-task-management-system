import { describe, it, expect } from 'vitest';
import { testApiHandler } from 'next-test-api-route-handler';
import * as logoutRoute from '@/app/api/auth/logout/route';
import { registerUser } from '../../helpers/auth/register-helper';
import { authMock } from '../../__mocks__/auth-mock';

describe('/api/auth/login', () => {
  it('should logout a user successfully', async () => {
    const { token } = await registerUser();
    await testApiHandler({
      appHandler: logoutRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          headers: [['Authorization', `Bearer ${token}`]],
        });

        const body: { message: string } = await res.json();
        expect(res.status).toBe(200);
        expect(body.message).toBe('User successfully logged out!');
      },
    });
  });

  it('should throw 401 if token is invalid', async () => {
    await testApiHandler({
      appHandler: logoutRoute,
      async test({ fetch }) {
        const res = await fetch({
          method: 'POST',
          headers: [['Authorization', `Bearer token`]],
        });

        expect(res.status).toBe(401);
      },
    });
  });
});
