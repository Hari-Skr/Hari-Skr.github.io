import { ArrowUpRight } from 'lucide-react'
import { certifications } from '../../data/portfolio'
import { StageHeading } from './Stage'

export default function CredentialsStage() {
  return (
    <>
      <StageHeading
        kicker="Learning and mentoring"
        title="Work beyond"
        accent="delivery."
        description="Professional coursework and student mentoring completed alongside engineering work."
      />
      <div className="credentials-network" data-reveal>
        <div className="credentials-hub">
          <span>Learning</span>
          <strong>&amp;</strong>
          <span>Mentoring</span>
        </div>
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
        <article className="mentor-note">
          <small>Leadership</small>
          <h3>ACM mentor and advisory member</h3>
          <p>Mentored students in the intercampus AI Student Interest Group from 2023 to 2025.</p>
        </article>
      </div>
    </>
  )
}
