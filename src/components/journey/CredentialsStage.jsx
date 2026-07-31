import { ArrowRight, ArrowUpRight, BookOpenCheck, UsersRound } from 'lucide-react'
import { certifications } from '../../data/portfolio'
import { StageHeading } from './Stage'

export default function CredentialsStage() {
  return (
    <>
      <StageHeading
        kicker="Learning / Knowledge transfer"
        title="Learn it. Then"
        accent="pass it on."
        description="Practical coursework sharpened the work; during college, mentoring turned that knowledge into something I could share."
      />
      <section className="learning-system" data-reveal aria-label="Coursework feeding into mentoring">
        <header className="learning-system-bar">
          <span><i /> Learning signal</span>
          <small>04 credentials / college mentoring</small>
        </header>

        <div className="learning-system-grid">
          <section className="coursework-stack" aria-labelledby="coursework-title">
            <div className="learning-column-heading">
              <div>
                <BookOpenCheck size={17} strokeWidth={1.7} aria-hidden="true" />
                <h3 id="coursework-title">Coursework</h3>
              </div>
              <span>Input / 04</span>
            </div>

            <div className="coursework-list">
            {certifications.map((certification, index) => (
              <a
                className="course-signal"
                href={certification.href}
                target="_blank"
                rel="noreferrer"
                key={certification.title}
                style={{ '--signal-index': index }}
              >
                <span className="course-index">0{index + 1}</span>
                <div className="course-copy">
                  <strong>{certification.title}</strong>
                  <span>
                    <small>{certification.issuer}</small>
                    <i>{certification.focus}</i>
                  </span>
                </div>
                <ArrowUpRight size={16} aria-hidden="true" />
                <b aria-hidden="true" />
              </a>
            ))}
            </div>
          </section>

          <div className="learning-relay" aria-hidden="true">
            <span>Knowledge relay</span>
            <div className="relay-bus">
              {certifications.map((certification) => <i key={certification.title} />)}
            </div>
            <div className="relay-direction">
              <small>Apply</small>
              <ArrowRight size={18} strokeWidth={1.5} />
              <small>Explain</small>
            </div>
          </div>

          <article className="mentor-terminal">
            <div className="mentor-terminal-top">
              <span>Mentoring / College chapter</span>
              <small>2023—2025</small>
            </div>

            <div className="mentor-orbit" aria-hidden="true">
              <span><UsersRound size={27} strokeWidth={1.5} /></span>
              <i />
              <i />
              <i />
              <i />
            </div>

            <div className="mentor-terminal-copy">
              <small>ACM intercampus student group</small>
              <h3>Learning, shared beyond the classroom.</h3>
              <p>During college, I mentored students in the intercampus AI Student Interest Group and served as an advisory member from 2023 to 2025.</p>
            </div>

            <footer>
              <span>College initiative</span>
              <span>Mentor + advisor</span>
            </footer>
          </article>
        </div>
      </section>
    </>
  )
}
