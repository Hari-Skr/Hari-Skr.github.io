import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { Moon, SunMedium } from 'lucide-react'

const getInitialTheme = () => {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)
  const isDark = theme === 'dark'
  const isAnimatingRef = useRef(false)

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

  const applyThemeTokens = (nextTheme) => {
    const root = document.documentElement
    root.dataset.theme = nextTheme
    root.style.colorScheme = nextTheme
    setTheme(nextTheme)
    window.localStorage.setItem('portfolio-theme', nextTheme)

    const themeColor = document.querySelector('meta[name="theme-color"]')
    themeColor?.setAttribute('content', nextTheme === 'dark' ? '#171414' : '#F6F4F4')

    const favicon = document.querySelector('link[rel="icon"]')
    favicon?.setAttribute('href', nextTheme === 'dark' ? '/favicon-dark.svg' : '/favicon.svg')
  }

  const toggleTheme = () => {
    if (isAnimatingRef.current) return

    const nextTheme = isDark ? 'light' : 'dark'
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      applyThemeTokens(nextTheme)
      return
    }

    isAnimatingRef.current = true
    const root = document.documentElement

    // Modern Native View Transition with synchronous React DOM flush (flushSync)
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      // 1. Mark scan direction
      root.dataset.themeScan = nextTheme

      // 2. Temporarily suppress document transitions so snapshot capture is 0ms
      root.classList.add('theme-switching')

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          applyThemeTokens(nextTheme)
        })
      })

      // 3. Immediately restore transitions once the snapshot is captured and animate
      transition.ready
        .then(() => {
          root.classList.remove('theme-switching')

          // GPU-accelerated Web Animations API for ultra-fast, 120fps clip-path sweep (380ms)
          document.documentElement.animate(
            {
              clipPath: [
                'inset(0 0 100% 0)',
                'inset(0 0 0% 0)',
              ],
            },
            {
              duration: 380,
              easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
              pseudoElement: '::view-transition-new(root)',
              fill: 'forwards',
            }
          )
        })
        .catch(() => {})

      // 4. Cleanup scan marker when animation finishes
      transition.finished
        .catch(() => {})
        .finally(() => {
          delete root.dataset.themeScan
          root.classList.remove('theme-switching')
          isAnimatingRef.current = false
        })
    } else {
      // Fallback for browsers without View Transitions
      root.classList.add('theme-switching')
      flushSync(() => {
        applyThemeTokens(nextTheme)
      })
      window.requestAnimationFrame(() => {
        root.classList.remove('theme-switching')
      })
      isAnimatingRef.current = false
    }
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
