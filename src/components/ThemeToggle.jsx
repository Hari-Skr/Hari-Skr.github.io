import { useEffect, useState } from 'react'
import { Moon, SunMedium } from 'lucide-react'

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

    const favicon = document.querySelector('link[rel="icon"]')
    favicon?.setAttribute('href', isDark ? '/favicon-dark.svg' : '/favicon.svg')
  }, [theme, isDark])

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark'
    const root = document.documentElement

    // Theme changes affect most of this highly visual page. Disable transitions
    // for the two paint frames that apply the new palette, then restore normal
    // interaction motion without animating the whole document.
    root.classList.add('theme-switching')
    root.dataset.theme = nextTheme
    root.style.colorScheme = nextTheme
    setTheme(nextTheme)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => root.classList.remove('theme-switching'))
    })
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
      <span className="theme-toggle-icon" aria-hidden="true">
        <SunMedium className="theme-icon-sun" strokeWidth={1.8} />
        <Moon className="theme-icon-moon" strokeWidth={1.8} />
      </span>
    </button>
  )
}
