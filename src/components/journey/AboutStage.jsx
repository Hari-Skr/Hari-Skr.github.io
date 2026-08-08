import { BrainCircuit, Network } from 'lucide-react'
import { about } from '../../data/portfolio'

const operatingRange = [
  {
    title: 'Backend engineering',
    detail: 'APIs · Scalability · Reliability',
  },
  {
    title: 'Data systems',
    detail: 'ETL pipelines · Automation · Observability',
  },
  {
    title: 'Applied AI',
    detail: 'Models · Evaluation · Integration',
  },
]

const profileNotes = [
  {
    label: 'How I work',
    detail: about.approach,
    Icon: Network,
  },
  {
    label: 'What I am exploring now',
    detail: 'Agentic systems, System evaluation, Fine tuning, Reinforcement learning, and the production patterns that make emerging models dependable.',
    Icon: BrainCircuit,
  },
]

export default function AboutStage() {
  return (
    <section className="about-profile" data-reveal aria-labelledby="about-heading">
      <div className="about-profile-lead">
        <h2 id="about-heading">About <span>/</span> Working range</h2>
        <p>End-to-end engineering across the layers that bridge intelligence and infrastructure.</p>
        <div className="about-range-list" aria-label="Core operating range">
          {operatingRange.map(({ title, detail }, index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <div>
                <strong>{title}</strong>
                <small>{detail}</small>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="about-profile-notes">
        {profileNotes.map(({ label, detail, Icon }, index) => (
          <article className="about-profile-note" key={label}>
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
  )
}
