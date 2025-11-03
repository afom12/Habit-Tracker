import { useEffect, useState } from 'react'
import { applyTheme, getStoredTheme, getSystemPrefersDark, setTheme, type Theme } from '../lib/theme'

const options: Theme[] = ['light', 'dark', 'system']

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme() ?? 'system')

  useEffect(() => {
    applyTheme(theme)
  }, [])

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => theme === 'system' && applyTheme('system')
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [theme])

  function onChange(next: Theme) {
    setThemeState(next)
    setTheme(next)
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white/70 p-1 text-sm shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
      {options.map((opt) => {
        const active = theme === opt
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={
              'rounded-md px-2.5 py-1.5 transition-colors ' +
              (active
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800')
            }
            aria-pressed={active}
          >
            {opt[0].toUpperCase() + opt.slice(1)}
          </button>
        )
      })}
    </div>
  )
}


