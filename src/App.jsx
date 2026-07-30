import { useEffect } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import PageMotion from './components/PageMotion'
import PortfolioJourney from './components/journey/PortfolioJourney'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()

  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(id)
      if (!target) return

      const root = document.documentElement
      const previousBehavior = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      target.scrollIntoView()
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
      <Hero />
      <PortfolioJourney />
      <Footer />
    </>
  )
}
