'use client';

import { useGeneralStore } from '@/zustand-stores/general/general.store';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import registerBodySchema from '@/zodSchemas/register-body-schema';
import { LoadingSpinner } from '../spinners/loading-spinner';
import { registerRequest } from '@/requests/auth/register';
import { useRouter } from 'next/navigation';

export type RegisterType = z.infer<typeof registerBodySchema>;
export default function RegisterForm() {
  const isLoading = useGeneralStore((store) => store.isLoading);
  const statusMessage = useGeneralStore((store) => store.statusMessage);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerBodySchema),
  });

  const onSubmit: SubmitHandler<RegisterType> = async (data) => {
    const response = await registerRequest(data);
    if (response.success) router.push('/portal/dashboard');
  };
  return (
    <div className="flex flex-col items-center justify-center m-auto pt-10 font-inter">
      <Card className="hover:shadow-lg hover:shadow-cyan-700 w-90 sm:min-w-105">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-cyan-700">
            Register yourself below:
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start gap-3 font- w-full">
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Label htmlFor="name" className="text-md text-stone-700">
                  Enter your first name
                </Label>
                <Input
                  className="text-md text-cyan-700"
                  id="name"
                  type="text"
                  {...register('name')}
                  placeholder="Your name here"
                  required
                />
                {errors.name && <p className="text-red-600 text-sm ">{errors.name.message}</p>}
              </div>
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Label htmlFor="email" className="text-md text-stone-700">
                  Enter your e-mail
                </Label>
                <Input
                  className="text-md text-cyan-700"
                  id="email"
                  type="text"
                  {...register('email')}
                  placeholder="Your e-mail here"
                  required
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
              </div>
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="flex flex-row justify-between gap-10 items-baseline">
                  <Label htmlFor="password" className="text-md text-stone-700">
                    Enter your password
                  </Label>
                </div>
                <Input
                  className="text-md text-cyan-700"
                  id="password"
                  type="password"
                  {...register('password')}
                  placeholder="Your password here"
                  required
                />
                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="flex flex-row justify-between gap-10 items-baseline">
                  <Label htmlFor="confirmPassword" className="text-md text-stone-700">
                    Confirm your password
                  </Label>
                </div>
                <Input
                  className="text-md text-cyan-700"
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  placeholder="Confirm your password"
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>
              <div className="w-full items-center pt-3 flex flex-col">
                <Button
                  className="cursor-pointer w-full font-bold text-lg hover:bg-cyan-700"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting || isLoading ? <LoadingSpinner /> : 'Register'}
                </Button>
                <span className="text-red-600 text-sm pt-2">{statusMessage}</span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
