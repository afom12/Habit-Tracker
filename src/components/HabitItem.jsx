import React from 'react';

const HabitItem = ({ habit, onEdit, onDelete }) => {
    return (
        <div className="habit-item">
            <h3>{habit.name}</h3>
            <p>{habit.description}</p>
            <button onClick={() => onEdit(habit.id)}>Edit</button>
            <button onClick={() => onDelete(habit.id)}>Delete</button>
        </div>
    );
};

export default HabitItem;