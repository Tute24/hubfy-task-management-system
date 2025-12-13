import { ForbiddenUserError } from '@/core/errors/forbidden-user-error';
import { MissingParamError } from '@/core/errors/missing-params-error';
import { MissingSecretKeyError } from '@/core/errors/missing-secret-key-error';
import { TaskNotFoundError } from '@/core/errors/task-not-found-error';
import { UserNotAuthenticatedError } from '@/core/errors/user-not-authenticated-error';
import { authCheck } from '@/core/middlewares/auth-check';
import { deleteTask } from '@/modules/tasks/controllers/delete-task';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const taskId = (await params).id;
    const userId = authCheck(req).id;
    await deleteTask(req, userId, taskId);
    return NextResponse.json({ message: 'Task successfully deleted.' }, { status: 200 });
  } catch (error) {
    if (error instanceof MissingSecretKeyError || error instanceof MissingParamError)
      return NextResponse.json({ message: error.message }, { status: 400 });
    if (error instanceof UserNotAuthenticatedError)
      return NextResponse.json({ message: error.message }, { status: 401 });
    if (error instanceof ForbiddenUserError)
      return NextResponse.json({ message: error.message }, { status: 403 });
    if (error instanceof TaskNotFoundError)
      return NextResponse.json({ message: error.message }, { status: 404 });

    return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
  }
}
