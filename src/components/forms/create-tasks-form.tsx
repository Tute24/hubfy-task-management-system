'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CircleX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import tasksBodySchema from '@/zodSchemas/tasks-body-schema';
import { Button } from '../ui/button';
import { LoadingSpinner } from '../spinners/loading-spinner';
import { useGeneralStore } from '@/zustand-stores/general/general.store';

export type CreateTasksType = z.infer<typeof tasksBodySchema>;

export default function CreateTasksForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTasksType>({
    resolver: zodResolver(tasksBodySchema),
    defaultValues: {
      tasks: [{ title: '', description: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray<CreateTasksType>({
    control,
    name: 'tasks',
  });
  const statusMessage = useGeneralStore((store) => store.statusMessage);
  const onSubmit: SubmitHandler<CreateTasksType> = (data) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col items-center justify-center m-auto pt-10 font-inter">
      <Card className="hover:shadow-lg hover:shadow-cyan-700 w-90 sm:min-w-105">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-cyan-700">
            Create new tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start gap-3 font- w-full">
              {fields.map((_, index) => (
                <div key={index} className="flex flex-col items-start justify-start gap-5 w-full">
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <div className="flex justify-between items-center w-full">
                      <Label htmlFor={`title-${index}`} className="text-md text-stone-700">
                        Task title
                      </Label>
                      {index > 0 ? (
                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={() => remove(index)}
                        >
                          <CircleX size={18} className="text-red-600" />
                        </button>
                      ) : null}
                    </div>
                    <Input
                      className="text-md text-cyan-700"
                      type="text"
                      id={`title-${index}`}
                      {...register(`tasks.${index}.title`)}
                      placeholder="Insert the task title"
                      required
                    />
                    {errors.tasks?.[index]?.title && (
                      <p className="text-red-600 text-sm">
                        {errors.tasks?.[index]?.title?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <Label htmlFor={`description-${index}`} className="text-md text-stone-700">
                      {`Task description (optional)`}
                    </Label>
                    <Input
                      className="text-md text-cyan-700"
                      type="text"
                      id={`description-${index}`}
                      {...register(`tasks.${index}.description`)}
                      placeholder="Inser the task description"
                    />
                    {errors.tasks?.[index]?.description && (
                      <p className="text-red-600 text-sm">
                        {errors.tasks?.[index]?.description?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <Button
                type="button"
                className="cursor-pointer w-full font-bold text-lg text-black bg-cyan-500 hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  append({ title: '', description: '' });
                }}
              >
                Add task
              </Button>
              <Button
                className="cursor-pointer w-full font-bold text-lg hover:bg-cyan-700"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <LoadingSpinner /> : 'Submit'}
              </Button>
              <span className="text-red-600 text-sm pt-2">{statusMessage}</span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
