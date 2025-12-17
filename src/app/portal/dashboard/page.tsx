'use client';

import LoggedHeader from '@/components/headers/logged-header';
import { HydrationSpinner } from '@/components/spinners/hydration-spinner';
import TaskCard from '@/components/task-card/task-card';
import { getTasksRequest } from '@/requests/tasks/get-tasks';
import { useGeneralStore } from '@/zustand-stores/general/general.store';
import { useTasksStore } from '@/zustand-stores/tasks/tasks.store';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const isLoading = useGeneralStore((store) => store.isLoading);
  const statusMessage = useGeneralStore((store) => store.statusMessage);
  const tasksArray = useTasksStore((store) => store.tasksArray);
  const hasHydrated = useTasksStore((store) => store.hasHydrated);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    getTasksRequest();
  }, []);
  return (
    <div className="flex flex-col gap-5 sm:gap-20 pb-5 font-inter">
      <LoggedHeader />
      <div className="flex flex-col m-auto">
        {!hasHydrated || isLoading ? (
          <HydrationSpinner />
        ) : (
          <div>
            {tasksArray.length === 0 ? (
              <h2 className="text-lg font-bold">No tasks to show.</h2>
            ) : (
              <ul className="flex flex-col gap-5">
                {tasksArray.sort().map((task) => (
                  <li key={task.id}>
                    <TaskCard
                      id={task.id}
                      title={task.title}
                      description={task.description ?? ''}
                      status={task.status}
                      created_at={task.created_at}
                      isDeleting={isDeleting}
                      setIsDeleting={setIsDeleting}
                      statusMessage={statusMessage ?? ''}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
