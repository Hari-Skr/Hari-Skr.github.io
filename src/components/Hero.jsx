import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { profile } from '../data/portfolio'
import HeroLossLandscape from './HeroLossLandscape'
import TypingHeadline from './TypingHeadline'

const focusAreas = ['Production AI', 'Backend systems', 'Data pipelines']

export default function Hero() {
  const scrollToExplore = (event) => {
    event.preventDefault()
    const heading = document.querySelector('#about .stage-heading')
    if (!heading) return

    const isMobileNav = window.matchMedia('(max-width: 720px)').matches
    const offset = isMobileNav
      ? (document.querySelector('.nav')?.getBoundingClientRect().height ?? 70) + 28
      : 28
    const top = window.scrollY + heading.getBoundingClientRect().top - offset

    window.history.pushState(null, '', '#about')
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }

  return (
    <section className="hero" id="top">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-scanline" aria-hidden="true" />
      <div className="shell hero-layout">
        <div className="hero-content" data-reveal>
          <p className="eyebrow">
            <span />
            <b>{profile.role}</b>
            <i aria-hidden="true">/</i>
            {profile.location}
          </p>
          <TypingHeadline />
          <div className="hero-intro">
            <p className="hero-summary">{profile.summary}</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#about" onClick={scrollToExplore}>
                Explore Me <ArrowDown size={17} />
              </a>
              <a className="button button-outline" href="/hari-sankar-resume.md" download>
                Résumé <Download size={16} />
              </a>
            </div>
          </div>
          <div className="hero-focus" aria-label="Primary engineering focus">
            <span>Working across</span>
            <div>
              {focusAreas.map((area) => <strong key={area}>{area}</strong>)}
            </div>
          </div>
        </div>

        <HeroLossLandscape />
      </div>
      {/* <a className="hero-scroll-cue" href="#about" aria-label="Scroll to about section">
        <span>Scroll to explore</span>
        <ArrowUpRight size={15} aria-hidden="true" />
      </a> */}
    </section>
  )
}
