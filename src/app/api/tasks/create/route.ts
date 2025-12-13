import { MissingSecretKeyError } from '@/core/errors/missing-secret-key-error';
import { UserNotAuthenticatedError } from '@/core/errors/user-not-authenticated-error';
import { authCheck } from '@/core/middlewares/auth-check';
import { createTasks } from '@/modules/tasks/controllers/create-tasks';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { id } = authCheck(req);
    const { status, data } = await createTasks(req, id);
    return NextResponse.json(data, { status });
  } catch (error) {
    if (error instanceof UserNotAuthenticatedError)
      return NextResponse.json({ message: error.message }, { status: 401 });
    if (error instanceof MissingSecretKeyError)
      return NextResponse.json({ message: error.message }, { status: 400 });

    return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
  }
}
