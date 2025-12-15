import loginBodySchema from '@/zodSchemas/login-body-schema';
import { PrismaAuthRespository } from '../repositories/prisma-auth-repository';
import { LoginService } from '../services/login';

export async function login(req: Request) {
  const body = await req.json();
  const { email, password } = loginBodySchema.parse(body);

  const authRepository = new PrismaAuthRespository();
  const loginService = new LoginService(authRepository);

  const { user, token } = await loginService.execute({ email, password });
  return { status: 200, data: { message: 'Login was successful!', user, token } };
}
