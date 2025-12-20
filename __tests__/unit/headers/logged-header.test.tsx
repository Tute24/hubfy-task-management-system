import LoggedHeader from '@/components/headers/logged-header';
import { useAuthStore } from '@/zustand-stores/auth/auth.store';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, Mock, vi } from 'vitest';
import { authMock } from '../../__mocks__/auth-mock';
import { logoutRequest } from '@/requests/auth/logout';

const mockUseAuthStore = useAuthStore as unknown as Mock;
const mockPush = vi.fn();
const mockLogoutRequest = logoutRequest as Mock;

vi.mock('@/zustand-stores/auth/auth.store');
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));
vi.mock('@/requests/auth/logout');

describe('LoggedHeader', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('should render the component correctly', () => {
    mockUseAuthStore.mockReturnValue(authMock);
    render(<LoggedHeader />);
    expect(screen.getByText(`Welcome, ${authMock.name}`)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /create tasks/i })).toHaveAttribute(
      'href',
      '/portal/create-tasks',
    );
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  });

  it('should successfully logout', async () => {
    mockUseAuthStore.mockReturnValue(authMock);
    mockLogoutRequest.mockResolvedValue({ success: true, message: 'Success' });
    render(<LoggedHeader />);

    const logOutButton = screen.getByRole('button', { name: /log out/i });
    fireEvent.click(logOutButton);

    await waitFor(() => {
      expect(mockLogoutRequest).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
});
