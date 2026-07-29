import { experience } from '../../data/portfolio'
import { StageHeading } from './Stage'

export default function ExperienceStage() {
  return (
    <>
      <StageHeading
        kicker="Where I have worked"
        title="Experience carried"
        accent="forward."
        description="Data engineering, AI research, and production AI work from 2024 to the present."
      />
      <div className="experience-network" data-reveal>
        <div className="experience-line" aria-hidden="true" />
        {experience.map((item, index) => (
          <article className="experience-item" key={`${item.company}-${item.period}`}>
            <div className="experience-node">0{index + 1}</div>
            <div className="experience-copy">
              <p>{item.period}</p>
              <h3>{item.role}</h3>
              <strong>{item.company}</strong>
              <p>{item.summary}</p>
              <ul>
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
