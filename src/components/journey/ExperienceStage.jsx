import { Fragment } from 'react'
import { ArrowRight, ExternalLink, Globe2 } from 'lucide-react'
import { experience } from '../../data/portfolio'
import { StageHeading } from './Stage'

export default function ExperienceStage() {
  return (
    <>
      <StageHeading
        kicker="Experience / Sequence"
        title="Professional"
        accent="Progression"
        description="My professional journeys"
      />

      <section className="career-timeline" data-reveal aria-label="Professional experience">
        <div className="career-queue">
          {experience.map((item, index) => {
            return (
              <Fragment key={`${item.company}-${item.period}`}>
                <a
                  className="career-role"
                  href={item.website}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${item.company} website`}
                >
                  <span
                    className="career-node company-logo"
                    style={{
                      '--logo-width': `${item.logo.width}px`,
                      '--logo-height': `${item.logo.height}px`,
                    }}
                  >
                    <img src={item.logo.src} alt="" />
                  </span>
                  <span className="career-period">{item.period}</span>
                  <h3>{item.role}</h3>
                  <strong>{item.company}</strong>
                  <div className="company-meta">
                    <span className="company-site">
                      <Globe2 size={13} aria-hidden="true" />
                      Click the card to visit {item.company}
                      <ExternalLink size={11} aria-hidden="true" />
                    </span>
                  </div>
                  <p>{item.summary}</p>
                </a>
                {index < experience.length - 1 && (
                  <span className="career-queue-link" aria-hidden="true">
                    <i />
                    <ArrowRight size={19} strokeWidth={1.8} />
                  </span>
                )}
              </Fragment>
            )
          })}
        </div>
      </section>
    </>
  )
}
