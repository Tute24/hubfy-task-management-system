import { describe, it, expect, vi, type Mock, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { loginRequest } from '@/requests/auth/login';
import LoginForm from '@/components/forms/login-form';
import { authMock } from '../../__mocks__/auth-mock';

const mockSignInRequest = loginRequest as Mock;
const mockPush = vi.fn();

vi.mock('@/requests/auth/login');
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('LoginForm', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('should render the form inputs and submit button', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('Enter your e-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('should return success on log in submit', async () => {
    mockSignInRequest.mockResolvedValue({ success: true });
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText('Your e-mail here');
    const passwordInput = screen.getByPlaceholderText('Your password here');
    const loginButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.change(emailInput, {
      target: { value: authMock.email },
    });
    fireEvent.change(passwordInput, {
      target: { value: authMock.password },
    });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockSignInRequest).toHaveBeenCalledWith({
        email: authMock.email,
        password: authMock.password,
      });
      expect(mockPush).toHaveBeenCalledWith('/portal/dashboard');
    });
  });
  it('should not call the request on zod validation error', async () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText('Your e-mail here');
    const passwordInput = screen.getByPlaceholderText('Your password here');
    const loginButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.change(emailInput, {
      target: { value: 'email' },
    });
    fireEvent.change(passwordInput, {
      target: { value: authMock.password },
    });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockSignInRequest).not.toHaveBeenCalled();
      expect(screen.getByText('This is not a valid email address.')).toBeInTheDocument();
    });
  });
});
