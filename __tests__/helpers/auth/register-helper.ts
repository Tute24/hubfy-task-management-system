import { testApiHandler } from 'next-test-api-route-handler';
import * as registerRoute from '@/app/api/auth/register/route';
import { authMock } from '../../__mocks__/auth-mock';
import { RegisterLoginResponseType } from '@/types/responses/register-response-type';
export async function registerUser() {
  let result: RegisterLoginResponseType | undefined;
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
      const body = (await res.json()) as RegisterLoginResponseType;
      result = body;
    },
  });
  if (!result) {
    throw new Error('Register user failed in test helper');
  }

  return result;
}
