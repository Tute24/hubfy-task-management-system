import RegisterForm from '@/components/forms/register-form';
import UnloggedHeader from '@/components/headers/unlogged-header';

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-5 sm:gap-20 pb-5">
      <UnloggedHeader />
      <RegisterForm />
    </div>
  );
}
