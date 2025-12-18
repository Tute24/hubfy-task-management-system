import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DeleteTaskModal } from '@/components/modals/delete-task-modal';
import { Button } from '@/components/ui/button';

const deleteModalProps = {
  title: 'Task1',
  isDeleting: false,
  description: 'Description',
  created_at: '01-01-2025',
  requestHandler: vi.fn(),
  statusMessage: '',
  buttonLayout: <Button data-testid="open-delete-modal">Delete</Button>,
};

const mockRequestHandler = vi.fn();

describe('DeleteTaskModal', () => {
  it('should render the modal trigger button', () => {
    render(
      <DeleteTaskModal
        title={deleteModalProps.title}
        isDeleting={deleteModalProps.isDeleting}
        requestHandler={mockRequestHandler}
        statusMessage={deleteModalProps.statusMessage}
        buttonLayout={deleteModalProps.buttonLayout}
      />,
    );
    expect(screen.getByTestId('open-delete-modal')).toBeInTheDocument();
  });

  it('should call requestHandler when clicking Delete Task', async () => {
    render(
      <DeleteTaskModal
        title={deleteModalProps.title}
        isDeleting={deleteModalProps.isDeleting}
        requestHandler={mockRequestHandler}
        statusMessage={deleteModalProps.statusMessage}
        buttonLayout={deleteModalProps.buttonLayout}
      />,
    );

    fireEvent.click(screen.getByTestId('open-delete-modal'));

    const deleteButton = await screen.findByRole('button', {
      name: /delete task/i,
    });
    fireEvent.click(deleteButton);

    expect(mockRequestHandler).toHaveBeenCalledTimes(1);
  });

  it('should close the modal when clicking Cancel', async () => {
    render(
      <DeleteTaskModal
        title={deleteModalProps.title}
        isDeleting={deleteModalProps.isDeleting}
        requestHandler={mockRequestHandler}
        statusMessage={deleteModalProps.statusMessage}
        buttonLayout={deleteModalProps.buttonLayout}
      />,
    );

    fireEvent.click(screen.getByTestId('open-delete-modal'));

    const cancelButton = await screen.findByRole('button', {
      name: /cancel/i,
    });
    fireEvent.click(cancelButton);

    expect(screen.queryByText('Delete Task')).not.toBeInTheDocument();
  });
});
