'use client';

import { useEffect } from 'react';
import { HydrationSpinner } from '../spinners/hydration-spinner';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/zustand-stores/auth/auth.store';
import { tokenCheckRequest } from '@/requests/auth/token-check';
import { useTasksStore } from '@/zustand-stores/tasks/tasks.store';

export function AuthWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = useAuthStore((store) => store.token);
  const hasHydrated = useAuthStore((store) => store.hasHydrated);
  const sessionValidated = useAuthStore((store) => store.sessionValidated);
  const resetAuthStore = useAuthStore((store) => store.reset);
  const resetTasksStore = useTasksStore((store) => store.reset);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function runCheck() {
      const response = await tokenCheckRequest();
      if (response?.status === 401 || response?.status === 400) {
        resetAuthStore();
        resetTasksStore();
        router.replace('/');
      }
    }
    if (!hasHydrated) return;

    if (!token && pathname.startsWith('/portal')) {
      router.replace('/');
    }

    if (token && !pathname.startsWith('/portal')) {
      router.replace('/portal/dashboard');
    }

    if (token && pathname.startsWith('/portal') && !sessionValidated) {
      runCheck();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated, token, pathname, router]); //use effect aqui é necessario pois ele fica atento ao estados, e garante que a rendereização ocorra antes pra que haja redirecionamento

  if (
    !hasHydrated ||
    (!token && pathname.startsWith('/portal')) ||
    (token && !pathname.startsWith('/portal')) ||
    (token && pathname.startsWith('/portal') && !sessionValidated)
  ) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <HydrationSpinner />
      </div>
    );
  } //isso aq é essencial pra evitar que a tela pisque (flicker) enquanto o redirecionamento ou reidratação estão ocorrendo

  return <>{children}</>;
}
