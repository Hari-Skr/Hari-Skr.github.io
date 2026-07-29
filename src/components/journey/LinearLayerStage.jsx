import { useState } from 'react'
import {
  Blocks,
  BrainCircuit,
  Code2,
  Database,
  GitBranch,
  Handshake,
  MessageCircleMore,
  Network,
  Route,
  Sparkles,
} from 'lucide-react'
import { projects } from '../../data/portfolio'
import { StageHeading } from './Stage'

const inputLayer = [
  {
    id: 'code',
    label: 'Code',
    detail: 'Python, TypeScript, Golang, and C++ for services, tools, and product work.',
    Icon: Code2,
  },
  {
    id: 'interfaces',
    label: 'Interfaces',
    detail: 'React, FastAPI, Django, Elysia, and Express for useful, maintainable entry points.',
    Icon: Blocks,
  },
  {
    id: 'data',
    label: 'Data',
    detail: 'PostgreSQL, Cassandra, MongoDB, MinIO, ETL, and data modeling.',
    Icon: Database,
  },
]

const foundationLayer = [
  {
    id: 'ai-ml',
    label: 'AI / ML',
    detail: 'PyTorch, Transformers, TRL, PEFT, RAG, NLP, and computer vision.',
    Icon: BrainCircuit,
  },
  {
    id: 'systems',
    label: 'System design',
    detail: 'APIs, service boundaries, storage choices, and the path from prototype to production.',
    Icon: Network,
  },
  {
    id: 'delivery',
    label: 'Delivery',
    detail: 'Docker, model deployment, backend integration, and the practical details around shipping.',
    Icon: Route,
  },
]

const activationLayer = [
  {
    id: 'collaboration',
    label: 'Collaboration',
    detail: 'Working across product, data, and engineering concerns to move a feature forward.',
    Icon: Handshake,
  },
  {
    id: 'communication',
    label: 'Communication',
    detail: 'Making technical decisions understandable, useful, and ready for implementation.',
    Icon: MessageCircleMore,
  },
  {
    id: 'mentoring',
    label: 'Mentoring',
    detail: 'Supporting students through the intercampus AI Student Interest Group.',
    Icon: Sparkles,
  },
]

function LayerNode({ item, activeId, onActivate, variant = '' }) {
  const Icon = item.Icon
  const isActive = activeId === item.id

  return (
    <button
      type="button"
      className={`layer-node ${variant} ${isActive ? 'is-active' : ''}`}
      aria-pressed={isActive}
      onMouseEnter={() => onActivate(item)}
      onFocus={() => onActivate(item)}
      onClick={() => onActivate(item)}
    >
      <Icon aria-hidden="true" size={18} strokeWidth={1.7} />
      <span>{item.label}</span>
    </button>
  )
}

export default function LinearLayerStage() {
  const [activeItem, setActiveItem] = useState(inputLayer[0])

  return (
    <>
      <StageHeading
        kicker="The build path"
        title="From a clear signal to"
        accent="useful software."
        description="Code, engineering foundations, and collaborative habits come together in the projects below. Hover a node to inspect its role."
      />

      <section className="linear-system" data-reveal aria-label="A linear map from engineering skills to selected projects">
        <div className="linear-system-caption">
          <span>What I believe</span>
          <strong>Good software is built by connecting the right layers.</strong>
        </div>

        <svg className="linear-connections" viewBox="0 0 1200 500" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="layer-link" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#39728a" stopOpacity=".18" />
              <stop offset=".52" stopColor="#756c91" stopOpacity=".42" />
              <stop offset="1" stopColor="#39728a" stopOpacity=".54" />
            </linearGradient>
          </defs>
          <g>
            <path d="M190 132 C284 132 310 132 405 132" />
            <path d="M190 132 C284 132 310 250 405 250" />
            <path d="M190 250 C284 250 310 132 405 132" />
            <path d="M190 250 C284 250 310 250 405 250" />
            <path d="M190 250 C284 250 310 368 405 368" />
            <path d="M190 368 C284 368 310 250 405 250" />
            <path d="M190 368 C284 368 310 368 405 368" />
            <path d="M595 132 C684 132 710 132 800 132" />
            <path d="M595 132 C684 132 710 250 800 250" />
            <path d="M595 250 C684 250 710 132 800 132" />
            <path d="M595 250 C684 250 710 250 800 250" />
            <path d="M595 250 C684 250 710 368 800 368" />
            <path d="M595 368 C684 368 710 250 800 250" />
            <path d="M595 368 C684 368 710 368 800 368" />
            <path d="M990 132 C1040 132 1060 132 1110 132" />
            <path d="M990 250 C1040 250 1060 250 1110 250" />
            <path d="M990 368 C1040 368 1060 368 1110 368" />
          </g>
        </svg>

        <div className="linear-grid">
          <section className="linear-layer" aria-label="Input layer: code and engineering tools">
            <header><span>01</span>Input layer</header>
            <div className="layer-stack">
              {inputLayer.map((item) => (
                <LayerNode key={item.id} item={item} activeId={activeItem.id} onActivate={setActiveItem} />
              ))}
            </div>
          </section>

          <section className="linear-layer" aria-label="Foundation layer">
            <header><span>02</span>Foundations</header>
            <div className="layer-stack">
              {foundationLayer.map((item) => (
                <LayerNode key={item.id} item={item} activeId={activeItem.id} onActivate={setActiveItem} />
              ))}
            </div>
          </section>

          <section className="linear-layer linear-layer-activation" aria-label="Activation layer: ways of working">
            <header><span>03</span>Activation</header>
            <div className="layer-stack">
              {activationLayer.map((item) => (
                <LayerNode key={item.id} item={item} activeId={activeItem.id} onActivate={setActiveItem} variant="activation-node" />
              ))}
            </div>
          </section>

          <section className="linear-layer linear-layer-output" aria-label="Output layer: selected projects">
            <header><span>ŷ</span>Project output</header>
            <div className="layer-stack">
              {projects.map((project) => (
                <LayerNode
                  key={project.id}
                  item={{ ...project, label: project.title, detail: project.summary, Icon: GitBranch }}
                  activeId={activeItem.id}
                  onActivate={setActiveItem}
                  variant="project-node"
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="layer-inspector" aria-live="polite">
          <div className="layer-inspector-icon"><activeItem.Icon size={21} strokeWidth={1.7} /></div>
          <div>
            <span>{projects.some((project) => project.id === activeItem.id) ? 'Project output' : 'Active layer'}</span>
            <strong>{activeItem.label}</strong>
            <p>{activeItem.detail}</p>
            {activeItem.stack && <small>{activeItem.stack.join(' · ')}</small>}
          </div>
        </aside>
      </section>
    </>
  )
}
