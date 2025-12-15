import { IncorrectPasswordError } from '../../../core/errors/incorrect-password-error';
import { UserNotFoundError } from '../../../core/errors/user-not-found-error';
import { AuthRepository } from '../interfaces/auth-repository-interface';
import { compare } from 'bcryptjs';
import { generateJwt } from '../utils/jwt-generator';
interface LoginRequest {
  email: string;
  password: string;
}

export class LoginService {
  constructor(private authRepository: AuthRepository) {}
  async execute({ email, password }: LoginRequest) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) throw new UserNotFoundError();

    if (!(await compare(password, user.password))) throw new IncorrectPasswordError();

    const token = generateJwt(user.id, user.email);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
