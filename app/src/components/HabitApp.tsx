import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Habit } from '../lib/storage'
import { createHabit, loadHabits, loadProgress, saveHabits, saveProgress, ymd } from '../lib/storage'
import ProgressBar from './ProgressBar'

type Filter = {
  query: string
}

export default function HabitApp() {
  const [habits, setHabits] = useState<Habit[]>(() => loadHabits())
  const [progressByHabit, setProgressByHabit] = useState<Record<string, Record<string, boolean>>>(() => loadProgress())
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState<Filter>({ query: '' })

  useEffect(() => saveHabits(habits), [habits])
  useEffect(() => saveProgress(progressByHabit), [progressByHabit])

  const visibleHabits = useMemo(() => {
    const q = filter.query.trim().toLowerCase()
    if (!q) return habits
    return habits.filter((h) => h.name.toLowerCase().includes(q))
  }, [habits, filter])

  function addHabit() {
    const name = newName.trim()
    if (!name) return
    setHabits((prev) => [createHabit(name), ...prev])
    setNewName('')
  }

  function removeHabit(id: string) {
    setHabits((prev) => prev.filter((h) => h.id !== id))
    setProgressByHabit((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  function renameHabit(id: string, name: string) {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, name } : h)))
  }

  function toggleToday(id: string, date = new Date()) {
    const key = ymd(date)
    setProgressByHabit((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: !prev[id]?.[key] },
    }))
  }

  const last7Days = useMemo(() => {
    const days: Date[] = []
    const d = new Date()
    for (let i = 6; i >= 0; i--) {
      const day = new Date(d)
      day.setDate(d.getDate() - i)
      days.push(day)
    }
    return days
  }, [])

  return (
    <div className="grid gap-6 lg:grid-cols-[260px,1fr]">
      <aside className="rounded-xl border border-zinc-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="mb-4 font-medium text-zinc-700 dark:text-zinc-200">Add Habit</div>
        <div className="flex gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. Read Bible"
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-600"
          />
          <button onClick={addHabit} className="rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white dark:bg-white dark:text-zinc-900">Add</button>
        </div>
        <div className="mt-6">
          <div className="mb-2 text-sm text-zinc-500">Search</div>
          <input
            value={filter.query}
            onChange={(e) => setFilter({ query: e.target.value })}
            placeholder="Filter habits"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-600"
          />
        </div>
      </aside>

      <section className="space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">This Week</h2>
            <div className="grid grid-cols-7 gap-2 text-xs text-zinc-500">
              {last7Days.map((d) => (
                <div key={d.toISOString()} className="w-10 text-center">
                  {d.toLocaleDateString(undefined, { weekday: 'short' })}
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {visibleHabits.length === 0 ? (
              <div className="py-10 text-center text-sm text-zinc-500">No habits yet. Add your first habit.</div>
            ) : (
              <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {visibleHabits.map((h) => {
                  const row = progressByHabit[h.id] || {}
                  return (
                    <motion.li
                      key={h.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center justify-between gap-4 py-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <input
                          className="w-44 min-w-0 rounded-md border border-transparent bg-transparent px-2 py-1 text-sm outline-none focus:border-zinc-300 dark:focus:border-zinc-700"
                          value={h.name}
                          onChange={(e) => renameHabit(h.id, e.target.value)}
                        />
                        <button
                          onClick={() => removeHabit(h.id)}
                          className="rounded-md px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          Delete
                        </button>
                        <ProgressBar
                          value={
                            last7Days.reduce((acc, d) => acc + (row[ymd(d)] ? 1 : 0), 0) / last7Days.length
                          }
                        />
                      </div>
                      <div className="grid grid-cols-7 items-center gap-2">
                        {last7Days.map((d) => {
                          const key = ymd(d)
                          const checked = !!row[key]
                          return (
                            <button
                              key={key}
                              onClick={() => toggleToday(h.id, d)}
                              className={
                                'h-8 w-10 rounded-md border text-xs transition-colors ' +
                                (checked
                                  ? 'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                                  : 'border-zinc-300 text-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800')
                              }
                            >
                              {checked ? 'Done' : ''}
                            </button>
                          )
                        })}
                      </div>
                    </motion.li>
                  )
                })}
              </ul>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}


