import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { LoadingSpinner } from '../spinners/loading-spinner';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { UpdateTaskType } from '@/types/task-request-types';
import { zodResolver } from '@hookform/resolvers/zod';
import updateTaskSchema from '@/zodSchemas/update-task-schema';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '../ui/select';
import { updateTaskRequest } from '@/requests/tasks/update-task';

export interface ModalComponentProps {
  id: number;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  buttonLayout: React.ReactNode;
  statusMessage: string;
}

export function UpdateTaskModal({
  id,
  title,
  description,
  status,
  buttonLayout,
  statusMessage,
}: ModalComponentProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdateTaskType>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: title,
      description: description,
      status: status,
    },
  });

  const onSubmit: SubmitHandler<UpdateTaskType> = async (data) => {
    await updateTaskRequest(id, data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{buttonLayout}</DialogTrigger>
      <DialogContent className="w-100 sm:w-105 flex flex-col gap-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="py-3">
            <DialogTitle>Update Task</DialogTitle>
            <DialogDescription className="font-semibold text-cyan-700">
              You are about to update {title}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-start gap-3 font- w-full">
            <div className="flex flex-col gap-2 items-start justify-start w-full">
              <Label htmlFor="title" className="text-md text-stone-700">
                Task title
              </Label>
              <Input
                className="text-md text-cyan-700"
                type="text"
                id="title"
                {...register('title')}
              />
              {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
            </div>
            <div className="flex flex-col gap-2 items-start justify-start w-full">
              <Label htmlFor="description" className="text-md text-stone-700">
                Task description
              </Label>
              <Textarea
                className="text-md text-cyan-700"
                id="description"
                {...register('description')}
              />
              {errors.description && (
                <p className="text-red-600 text-sm">{errors.description.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2 items-start justify-start w-full pb-3">
              <Label className="text-md text-stone-700">Task status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && <p className="text-red-600 text-sm">{errors.status.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <div className="flex flex-row justify-between w-full">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={'default'}
                  className="cursor-pointer"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="cursor-pointer bg-green-600 hover:bg-green-500 text-neutral-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoadingSpinner /> : 'Update Task'}
              </Button>
            </div>
          </DialogFooter>
        </form>
        <span className="text-sm text-red-600 text-center">{statusMessage}</span>
      </DialogContent>
    </Dialog>
  );
}
