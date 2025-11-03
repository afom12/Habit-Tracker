import { nanoid } from 'nanoid'

export type Habit = {
  id: string
  name: string
  color?: string
  createdAt: string
  archived?: boolean
}

export type HabitProgress = Record<string, boolean> // key: ISO date (YYYY-MM-DD)

export type HabitWithProgress = Habit & { progress: HabitProgress }

const HABITS_KEY = 'pt-habits'
const PROGRESS_KEY = 'pt-progress'

export function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(HABITS_KEY)
    return raw ? (JSON.parse(raw) as Habit[]) : []
  } catch {
    return []
  }
}

export function saveHabits(habits: Habit[]) {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits))
}

export function loadProgress(): Record<string, HabitProgress> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    return raw ? (JSON.parse(raw) as Record<string, HabitProgress>) : {}
  } catch {
    return {}
  }
}

export function saveProgress(progress: Record<string, HabitProgress>) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
}

export function createHabit(name: string, color?: string): Habit {
  return { id: nanoid(10), name, color, createdAt: new Date().toISOString() }
}

export function ymd(date: Date): string {
  return date.toISOString().slice(0, 10)
}


