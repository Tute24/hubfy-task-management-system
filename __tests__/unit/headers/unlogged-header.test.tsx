import UnloggedHeader from '@/components/headers/unlogged-header';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('UnloggedHeader', () => {
  it('should render the component correctly', () => {
    render(<UnloggedHeader />);
    expect(screen.getByRole('link', { name: /log in/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /register/i })).toHaveAttribute('href', '/register');
  });
});
