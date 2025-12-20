import { testApiHandler } from 'next-test-api-route-handler';
import * as loginRoute from '@/app/api/auth/login/route';
import { authMock } from '../../__mocks__/auth-mock';
import { RegisterLoginResponseType } from '@/types/responses/register-login-response-type';
export async function registerUser() {
  let result: RegisterLoginResponseType | undefined;
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
      const body = (await res.json()) as RegisterLoginResponseType;
      result = body;
    },
  });
  if (!result) {
    throw new Error('Register user failed in test helper');
  }

  return result;
}
