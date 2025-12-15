import { NextResponse } from 'next/server';
import { register } from '@/modules/auth/controllers/register';
import { UserAlreadyExistsError, MissingSecretKeyError } from '@/core/errors';

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
