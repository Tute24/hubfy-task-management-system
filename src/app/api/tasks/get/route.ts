import { MissingSecretKeyError } from '@/core/errors/missing-secret-key-error';
import { UserNotAuthenticatedError } from '@/core/errors/user-not-authenticated-error';
import { authCheck } from '@/core/middlewares/auth-check';
import { getTasks } from '@/modules/tasks/controllers/get-tasks';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { id } = authCheck(req);
    const tasks = await getTasks(id);
    return NextResponse.json({ message: 'Tasks successfully fetched', tasks }, { status: 200 });
  } catch (error) {
    if (error instanceof UserNotAuthenticatedError)
      return NextResponse.json({ message: error.message }, { status: 401 });
    if (error instanceof MissingSecretKeyError)
      return NextResponse.json({ message: error.message }, { status: 400 });

    return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
  }
}
