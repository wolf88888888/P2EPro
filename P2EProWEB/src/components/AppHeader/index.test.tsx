import { render, screen } from '@testing-library/react';
import AppHeader from '.';

test('renders AppHeader', () => {
    render(<AppHeader title="MyHeader"/>);
    const titleElement = screen.getByText(/MyHeader/i);
    expect(titleElement).toBeInTheDocument();
});
