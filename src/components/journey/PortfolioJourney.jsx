import AboutStage from './AboutStage'
import CredentialsStage from './CredentialsStage'
import EducationStage from './EducationStage'
import ExperienceStage from './ExperienceStage'
import LinearLayerStage from './LinearLayerStage'
import SoftwareStage from './SoftwareStage'
import Stage from './Stage'

const stages = [
  { id: 'about', number: '01', label: 'About', component: AboutStage },
  { id: 'education', number: '02', label: 'Education', component: EducationStage },
  { id: 'projects', number: '03', label: 'Build path', component: LinearLayerStage },
  { id: 'experience', number: '04', label: 'Experience', component: ExperienceStage },
  { id: 'credentials', number: '05', label: 'Credentials', component: CredentialsStage },
  { id: 'software', number: '06', label: 'Software', component: SoftwareStage },
]

export default function PortfolioJourney() {
  return (
    <main className="portfolio" id="portfolio">
      <div className="shell">
        <header className="portfolio-intro" data-reveal>
          <p>Portfolio</p>
          <h2>A little about me and my work.</h2>
          <span>What I enjoy, what I work with, where I have worked, and the projects I have built.</span>
        </header>

        <div className="journey">
          <div className="journey-line" aria-hidden="true" />
          {stages.map(({ id, number, label, component: Component }) => (
            <Stage id={id} number={number} label={label} key={id}>
              <Component />
            </Stage>
          ))}
        </div>
      </div>
    </main>
  )
}
