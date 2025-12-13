import * as jwt from 'jsonwebtoken';
import { MissingSecretKeyError } from '../errors/missing-secret-key-error';
import { UserNotAuthenticatedError } from '../errors/user-not-authenticated-error';
import { TokenPayloadType } from '@/types/token-payload-type';

export function middleware(req: Request) {
  const authHeader = req.headers.get('Authorization');

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    if (process.env.SECRET_KEY) {
      try {
        const tokenPayload = jwt.verify(token, process.env.SECRET_KEY) as TokenPayloadType;
        if (!tokenPayload.id || !tokenPayload.email) {
          throw new UserNotAuthenticatedError();
        }
        return tokenPayload;
      } catch {
        throw new UserNotAuthenticatedError(); //os erros de token expirados e inválidos vão cair aqui e se transformar em erros de domínio pra que os routes.ts que usem o middleware 'conheçam' apenas esses erros que configurei
      }
    } else {
      throw new MissingSecretKeyError();
    }
  } else {
    throw new UserNotAuthenticatedError();
  }
}
