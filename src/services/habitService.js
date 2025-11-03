import axios from 'axios';

const API_URL = 'http://localhost:5000/api/habits';

export const fetchHabits = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching habits: ' + error.message);
    }
};

export const addHabit = async (habit) => {
    try {
        const response = await axios.post(API_URL, habit);
        return response.data;
    } catch (error) {
        throw new Error('Error adding habit: ' + error.message);
    }
};

export const deleteHabit = async (habitId) => {
    try {
        await axios.delete(`${API_URL}/${habitId}`);
    } catch (error) {
        throw new Error('Error deleting habit: ' + error.message);
    }
};