import {
  ForbiddenUserError,
  MissingParamError,
  MissingPropsError,
  MissingSecretKeyError,
  TaskNotFoundError,
  UserNotAuthenticatedError,
} from '@/core/errors/index';
import { authCheck } from '@/core/middlewares/auth-check';
import { deleteTask } from '@/modules/tasks/controllers/delete-task';
import { updateTask } from '@/modules/tasks/controllers/update-task';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const taskId = (await params).id;
    const userId = authCheck(req).id;
    await deleteTask(userId, taskId);
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

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const taskId = (await params).id;
    const userId = authCheck(req).id;
    await updateTask(req, userId, taskId);
    return NextResponse.json({ message: 'Task successfully updated.' }, { status: 200 });
  } catch (error) {
    if (
      error instanceof MissingSecretKeyError ||
      error instanceof MissingParamError ||
      error instanceof MissingPropsError
    )
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
