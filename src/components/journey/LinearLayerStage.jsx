import { useLayoutEffect, useRef, useState } from 'react'
import {
  Blocks,
  BrainCircuit,
  Code2,
  Database,
  GitBranch,
  Handshake,
  MessageCircleMore,
  Network,
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
    id: 'collaboration',
    label: 'Collaboration',
    detail: 'Shared context, clear handoffs, feedback loops, and building across product and engineering.',
    Icon: Handshake,
  },
]

const activation = {
  id: 'activation',
  label: 'Ways of working',
  detail: 'Clear communication, early feedback, and shared ownership turn technical foundations into work people can use.',
  Icon: Sparkles,
}

const activationSignals = [
  { label: 'Align', Icon: Handshake },
  { label: 'Communicate', Icon: MessageCircleMore },
  { label: 'Iterate', Icon: Sparkles },
]

const projectLayer = projects.map((project) => ({
  ...project,
  label: project.title,
  detail: project.summary,
  Icon: GitBranch,
}))

const connectEveryNode = (sources, targets) =>
  sources.flatMap((source) => targets.map((target) => [source.id, target.id]))

const layerConnections = [
  ...connectEveryNode(inputLayer, foundationLayer),
  ...foundationLayer.map((item) => [item.id, activation.id]),
  [activation.id, 'project-output'],
]

function curveBetween(start, end) {
  const distance = Math.max(36, end.x - start.x)
  const control = Math.max(34, distance * 0.46)
  return `M ${start.x} ${start.y} C ${start.x + control} ${start.y}, ${end.x - control} ${end.y}, ${end.x} ${end.y}`
}

function curveDown(start, end) {
  const control = Math.max(45, (end.y - start.y) * 0.5)
  return `M ${start.x} ${start.y} C ${start.x} ${start.y + control}, ${end.x} ${end.y - control}, ${end.x} ${end.y}`
}

function LayerNode({ item, activeId, onEnter, onLeave, nodeRef, variant = '', isClone = false }) {
  const Icon = item.Icon
  const isActive = activeId === (item.loopKey ?? item.id)

  return (
    <button
      ref={nodeRef}
      type="button"
      className={`layer-node ${variant} ${isActive ? 'is-active' : ''}`}
      aria-hidden={isClone || undefined}
      tabIndex={isClone ? -1 : 0}
      onMouseEnter={() => onEnter(item)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(item)}
      onBlur={onLeave}
    >
      <span className="layer-node-icon">
        <Icon aria-hidden="true" size={variant === 'project-node' ? 22 : 18} strokeWidth={1.7} />
      </span>
      <span className="layer-node-copy">
        <strong>{item.label}</strong>
        {variant === 'project-node' && <small>{item.type}</small>}
      </span>
      {variant !== 'project-node' && isActive && (
        <span className="skill-node-tooltip" role="status">
          <small>Familiar with</small>
          <strong>{item.label}</strong>
          <span>{item.detail}</span>
        </span>
      )}
      {variant === 'project-node' && isActive && (
        <span className="project-node-popover" role="status">
          <small>{item.type}</small>
          <strong>{item.label}</strong>
          <span>{item.detail}</span>
          {item.stack && <i>{item.stack.join(' · ')}</i>}
        </span>
      )}
    </button>
  )
}

function ProjectCard({ item }) {
  const Icon = item.Icon

  return (
    <article className="project-card">
      <header>
        <span className="project-card-icon">
          <Icon aria-hidden="true" size={22} strokeWidth={1.7} />
        </span>
        <small>{item.id} / {item.period}</small>
      </header>
      <div className="project-card-copy">
        <span>{item.type}</span>
        <h3>{item.label}</h3>
        <p>{item.detail}</p>
        <div className="project-card-contribution">
          <small>My contribution</small>
          <p>{item.contribution}</p>
        </div>
      </div>
      <footer>
        {item.stack.map((technology) => <span key={technology}>{technology}</span>)}
      </footer>
    </article>
  )
}

