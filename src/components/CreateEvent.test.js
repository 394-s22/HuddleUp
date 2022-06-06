import { render, fireEvent, screen } from '@testing-library/react';
import PostButton from './CreateEvent';

// Jamie Lee
test('displaying post event modal', () => {
    render(<PostButton />);
    const modalTitle = 'Post an event';
    expect(screen.queryByText(modalTitle)).toBeNull();
    fireEvent.click(screen.queryByText(/Post Event/i));
    expect(screen.queryByText(modalTitle)).toBeInTheDocument();
});