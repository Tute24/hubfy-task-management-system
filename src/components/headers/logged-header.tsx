'use client';

import { FilePlusCorner, House, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { logoutRequest } from '@/requests/auth/logout';
import { useRouter } from 'next/navigation';
import { useGeneralStore } from '@/zustand-stores/general/general.store';
import { useAuthStore } from '@/zustand-stores/auth/auth.store';

export default function LoggedHeader() {
  const setStatusMessage = useGeneralStore((store) => store.setStatusMessage);
  const user = useAuthStore((store) => store.user);
  const router = useRouter();
  async function logoutHandler() {
    const response = await logoutRequest();
    if (response.success) {
      window.alert(response.message);
      router.push('/');
    } else {
      window.alert(response.message);
    }
  }
  return (
    <>
      <div className="flex flex-row py-5 max-h-21.25 text-center items-center w-full">
        <nav className="flex items-center justify-between flex-row w-full px-5 sm:text-xl font-poppins font-semibold">
          <div className="flex flex-row gap-2 sm:gap-5 items-center">
            <div data-testid="dashboard-reference cursor-pointer">
              <Link onClick={() => setStatusMessage('')} href="/portal/dashboard">
                <House className="text-cyan-700" size={50} />
              </Link>
            </div>
            Welcome, {user?.name}
          </div>
          <div className="hidden sm:block">
            <Link onClick={() => setStatusMessage('')} href="/portal/create-tasks">
              <div className="hover:underline text-cyan-700">Create Tasks</div>
            </Link>
          </div>
          <div className="hidden sm:block">
            <Button onClick={logoutHandler} variant={'ghost'} className="cursor-pointer">
              <LogOut className="text-cyan-700" size={30} />
              <div className="text-cyan-700 font-semibold text-xl">Log Out</div>
            </Button>
          </div>
          <div className="block sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu className="text-cyan-700" size={28} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="font-medium text-cyan-700 px-3 bg-white">
                <DropdownMenuLabel className="text-xl font-bold font-poppins">
                  Options
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-cyan-700 -mx-3" />
                <DropdownMenuItem>
                  <Button variant={'ghost'}>
                    <FilePlusCorner size={30} className="text-cyan-700" />
                    <Link onClick={() => setStatusMessage('')} href="/portal/create-tasks">
                      <div className="hover:underline text-cyan-700 text-lg">Create Tasks</div>
                    </Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button onClick={logoutHandler} variant={'ghost'} className="cursor-pointer">
                    <LogOut className="text-cyan-700" size={30} />
                    <div className="text-cyan-700 font-semibold text-lg">Log out</div>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </>
  );
}
