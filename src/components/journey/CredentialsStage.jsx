import { ArrowUpRight } from 'lucide-react'
import { certifications } from '../../data/portfolio'
import { StageHeading } from './Stage'

export default function CredentialsStage() {
  return (
    <>
      <StageHeading
        kicker="Learning / Continuous update"
        title="Coursework and"
        accent="mentoring."
        description="Professional coursework and student mentoring alongside engineering work."
      />
      <div className="credentials-network" data-reveal>
        <section className="credentials-list-block">
          <span className="credentials-kicker">Coursework</span>
          <div className="credentials-list">
            {certifications.map((certification, index) => (
              <a href={certification.href} target="_blank" rel="noreferrer" key={certification.title}>
                <span>0{index + 1}</span>
                <div>
                  <strong>{certification.title}</strong>
                  <small>{certification.issuer}</small>
                </div>
                <ArrowUpRight size={17} />
              </a>
            ))}
          </div>
        </section>
        <article className="mentor-note">
          <small>Mentoring</small>
          <h3>ACM mentor and advisory member</h3>
          <p>Mentored students in the intercampus AI Student Interest Group from 2023 to 2025.</p>
        </article>
      </div>
    </>
  )
}
