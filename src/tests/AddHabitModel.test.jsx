import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddHabitModel from '../components/AddHabitModel';

describe('AddHabitModel Component', () => {
    test('renders AddHabitModel component', () => {
        render(<AddHabitModel />);
        const titleElement = screen.getByText(/add a new habit/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('allows user to input habit name', () => {
        render(<AddHabitModel />);
        const inputElement = screen.getByPlaceholderText(/habit name/i);
        fireEvent.change(inputElement, { target: { value: 'Exercise' } });
        expect(inputElement.value).toBe('Exercise');
    });

    test('submits the form with the correct habit name', () => {
        const mockAddHabit = jest.fn();
        render(<AddHabitModel addHabit={mockAddHabit} />);
        
        const inputElement = screen.getByPlaceholderText(/habit name/i);
        fireEvent.change(inputElement, { target: { value: 'Reading' } });
        
        const submitButton = screen.getByRole('button', { name: /add habit/i });
        fireEvent.click(submitButton);
        
        expect(mockAddHabit).toHaveBeenCalledWith('Reading');
    });
});