import { useEffect } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import PageMotion from './components/PageMotion'
import ThemeToggle from './components/ThemeToggle'
import PortfolioJourney from './components/journey/PortfolioJourney'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()

  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(id)
      const scrollTarget = target?.querySelector('.stage-heading') ?? target
      if (!scrollTarget) return

      const root = document.documentElement
      const previousBehavior = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      const usesTopNav = !window.matchMedia('(min-width: 1441px) and (min-height: 700px)').matches
      const anchorOffset = usesTopNav
        ? (document.querySelector('.nav')?.getBoundingClientRect().bottom ?? 70) + 28
        : 28
      const top = window.scrollY + scrollTarget.getBoundingClientRect().top - anchorOffset
      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' })
      window.requestAnimationFrame(() => {
        root.style.scrollBehavior = previousBehavior
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <>
      <a className="skip-link" href="#portfolio">Skip to selected work</a>
      <PageMotion />
      <Header />
      <ThemeToggle />
      <Hero />
      <PortfolioJourney />
      <Footer />
    </>
  )
}
