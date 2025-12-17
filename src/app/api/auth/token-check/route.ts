import { MissingSecretKeyError, UserNotAuthenticatedError } from '@/core/errors';
import { authCheck } from '@/core/middlewares/auth-check';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    authCheck(req);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    if (error instanceof MissingSecretKeyError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof UserNotAuthenticatedError)
      return NextResponse.json({ message: error.message }, { status: 401 });

    return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
  }
}
