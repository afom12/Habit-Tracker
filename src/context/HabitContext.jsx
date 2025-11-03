import React, { createContext, useState, useContext } from 'react';

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState([]);

    const addHabit = (habit) => {
        setHabits((prevHabits) => [...prevHabits, habit]);
    };

    const removeHabit = (habitId) => {
        setHabits((prevHabits) => prevHabits.filter(habit => habit.id !== habitId));
    };

    const updateHabit = (updatedHabit) => {
        setHabits((prevHabits) => 
            prevHabits.map(habit => 
                habit.id === updatedHabit.id ? updatedHabit : habit
            )
        );
    };

    return (
        <HabitContext.Provider value={{ habits, addHabit, removeHabit, updateHabit }}>
            {children}
        </HabitContext.Provider>
    );
};

export const useHabits = () => {
    return useContext(HabitContext);
};