import { testApiHandler } from 'next-test-api-route-handler';
import * as registerRoute from '@/app/api/auth/register/route';
import { authMock } from '../../__mocks__/auth-mock';
export async function registerUser() {
  await testApiHandler({
    appHandler: registerRoute,
    async test({ fetch }) {
      await fetch({
        method: 'POST',
        body: JSON.stringify({
          name: authMock.name,
          email: authMock.email,
          password: authMock.password,
          confirmPassword: authMock.password,
        }),
      });
    },
  });
}
