import { NextResponse } from 'next/server';
import { register } from '@/modules/auth/controllers/register';
import { UserAlreadyExistsError } from '@/core/errors/user-already-exists-error';
import { MissingSecretKeyError } from '@/core/errors/missing-secret-key-error';

export async function POST(req: Request) {
  try {
    const { data, status } = await register(req);
    return NextResponse.json(data, { status });
  } catch (error: unknown) {
    if (error instanceof UserAlreadyExistsError) {
      return NextResponse.json({ message: error.message }, { status: 409 });
    }

    if (error instanceof MissingSecretKeyError) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
  }
}
