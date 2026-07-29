import { education } from '../../data/portfolio'
import { StageHeading } from './Stage'

export default function EducationStage() {
  const nodes = [
    ['Degree', education.degree],
    ['Specialization', education.specialization],
    ['University', education.university],
    ['Period', education.period],
  ]

  return (
    <>
      <StageHeading
        kicker="Education"
        title="Academic background and"
        accent="recognition."
        description="Computer science education with a specialization in AI and machine learning."
      />
      <div className="education-network" data-reveal>
        <svg viewBox="0 0 1000 420" aria-hidden="true">
          <path d="M500 210 C370 76 264 86 122 112" />
          <path d="M500 210 C360 336 250 327 105 300" />
          <path d="M500 210 C640 74 750 84 892 112" />
          <path d="M500 210 C650 333 758 324 905 296" />
        </svg>
        <div className="award-node">
          <small>Award</small>
          <strong>Silver Medal</strong>
          <span>Academic Excellence</span>
        </div>
        {nodes.map(([label, value], index) => (
          <div className={`education-node education-node-${index + 1}`} key={label}>
            <small>{label}</small>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </>
  )
}
