import AboutStage from './AboutStage'
import CredentialsStage from './CredentialsStage'
import EducationStage from './EducationStage'
import ExperienceStage from './ExperienceStage'
import LinearLayerStage from './LinearLayerStage'
import Stage from './Stage'

const stages = [
  { id: 'about', component: AboutStage },
  { id: 'education', component: EducationStage },
  { id: 'projects', component: LinearLayerStage },
  { id: 'experience', component: ExperienceStage },
  { id: 'credentials', component: CredentialsStage },
]

export default function PortfolioJourney() {
  return (
    <main className="portfolio" id="portfolio">
      <div className="shell">
        <div className="journey">
          {stages.map(({ id, component: Component }) => (
            <Stage id={id} key={id}>
              <Component />
            </Stage>
          ))}
        </div>
      </div>
    </main>
  )
}
