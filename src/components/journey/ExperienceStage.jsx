import { BrainCircuit, Database, ServerCog } from 'lucide-react'
import { experience } from '../../data/portfolio'
import { StageHeading } from './Stage'

const roleIcons = [Database, BrainCircuit, ServerCog]

export default function ExperienceStage() {
  return (
    <>
      <StageHeading
        kicker="Experience"
        title="Where I have"
        accent="worked."
        description="Roles in data engineering, AI research, and production AI at Metro Global Solutions and Doctreen."
      />

      <section className="career-timeline" data-reveal aria-label="Professional experience">
        <div className="career-track" aria-hidden="true" />
        {experience.map((item, index) => {
          const Icon = roleIcons[index]

          return (
            <article className="career-role" tabIndex="0" key={`${item.company}-${item.period}`}>
              <div className="career-node">
                <Icon aria-hidden="true" size={22} strokeWidth={1.6} />
              </div>
              <span className="career-period">{item.period}</span>
              <h3>{item.role}</h3>
              <strong>{item.company}</strong>
              <p>{item.summary}</p>
              <div className="career-details">
                <span>Selected work</span>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}
      </section>
    </>
  )
}
