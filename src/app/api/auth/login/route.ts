import { login } from '@/modules/auth/controllers/login';
import { IncorrectPasswordError } from '@/modules/auth/errors/incorrect-password-error';
import { MissingSecretKeyError } from '@/modules/auth/errors/missing-secret-key-error';
import { UserNotFoundError } from '@/modules/auth/errors/user-not-found-error';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { status, data } = await login(req);
    return NextResponse.json(data, { status });
  } catch (error) {
    if (error instanceof MissingSecretKeyError)
      return NextResponse.json({ message: error.message }, { status: 400 });

    if (error instanceof IncorrectPasswordError)
      return NextResponse.json({ message: error.message }, { status: 401 });

    if (error instanceof UserNotFoundError)
      return NextResponse.json({ message: error.message }, { status: 404 });

    return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
  }
}
