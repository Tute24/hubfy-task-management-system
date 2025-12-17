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

export interface ModalComponentProps {
  title: string;
  isDeleting: boolean;
  requestHandler: () => void;
  buttonLayout: React.ReactNode;
}

export function DeleteTaskModal({
  title,
  isDeleting,
  requestHandler,
  buttonLayout,
}: ModalComponentProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{buttonLayout}</DialogTrigger>
      <DialogContent className="max-w-105 sm:max-w-90">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription className="font-semibold text-cyan-700">
            You are about to delete {title}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'default'} className="cursor-pointer" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant={'destructive'}
            onClick={requestHandler}
            className="cursor-pointer"
            disabled={isDeleting}
          >
            {isDeleting ? <LoadingSpinner /> : 'Delete Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
