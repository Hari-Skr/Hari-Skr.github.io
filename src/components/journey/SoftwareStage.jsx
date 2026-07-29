import { BrainCircuit, Check, Code2, Database, ServerCog } from 'lucide-react'
import { softwareLayers } from '../../data/portfolio'
import { StageHeading } from './Stage'

const icons = {
  intelligence: BrainCircuit,
  data: Database,
  services: ServerCog,
  interface: Code2,
}

export default function SoftwareStage() {
  return (
    <>
      <StageHeading
        kicker="How the pieces connect"
        title="The final"
        accent="software layer."
        description="Models, storage, backend services, and interfaces connected as one working application."
      />
      <div className="software-system" data-reveal>
        {softwareLayers.map((layer, index) => {
          const Icon = icons[layer.id]
          return (
            <article className="software-layer" key={layer.id}>
              <span>0{softwareLayers.length - index}</span>
              <Icon size={23} />
              <div>
                <small>{layer.label}</small>
                <h3>{layer.title}</h3>
              </div>
              <p>{layer.tools}</p>
            </article>
          )
        })}
        <div className="software-result">
          <Check size={20} />
          <span>Working software</span>
        </div>
      </div>
    </>
  )
}
