import CreateTasksForm from '@/components/forms/create-tasks-form';
import LoggedHeader from '@/components/headers/logged-header';

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-5 sm:gap-20 pb-5">
      <LoggedHeader />
      <CreateTasksForm />
    </div>
  );
}
