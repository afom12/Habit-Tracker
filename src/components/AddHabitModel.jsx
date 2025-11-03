import React, { useState } from 'react';
import Modal from './common/Modal';
import { useHabits } from '../hooks/useHabits';

const AddHabitModel = ({ isOpen, onClose }) => {
    const { addHabit } = useHabits();
    const [habitName, setHabitName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (habitName.trim()) {
            addHabit(habitName);
            setHabitName('');
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Add New Habit</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={habitName}
                    onChange={(e) => setHabitName(e.target.value)}
                    placeholder="Enter habit name"
                    required
                />
                <button type="submit">Add Habit</button>
            </form>
        </Modal>
    );
};

export default AddHabitModel;