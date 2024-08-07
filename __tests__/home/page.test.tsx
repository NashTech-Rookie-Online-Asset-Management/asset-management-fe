import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Home from '@/app/(auth)/page';

describe('Page', () => {
  it('renders a button', () => {
    render(<Home />);

    const button = screen.getByText('Hello');

    expect(button).toBeInTheDocument();
  });
});