export default function LinearLayerStage() {
  const [activeItem, setActiveItem] = useState(null)
  const [diagram, setDiagram] = useState({ width: 0, height: 0, paths: [] })
  const mapRef = useRef(null)
  const nodeRefs = useRef({})

  useLayoutEffect(() => {
    const map = mapRef.current
    if (!map) return undefined

    let animationFrame

    const measure = () => {
      const mapBounds = map.getBoundingClientRect()
      const mapWidth = map.clientWidth
      const mapHeight = map.clientHeight
      if (!mapBounds.width || !mapBounds.height || !mapWidth || !mapHeight) return

      const scaleX = mapBounds.width / mapWidth
      const scaleY = mapBounds.height / mapHeight
      const pointFor = (id, edge) => {
        const node = nodeRefs.current[id]
        if (!node) return null
        const bounds = node.getBoundingClientRect()
        return {
          x: (
            edge === 'left'
              ? bounds.left - mapBounds.left
              : edge === 'right'
                ? bounds.right - mapBounds.left
                : bounds.left - mapBounds.left + bounds.width / 2
          ) / scaleX,
          y: (
            edge === 'top'
              ? bounds.top - mapBounds.top
              : edge === 'bottom'
                ? bounds.bottom - mapBounds.top
                : bounds.top - mapBounds.top + bounds.height / 2
          ) / scaleY,
        }
      }

      const paths = layerConnections.flatMap(([source, target]) => {
        const vertical = source === activation.id && target === 'project-output'
        const start = pointFor(source, vertical ? 'bottom' : 'right')
        const end = pointFor(target, vertical ? 'top' : 'left')
        if (!start || !end) return []
        return [{
          id: `${source}-${target}`,
          source,
          target,
          d: vertical ? curveDown(start, end) : curveBetween(start, end),
          start,
          end,
        }]
      })

      setDiagram({ width: mapWidth, height: mapHeight, paths })
    }

    const scheduleMeasure = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(measure)
    }

    const resizeObserver = new ResizeObserver(scheduleMeasure)
    resizeObserver.observe(map)
    Object.values(nodeRefs.current).forEach((node) => node && resizeObserver.observe(node))
    document.fonts?.ready.then(scheduleMeasure)
    scheduleMeasure()

    return () => {
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
    }
  }, [])

  const registerNode = (id) => (node) => {
    if (node) nodeRefs.current[id] = node
  }

  return (
    <>
      <StageHeading
        kicker="Work / Neural stack"
        title="What I work with—and"
        accent="what I have built."
        description="The software, data, AI, and collaborative habits I bring to professional and personal projects."
      />

      <section className="linear-system" data-reveal aria-label="Engineering skills connected through a working layer to selected projects">
        <div className="linear-system-caption">
          <span>Interactive system map</span>
          <strong>Tools become systems. Collaboration makes them useful.</strong>
        </div>

        <div className="linear-map" ref={mapRef}>
          {diagram.width > 0 && (
            <svg
              className="linear-connections"
              viewBox={`0 0 ${diagram.width} ${diagram.height}`}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="layer-link" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#39728a" stopOpacity=".52" />
                  <stop offset=".55" stopColor="#756c91" stopOpacity=".68" />
                  <stop offset="1" stopColor="#39728a" stopOpacity=".78" />
                </linearGradient>
                <linearGradient id="layer-link-active" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#c65f55" />
                  <stop offset="1" stopColor="#39728a" />
                </linearGradient>
              </defs>
              {diagram.paths.map((path) => {
                const active = activeItem && (path.source === activeItem.id || path.target === activeItem.id)
                return (
                  <g className={active ? 'is-active' : ''} key={path.id}>
                    <path d={path.d} vectorEffect="non-scaling-stroke" />
                    <circle cx={path.start.x} cy={path.start.y} r="3.2" />
                    <circle cx={path.end.x} cy={path.end.y} r="3.2" />
                  </g>
                )
              })}
            </svg>
          )}

          <div className="linear-grid">
            <section className="linear-layer" aria-label="Input layer: code and engineering tools">
              <header><span>01</span>Input layer</header>
              <div className="layer-stack">
                {inputLayer.map((item) => (
                  <LayerNode
                    key={item.id}
                    item={item}
                    activeId={activeItem?.loopKey ?? activeItem?.id}
                    onEnter={setActiveItem}
                    onLeave={() => setActiveItem(null)}
                    nodeRef={registerNode(item.id)}
                  />
                ))}
              </div>
            </section>

            <section className="linear-layer" aria-label="Foundation layer">
              <header><span>02</span>Foundations</header>
              <div className="layer-stack">
                {foundationLayer.map((item) => (
                  <LayerNode
                    key={item.id}
                    item={item}
                    activeId={activeItem?.id}
                    onEnter={setActiveItem}
                    onLeave={() => setActiveItem(null)}
                    nodeRef={registerNode(item.id)}
                  />
                ))}
              </div>
            </section>

            <section className="linear-activation" aria-label="Working layer">
              <header><span>03</span>Working layer</header>
              <button
                ref={registerNode(activation.id)}
                type="button"
                className={activeItem?.id === activation.id ? 'activation-gate is-active' : 'activation-gate'}
                onMouseEnter={() => setActiveItem(activation)}
                onMouseLeave={() => setActiveItem(null)}
                onFocus={() => setActiveItem(activation)}
                onBlur={() => setActiveItem(null)}
              >
                <span className="activation-gate-core"><Sparkles size={25} strokeWidth={1.6} /></span>
                <strong>Build with people, not around them</strong>
                <span className="activation-signals">
                  {activationSignals.map(({ label, Icon }) => (
                    <i key={label}><Icon size={14} />{label}</i>
                  ))}
                </span>
              </button>
            </section>

            <section className="linear-layer linear-layer-output" aria-label="Output layer: selected projects">
              <header ref={registerNode('project-output')}><span>04</span>Selected projects</header>
              <div className="project-grid">
                {projectLayer.map((project) => (
                  <ProjectCard item={project} key={project.id} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}
