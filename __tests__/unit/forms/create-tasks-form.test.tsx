import { describe, it, expect, vi, type Mock, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createTasksRequest } from '@/requests/tasks/create-tasks';
import CreateTasksForm from '@/components/forms/create-tasks-form';
import { tasksMock } from '../../__mocks__/tasks-mock';

const mockCreateTasksRequest = createTasksRequest as Mock;

vi.mock('@/requests/tasks/create-tasks');

describe('CreateTasksForm', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('should render the form inputs and submit button', () => {
    render(<CreateTasksForm />);
    expect(screen.getByLabelText('Task title')).toBeInTheDocument();
    expect(screen.getByLabelText('Task description (optional)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should create tasks successfully', async () => {
    render(<CreateTasksForm />);
    const taskTitleInput = screen.getByPlaceholderText('Insert the task title');
    const taskDescriptionInput = screen.getByPlaceholderText('Insert the task description');
    const createTasksButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.change(taskTitleInput, {
      target: { value: tasksMock.create[0].title },
    });
    fireEvent.change(taskDescriptionInput, {
      target: { value: tasksMock.create[0].description },
    });
    fireEvent.click(createTasksButton);

    await waitFor(() => {
      expect(mockCreateTasksRequest).toHaveBeenCalledWith({ tasks: [tasksMock.create[0]] });
    });
  });
  it('should add more inputs when clicking on add task, and remove them if x button is clicked', async () => {
    render(<CreateTasksForm />);
    const addTaskButton = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(addTaskButton);
    expect(screen.getAllByLabelText('Task title')).toHaveLength(2);
    expect(screen.getAllByLabelText('Task description (optional)')).toHaveLength(2);

    const removeFieldsButton = screen.getByTestId(`remove-fields-1`);
    fireEvent.click(removeFieldsButton);
    expect(screen.getAllByLabelText('Task title')).toHaveLength(1);
    expect(screen.getAllByLabelText('Task description (optional)')).toHaveLength(1);
  });

  it('should not create tasks if title is too short', async () => {
    render(<CreateTasksForm />);
    const taskTitleInput = screen.getByPlaceholderText('Insert the task title');
    const taskDescriptionInput = screen.getByPlaceholderText('Insert the task description');
    const createTasksButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.change(taskTitleInput, {
      target: { value: 'a' },
    });
    fireEvent.change(taskDescriptionInput, {
      target: { value: tasksMock.create[0].description },
    });
    fireEvent.click(createTasksButton);

    await waitFor(() => {
      expect(mockCreateTasksRequest).not.toHaveBeenCalled();
      expect(
        screen.getByText('Enter a valid title with at least 2 characters.'),
      ).toBeInTheDocument();
    });
  });
});
