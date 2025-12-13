import { sign } from 'jsonwebtoken';
import { MissingSecretKeyError } from '../../../core/errors/missing-secret-key-error';

export function generateJwt(id: number, email: string) {
  if (process.env.SECRET_KEY) {
    const token = sign(
      {
        id,
        email,
      },
      process.env.SECRET_KEY,
      { expiresIn: '3h' },
    );
    return token;
  } else {
    throw new MissingSecretKeyError();
  }
}
