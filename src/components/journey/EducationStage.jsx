import { ArrowRight, BrainCircuit, GraduationCap, Medal } from 'lucide-react'
import { education } from '../../data/portfolio'
import { StageHeading } from './Stage'

export default function EducationStage() {
  return (
    <>
      <StageHeading
        kicker="Education / Foundation"
        title="Education and"
        accent="recognition."
        description="A computer-science degree, an AI and machine-learning specialization, and a Silver Medal for Academic Excellence."
      />

      <section className="education-simple" data-reveal aria-label="Education and academic recognition">
        <article className="education-card">
          <span><GraduationCap size={27} strokeWidth={1.6} /></span>
          <small>Degree</small>
          <h3>{education.degree}</h3>
          <p>{education.university}</p>
          <i>{education.period}</i>
        </article>

        <div className="education-divider" aria-hidden="true">
          <span className="education-divider-track" />
          <span className="education-divider-node">
            <ArrowRight className="education-divider-icon" size={20} strokeWidth={1.8} />
          </span>
        </div>

        <article className="education-card">
          <span><BrainCircuit size={27} strokeWidth={1.6} /></span>
          <small>Specialization</small>
          <h3>{education.specialization}</h3>
          <p>Computer Science</p>
        </article>

        <div className="education-divider" aria-hidden="true">
          <span className="education-divider-track" />
          <span className="education-divider-node">
            <ArrowRight className="education-divider-icon" size={20} strokeWidth={1.8} />
          </span>
        </div>

        <article
          className="education-card education-card-award"
          tabIndex="0"
          aria-label="Silver Medal for Academic Excellence"
        >
          <div className="award-copy">
            <span className="award-icon"><Medal size={29} strokeWidth={1.6} /></span>
            <small>Academic recognition</small>
            <h3>Silver Medal</h3>
            <p>Academic Excellence</p>
          </div>

          <div className="award-medal" aria-hidden="true">
            <span className="award-ribbon award-ribbon-left" />
            <span className="award-ribbon award-ribbon-right" />
            <span className="award-medal-ring">
              <span className="award-medal-face">
                <Medal size={34} strokeWidth={1.35} />
                <b>EXCELLENCE</b>
              </span>
            </span>
          </div>
        </article>
      </section>
    </>
  )
}
