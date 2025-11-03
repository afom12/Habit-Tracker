import { useEffect, useState } from 'react'
import ThemeToggle from './components/ThemeToggle'
import { initTheme } from './lib/theme'
import HabitApp from './components/HabitApp'

export default function App() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    initTheme()
    setReady(true)
  }, [])
  return (
    <div className="min-h-dvh bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto max-w-5xl p-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Pro Habit Tracker</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </header>
        <main className="rounded-xl">
          <HabitApp />
        </main>
      </div>
    </div>
  )
}


