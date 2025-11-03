import React from 'react';
import HabitItem from './HabitItem';

const HabitList = ({ habits }) => {
    return (
        <div>
            <h2>Your Habits</h2>
            <ul>
                {habits.map(habit => (
                    <HabitItem key={habit.id} habit={habit} />
                ))}
            </ul>
        </div>
    );
};

export default HabitList;