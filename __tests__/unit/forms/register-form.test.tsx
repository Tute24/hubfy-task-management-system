import { describe, it, expect, vi, type Mock, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { authMock } from '../../__mocks__/auth-mock';
import { registerRequest } from '@/requests/auth/register';
import RegisterForm from '@/components/forms/register-form';

const mockRegisterRequest = registerRequest as Mock;
const mockPush = vi.fn();

vi.mock('@/requests/auth/register');
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('RegisterForm', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('should render the form inputs and submit button', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText('Enter your first name')).toBeInTheDocument();
    expect(screen.getByLabelText('Enter your e-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Enter your password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('should return success on register submit', async () => {
    mockRegisterRequest.mockResolvedValue({ success: true });
    render(<RegisterForm />);
    const nameInput = screen.getByPlaceholderText('Your name here');
    const emailInput = screen.getByPlaceholderText('Your e-mail here');
    const passwordInput = screen.getByPlaceholderText('Your password here');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');
    const registerButton = screen.getByRole('button', { name: /register/i });
    fireEvent.change(nameInput, {
      target: { value: authMock.name },
    });
    fireEvent.change(emailInput, {
      target: { value: authMock.email },
    });
    fireEvent.change(passwordInput, {
      target: { value: authMock.password },
    });
    fireEvent.change(confirmPasswordInput, {
      target: { value: authMock.password },
    });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockRegisterRequest).toHaveBeenCalledWith({
        name: authMock.name,
        email: authMock.email,
        password: authMock.password,
        confirmPassword: authMock.password,
      });
      expect(mockPush).toHaveBeenCalledWith('/portal/dashboard');
    });
  });
  it('should not call the request if passwords dont match', async () => {
    render(<RegisterForm />);
    const nameInput = screen.getByPlaceholderText('Your name here');
    const emailInput = screen.getByPlaceholderText('Your e-mail here');
    const passwordInput = screen.getByPlaceholderText('Your password here');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');
    const registerButton = screen.getByRole('button', { name: /register/i });
    fireEvent.change(nameInput, {
      target: { value: authMock.name },
    });
    fireEvent.change(emailInput, {
      target: { value: authMock.email },
    });
    fireEvent.change(passwordInput, {
      target: { value: authMock.password },
    });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Teste3333!' },
    });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockRegisterRequest).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
      expect(screen.getByText('Passwords must match!')).toBeInTheDocument();
    });
  });
});
