import { Pencil, Trash } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import dayjs from 'dayjs';
import { parseStatusString } from '@/utils/parse-status-string';
import { Button } from '../ui/button';
import { DeleteTaskModal } from '../modals/delete-task-modal';
import { deleteUserHandler } from '@/utils/delete-task-handler';

export interface TaskCardProps {
  id: number;
  title: string;
  description?: string;
  status: string;
  created_at: string;
  setIsDeleting: (isDeleting: boolean) => void;
  isDeleting: boolean;
}

export default function TaskCard({
  id,
  title,
  description,
  status,
  created_at,
  setIsDeleting,
  isDeleting,
}: TaskCardProps) {
  return (
    <Card className="hover:shadow-lg hover:shadow-cyan-700 w-90 sm:min-w-105 font-inter">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="text-2xl font-bold items-center text-cyan-700">{title}</CardTitle>
        <div className="flex flex-row gap-2">
          <Button variant="ghost" className="cursor-pointer">
            <Pencil size={16} className="text-green-600" />
          </Button>
          <DeleteTaskModal
            title={title}
            isDeleting={isDeleting}
            requestHandler={() => deleteUserHandler({ taskId: id, setIsDeleting: setIsDeleting })}
            buttonLayout={
              <Button variant="ghost" className="cursor-pointer">
                <Trash size={16} className="text-red-600" />
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-start text-neutral-600 w-full">
        {description}
      </CardContent>
      <CardFooter className="items-center flex flex-row justify-between text-x sm:text-sm text-cyan-700">
        <div>Created at: {dayjs(created_at).format('DD/MM/YY HH:mm')}</div>
        <div>Status: {parseStatusString(status)} </div>
      </CardFooter>
    </Card>
  );
}
