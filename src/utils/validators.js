export const validateHabitName = (name) => {
    if (!name || name.trim() === '') {
        return 'Habit name is required.';
    }
    if (name.length < 3) {
        return 'Habit name must be at least 3 characters long.';
    }
    return null;
};

export const validateHabitFrequency = (frequency) => {
    const validFrequencies = ['daily', 'weekly', 'monthly'];
    if (!validFrequencies.includes(frequency)) {
        return 'Frequency must be one of the following: daily, weekly, monthly.';
    }
    return null;
};