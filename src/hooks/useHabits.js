import { useState, useEffect } from 'react';
import { fetchHabits, addHabit, deleteHabit } from '../services/habitService';

const useHabits = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadHabits = async () => {
            try {
                const fetchedHabits = await fetchHabits();
                setHabits(fetchedHabits);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        loadHabits();
    }, []);

    const handleAddHabit = async (habit) => {
        try {
            const newHabit = await addHabit(habit);
            setHabits((prevHabits) => [...prevHabits, newHabit]);
        } catch (err) {
            setError(err);
        }
    };

    const handleDeleteHabit = async (habitId) => {
        try {
            await deleteHabit(habitId);
            setHabits((prevHabits) => prevHabits.filter(habit => habit.id !== habitId));
        } catch (err) {
            setError(err);
        }
    };

    return {
        habits,
        loading,
        error,
        handleAddHabit,
        handleDeleteHabit,
    };
};

export default useHabits;