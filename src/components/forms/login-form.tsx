'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { type SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import loginBodySchema from '@/zodSchemas/login-body-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGeneralStore } from '@/zustand-stores/general/general.store';
import { LoadingSpinner } from '../spinners/loading-spinner';

export type LoginType = z.infer<typeof loginBodySchema>;

export default function LoginForm() {
  const isLoading = useGeneralStore((store) => store.isLoading);
  const statusMessage = useGeneralStore((store) => store.statusMessage);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginBodySchema),
  });

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col items-center justify-center m-auto pt-10 font-inter">
      <Card className="hover:shadow-lg hover:shadow-cyan-700 w-90 sm:min-w-105">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-cyan-700">
            Log in to your account below:
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start gap-3 font- w-full">
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Label htmlFor="email" className="text-md text-stone-700">
                  Enter your e-mail
                </Label>
                <Input
                  className="text-md text-cyan-700"
                  type="text"
                  id="email"
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
                  type="password"
                  id="password"
                  {...register('password')}
                  placeholder="Your password here"
                  required
                />
                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password.message}</p>
                )}
              </div>
              <div className="w-full items-center pt-3 flex flex-col">
                <Button
                  className="cursor-pointer w-full font-bold text-lg hover:bg-cyan-700"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting || isLoading ? <LoadingSpinner /> : 'Sign In'}
                </Button>
                <span className="text-red-600 text-sm pt-2">{statusMessage}</span>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 items-center ">
          <p className="text-md sm:text-lg text-stone-700">
            Do not have an account?{' '}
            <Link href="/register">
              <span className="cursor-pointer font-bold hover:underline hover:text-cyan-700">
                Register Now!
              </span>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
