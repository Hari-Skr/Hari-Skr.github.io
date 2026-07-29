import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import PortfolioJourney from './components/journey/PortfolioJourney'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()

  return (
    <>
      <Header />
      <Hero />
      <PortfolioJourney />
      <Footer />
    </>
  )
}
