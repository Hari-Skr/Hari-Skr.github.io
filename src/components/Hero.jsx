import { ArrowDown, Download } from 'lucide-react'
import { profile } from '../data/portfolio'
import HeroLossLandscape from './HeroLossLandscape'
import TypingHeadline from './TypingHeadline'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="shell hero-layout">
        <div className="hero-content" data-reveal>
          <p className="eyebrow">
            <span />
            {profile.name} · {profile.location}
          </p>
          <TypingHeadline />
          <div className="hero-intro">
            <p className="hero-summary">{profile.summary}</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#portfolio">
                Explore my work <ArrowDown size={17} />
              </a>
              <a className="button button-outline" href="/hari-sankar-resume.md" download>
                Résumé <Download size={16} />
              </a>
            </div>
          </div>
        </div>

        <HeroLossLandscape />
      </div>
    </section>
  )
}
