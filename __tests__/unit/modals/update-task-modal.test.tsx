import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, Mock } from 'vitest';
import { UpdateTaskModal } from '@/components/modals/update-task-modal';
import { Button } from '@/components/ui/button';
import { updateTaskHandler } from '@/utils/update-task-handler';

const updateModalProps = {
  id: 1,
  title: 'Task1',
  description: 'Description',
  statusMessage: '',
  buttonLayout: <Button data-testid="open-update-modal">Update</Button>,
};

vi.mock('@/utils/update-task-handler');

const mockUpdateTaskHandler = updateTaskHandler as Mock;

describe('UpdateTaskModal', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render modal with default values when opened', async () => {
    render(
      <UpdateTaskModal
        id={updateModalProps.id}
        title={updateModalProps.title}
        description={updateModalProps.description}
        status="PENDING"
        statusMessage={updateModalProps.statusMessage}
        buttonLayout={updateModalProps.buttonLayout}
      />,
    );

    fireEvent.click(screen.getByTestId('open-update-modal'));

    expect(
      screen.getByText(`You are about to update ${updateModalProps.title}`),
    ).toBeInTheDocument();

    expect(screen.getByDisplayValue(updateModalProps.description)).toBeInTheDocument();

    expect(screen.getAllByText('Pending')).toHaveLength(2);
  });

  it('should submit form and call updateTaskHandler', async () => {
    render(
      <UpdateTaskModal
        id={updateModalProps.id}
        title={updateModalProps.title}
        description={updateModalProps.description}
        status="PENDING"
        statusMessage={updateModalProps.statusMessage}
        buttonLayout={updateModalProps.buttonLayout}
      />,
    );

    fireEvent.click(screen.getByTestId('open-update-modal'));

    const titleInput = await screen.findByLabelText('Task title');
    fireEvent.change(titleInput, {
      target: { value: 'Updated title' },
    });

    const submitButton = screen.getByRole('button', {
      name: /update task/i,
    });

    fireEvent.click(submitButton);

    waitFor(() =>
      expect(mockUpdateTaskHandler).toHaveBeenCalledWith({
        taskId: updateModalProps.id,
        data: {
          title: 'Updated title',
          description: updateModalProps.description,
          status: 'PENDING',
        },
      }),
    );
  });

  it('should close modal when clicking cancel', async () => {
    render(
      <UpdateTaskModal
        id={updateModalProps.id}
        title={updateModalProps.title}
        description={updateModalProps.description}
        status="PENDING"
        statusMessage={updateModalProps.statusMessage}
        buttonLayout={updateModalProps.buttonLayout}
      />,
    );

    fireEvent.click(screen.getByTestId('open-update-modal'));

    const cancelButton = await screen.findByRole('button', {
      name: /cancel/i,
    });

    fireEvent.click(cancelButton);

    expect(screen.queryByText('Update Task')).not.toBeInTheDocument();
  });
});
