export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'pt-theme'

export function getStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (!value) return null
    if (value === 'light' || value === 'dark' || value === 'system') return value
    return null
  } catch {
    return null
  }
}

export function getSystemPrefersDark(): boolean {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  const isDark = theme === 'dark' || (theme === 'system' && getSystemPrefersDark())
  root.classList.toggle('dark', isDark)
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {}
  applyTheme(theme)
}

export function initTheme() {
  const stored = getStoredTheme()
  applyTheme(stored ?? 'system')
}


