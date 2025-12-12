import registerBodySchema from '@/zodSchemas/register-body-schema';
import { PrismaAuthRespository } from '../repositories/prisma-auth-repository';
import { RegisterService } from '../services/register';

export async function register(req: Request) {
  const body = await req.json();
  console.log(body);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, email, password, confirmPassword } = registerBodySchema.parse(body);
  const authRepository = new PrismaAuthRespository();
  const registerService = new RegisterService(authRepository);

  const { user, token } = await registerService.execute({ name, email, password });

  return { status: 201, data: { message: 'User succesfully registered!', user, token } };
}
