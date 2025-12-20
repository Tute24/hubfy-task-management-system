import LoginForm from '@/components/forms/login-form';
import UnloggedHeader from '@/components/headers/unlogged-header';

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-5 sm:gap-20 pb-5">
      <UnloggedHeader />
      <LoginForm />
    </div>
  );
}
