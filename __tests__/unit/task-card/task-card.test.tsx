import TaskCard from '@/components/task-card/task-card';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const taskCardProps = {
  id: 1,
  title: 'Task1',
  description: 'Description',
  created_at: '01-01-2025',
  setIsDeleting: vi.fn(),
  isDeleting: false,
  statusMessage: '',
};

describe('TaskCard', () => {
  it('should render the card correctly', () => {
    render(
      <TaskCard
        id={taskCardProps.id}
        title={taskCardProps.title}
        description={taskCardProps.description}
        status="PENDING"
        created_at={taskCardProps.created_at}
        setIsDeleting={taskCardProps.setIsDeleting}
        isDeleting={taskCardProps.isDeleting}
        statusMessage={taskCardProps.statusMessage}
      />,
    );

    expect(screen.getByText(taskCardProps.title)).toBeInTheDocument();
    expect(screen.getByText(taskCardProps.description)).toBeInTheDocument();
    expect(screen.getByTestId(`update-task-button-${taskCardProps.id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`delete-task-button-${taskCardProps.id}`)).toBeInTheDocument();
    expect(screen.getByText(`Status: Pending`)).toBeInTheDocument();
    expect(screen.getByText('Created at: 01/01/25 00:00')).toBeInTheDocument();
  });

  it('should open update modal when button is clicked', async () => {
    render(
      <TaskCard
        id={taskCardProps.id}
        title={taskCardProps.title}
        description={taskCardProps.description}
        status="PENDING"
        created_at={taskCardProps.created_at}
        setIsDeleting={taskCardProps.setIsDeleting}
        isDeleting={taskCardProps.isDeleting}
        statusMessage={taskCardProps.statusMessage}
      />,
    );

    const updateButton = screen.getByTestId(`update-task-button-${taskCardProps.id}`);
    fireEvent.click(updateButton);

    expect(screen.getByRole('button', { name: /update task/i })).toBeInTheDocument();
    expect(
      await screen.findByText(`You are about to update ${taskCardProps.title}`),
    ).toBeInTheDocument();
  });

  it('should open delete modal when button is clicked', async () => {
    render(
      <TaskCard
        id={taskCardProps.id}
        title={taskCardProps.title}
        description={taskCardProps.description}
        status="PENDING"
        created_at={taskCardProps.created_at}
        setIsDeleting={taskCardProps.setIsDeleting}
        isDeleting={taskCardProps.isDeleting}
        statusMessage={taskCardProps.statusMessage}
      />,
    );

    const deleteButton = screen.getByTestId(`delete-task-button-${taskCardProps.id}`);
    fireEvent.click(deleteButton);

    expect(screen.getByRole('button', { name: /delete task/i })).toBeInTheDocument();
    expect(
      await screen.findByText(`You are about to delete ${taskCardProps.title}`),
    ).toBeInTheDocument();
  });
});
