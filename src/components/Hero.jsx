import { ArrowDown, Code2, Download, Rocket, Search, TestTube2, Workflow } from 'lucide-react'
import { profile } from '../data/portfolio'
import HeroLossLandscape from './HeroLossLandscape'
import TypingHeadline from './TypingHeadline'

export default function Hero() {
  const processSteps = [
    { label: 'Understand the problem', Icon: Search },
    { label: 'Design the system', Icon: Workflow },
    { label: 'Build the product', Icon: Code2 },
    { label: 'Test and refine', Icon: TestTube2 },
    { label: 'Deliver with care', Icon: Rocket },
  ]

  return (
    <section className="hero" id="top">
      <div className="shell hero-layout">
        <div className="hero-content" data-reveal>
          <p className="eyebrow">
            <span />
            {profile.name} · {profile.location}
          </p>
          <TypingHeadline />
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#portfolio">
              View portfolio <ArrowDown size={17} />
            </a>
            <a className="button button-outline" href="/hari-sankar-resume.md" download>
              Résumé <Download size={16} />
            </a>
          </div>
        </div>

        <HeroLossLandscape />
      </div>
      <div className="hero-footer">
        {processSteps.map(({ label, Icon }) => (
          <div className="hero-process-step" key={label}>
            <Icon aria-hidden="true" size={15} strokeWidth={1.65} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
