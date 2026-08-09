import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { MoonStar, SunMedium } from 'lucide-react'

const getInitialTheme = () => {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)
  const isDark = theme === 'dark'

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.style.colorScheme = theme
    window.localStorage.setItem('portfolio-theme', theme)

    const themeColor = document.querySelector('meta[name="theme-color"]')
    themeColor?.setAttribute('content', isDark ? '#171414' : '#F6F4F4')
  }, [theme, isDark])

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark'
    const applyTheme = () => {
      document.documentElement.dataset.theme = nextTheme
      document.documentElement.style.colorScheme = nextTheme
      flushSync(() => setTheme(nextTheme))
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !document.startViewTransition) {
      applyTheme()
      return
    }

    document.startViewTransition(applyTheme)
  }

  return (
    <button
      className={`theme-toggle ${isDark ? 'is-dark' : ''}`}
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      onClick={toggleTheme}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <SunMedium className="theme-icon-sun" size={15} strokeWidth={1.8} />
        <MoonStar className="theme-icon-moon" size={14} strokeWidth={1.8} />
        <i />
      </span>
      <span className="theme-toggle-label" aria-hidden="true">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  )
}
