import { UserAlreadyExistsError } from '../../../core/errors/user-already-exists-error';
import { AuthRepository } from '../interfaces/auth-repository-interface';
import { hash } from 'bcryptjs';
import { generateJwt } from '../utils/jwt-generator';

export interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private authRepository: AuthRepository) {}

  async execute({ name, email, password }: RegisterServiceRequest) {
    const passwordHash = await hash(password, 6);

    const checkExistentUser = await this.authRepository.findByEmail(email);
    if (checkExistentUser) {
      throw new UserAlreadyExistsError();
    }

    const newUser = await this.authRepository.create({ name, email, password: passwordHash });
    const token = generateJwt(newUser.id, newUser.email);

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    };
  }
}
