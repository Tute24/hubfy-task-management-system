'use client';

import LoggedHeader from '@/components/headers/logged-header';
import { HydrationSpinner } from '@/components/spinners/hydration-spinner';
import TaskCard from '@/components/task-card/task-card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/select';
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
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'>(
    'ALL',
  );
  const filteredTasks =
    statusFilter === 'ALL' ? tasksArray : tasksArray.filter((task) => task.status === statusFilter);

  useEffect(() => {
    getTasksRequest();
  }, []);
  return (
    <div className="flex flex-col gap-5 sm:gap-10 pb-5 font-inter">
      <LoggedHeader />
      <h1 className="text-center text-xl sm:text-2xl font-bold text-cyan-700">Tasks List:</h1>
      <div className="flex flex-col m-auto">
        {!hasHydrated || isLoading ? (
          <HydrationSpinner />
        ) : (
          <>
            <div className="flex justify-between pb-5 items-center">
              <p className="text-lg">Status filter:</p>
              <Select
                value={statusFilter}
                onValueChange={(value) =>
                  setStatusFilter(value as 'ALL' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED')
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ALL">All</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              {filteredTasks.length === 0 ? (
                <h2 className="text-lg font-bold">No tasks to show.</h2>
              ) : (
                <ul className="flex flex-col gap-5">
                  {filteredTasks.map((task) => (
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
          </>
        )}
      </div>
    </div>
  );
}
