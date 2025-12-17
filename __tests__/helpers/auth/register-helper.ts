import { testApiHandler } from 'next-test-api-route-handler';
import * as registerRoute from '@/app/api/auth/register/route';
import { RegisterLoginResponseType } from '@/types/responses/register-login-response-type';
import { RegisterServiceRequest } from '@/modules/auth/services/register';

export async function registerUser({ name, email, password }: RegisterServiceRequest) {
  let result: RegisterLoginResponseType | undefined;
  await testApiHandler({
    appHandler: registerRoute,
    async test({ fetch }) {
      const res = await fetch({
        method: 'POST',
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          confirmPassword: password,
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
