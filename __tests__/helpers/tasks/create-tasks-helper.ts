import { testApiHandler } from 'next-test-api-route-handler';
import * as createAndGetTasksRoute from '@/app/api/tasks/route';
import { tasksMock } from '../../__mocks__/tasks-mock';
export async function createTasks(token: string) {
  await testApiHandler({
    appHandler: createAndGetTasksRoute,
    async test({ fetch }) {
      await fetch({
        method: 'POST',
        body: JSON.stringify({
          tasks: tasksMock.create,
        }),
        headers: [['Authorization', `Bearer ${token}`]],
      });
    },
  });
}
