import { testApiHandler } from 'next-test-api-route-handler';
import * as loginRoute from '@/app/api/auth/login/route';
import { authMock } from '../../__mocks__/auth-mock';
export async function registerUser() {
  await testApiHandler({
    appHandler: loginRoute,
    async test({ fetch }) {
      await fetch({
        method: 'POST',
        body: JSON.stringify({
          email: authMock.email,
          password: authMock.password,
        }),
      });
    },
  });
}
