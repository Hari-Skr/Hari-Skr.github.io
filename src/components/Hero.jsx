import { ArrowDown, ArrowUpRight, FileUser } from 'lucide-react'
import { profile } from '../data/portfolio'
import HeroLossLandscape from './HeroLossLandscape'
import TypingHeadline from './TypingHeadline'
import AboutStage from './journey/AboutStage'

export default function Hero() {
  const scrollToExplore = (event) => {
    event.preventDefault()
    const aboutSection = document.getElementById('about')
    if (!aboutSection) return

    const usesTopNav = !window.matchMedia('(min-width: 1441px) and (min-height: 700px)').matches
    const offset = usesTopNav
      ? (document.querySelector('.nav')?.getBoundingClientRect().bottom ?? 70) + 28
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
              <a
                className="button button-outline button-resume"
                href="https://rxresu.me/hari-sankar/github-public"
                target="_blank"
                rel="noreferrer"
              >
                <span className="button-resume-icon" aria-hidden="true">
                  <FileUser size={16} strokeWidth={1.9} />
                </span>
                View résumé
                <ArrowUpRight className="button-external-icon" size={15} aria-hidden="true" />
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
