import React from 'react';
import HabitList from '../components/HabitList';
import AddHabitModel from '../components/AddHabitModel';

const Home = () => {
    return (
        <div>
            <h1>Habit Tracker</h1>
            <AddHabitModel />
            <HabitList />
        </div>
    );
};

export default Home;