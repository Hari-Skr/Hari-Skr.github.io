import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { profile } from '../data/portfolio'
import HeroLossLandscape from './HeroLossLandscape'
import TypingHeadline from './TypingHeadline'
import AboutStage from './journey/AboutStage'

export default function Hero() {
  const scrollToExplore = (event) => {
    event.preventDefault()
    const aboutSection = document.getElementById('about')
    if (!aboutSection) return

    const isMobileNav = window.matchMedia('(max-width: 720px)').matches
    const offset = isMobileNav
      ? (document.querySelector('.nav')?.getBoundingClientRect().height ?? 70) + 28
      : 28
    const top = window.scrollY + aboutSection.getBoundingClientRect().top - offset

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
            <ul className="hero-summary" aria-label="What I do">
              {profile.summaryPoints.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <div className="hero-actions">
              <a className="button button-dark" href="#about" onClick={scrollToExplore}>
                Explore Me <ArrowDown size={17} />
              </a>
              <a className="button button-outline" href="/hari-sankar-resume.md" download>
                Résumé <Download size={16} />
              </a>
            </div>
          </div>
        </div>

        <HeroLossLandscape />
      </div>
      <div className="shell hero-about-shell" id="about">
        <AboutStage />
      </div>
      {/* <a className="hero-scroll-cue" href="#about" aria-label="Scroll to about section">
        <span>Scroll to explore</span>
        <ArrowUpRight size={15} aria-hidden="true" />
      </a> */}
    </section>
  )
}
