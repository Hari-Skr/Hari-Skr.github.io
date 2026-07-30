import { BookOpen, Code2, Network } from 'lucide-react'
import { about, certifications, profile } from '../../data/portfolio'
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
    label: 'What I keep learning',
    detail: certifications.map((certification) => certification.title).join(' · '),
    Icon: BookOpen,
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
          <p>{profile.role} · {profile.location}</p>
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
