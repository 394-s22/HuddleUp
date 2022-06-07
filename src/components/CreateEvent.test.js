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

// Garphy Tam 
const setup = () => {
    const utils = render(<PostButton />)
    fireEvent.click(screen.queryByText(/Post Event/i));
    const input = utils.getByLabelText('Maximum Players')
    return {
      input,
      ...utils,
    }
}

test('require number input for maximum players', () => {
    const {input} = setup()
    expect(input.value).toBe('') // empty before
    fireEvent.change(input, {target: {value: 'Good Day'}})
    expect(input.value).toBe('') //empty after
});