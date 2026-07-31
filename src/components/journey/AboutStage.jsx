import { BrainCircuit, Code2, Network } from 'lucide-react'
import { about } from '../../data/portfolio'
import { StageHeading } from './Stage'

const profileNotes = [
  {
    label: 'What I enjoy',
    detail: about.interests,
    Icon: Code2,
  },
  {
    label: 'How I work',
    detail: about.approach,
    Icon: Network,
  },
  {
    label: 'What I am exploring now',
    detail: 'Agentic systems, model evaluation, reinforcement learning, efficient inference, and the production patterns that make emerging models dependable.',
    Icon: BrainCircuit,
  },
]

export default function AboutStage() {
  return (
    <>
      <StageHeading
        kicker="About / Operating model"
        title="A little about"
        accent="how I work."
      />

      <section className="about-profile" data-reveal aria-label="About Hari Sankar">
        <div className="about-profile-lead">
          <span>Core operating range</span>
          <h3>Backend engineering.<br />Data systems.<br /><em>Applied AI.</em></h3>
        </div>

        <div className="about-profile-notes">
          {profileNotes.map(({ label, detail, Icon }, index) => (
            <article className="about-profile-note" tabIndex="0" key={label}>
              <span>0{index + 1}</span>
              <Icon aria-hidden="true" size={24} strokeWidth={1.6} />
              <div>
                <h3>{label}</h3>
                <p>{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
