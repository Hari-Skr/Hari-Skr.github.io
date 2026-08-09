import { useLayoutEffect, useRef, useState } from 'react'
import {
  Blocks,
  BrainCircuit,
  Code2,
  Container,
  Cpu,
  Database,
  Eye,
  GitBranch,
  Handshake,
  MessageCircleMore,
  Network,
  ScanEye,
  SearchCode,
  ServerCog,
  Sparkles,
} from 'lucide-react'
import { projects } from '../../data/portfolio'
import { StageHeading } from './Stage'

const toolsLayer = [
  {
    id: 'code',
    label: 'Programming',
    tooltipLabel: 'Toolset',
    detail: 'I choose languages based on the exact friction I need to solve: Python for intelligence, TypeScript for user experience, and C++ or Go for raw performance.',
    topics: ['Python', 'TypeScript', 'Golang', 'C++'],
    Icon: Code2,
  },
  {
    id: 'interfaces',
    label: 'Application frameworks',
    tooltipLabel: 'Toolset',
    detail: 'Frameworks are how I serve the logic. They allow me to expose secure AI endpoints, manage data flow, and build seamless frontend integrations.',
    topics: ['React', 'FastAPI', 'Django', 'Elysia', 'Express'],
    Icon: Blocks,
  },
  {
    id: 'data',
    label: 'Data infrastructure',
    tooltipLabel: 'Toolset',
    detail: 'A model is only as good as its data. I engineer pipelines and storage architectures focused on high availability, massive scale, and data integrity.',
    topics: ['PostgreSQL', 'Cassandra', 'MongoDB', 'MinIO', 'ETL'], //[cite: 1, 2, 3]
    Icon: Database,
  },
]

const foundationLayer = [
  {
    id: 'ai-ml',
    label: 'AI / ML principles',
    tooltipLabel: 'Core foundation',
    detail: 'I explore how models reason and fail. From dynamic context enrichment to custom inference scripts, I focus on making intelligence predictable and useful.',
    topics: ['Context Enrichment', 'Evaluation', 'Optimization'], //[cite: 1, 2, 3]
    Icon: BrainCircuit,
  },
  {
    id: 'systems',
    label: 'Systems thinking',
    tooltipLabel: 'Core foundation',
    detail: 'This is where I bridge the gap. I design the service boundaries and failure protocols needed to turn a complex idea into a scalable, working reality.',
    topics: ['Architecture', 'Reliability', 'Scalability'],
    Icon: Network,
  },
  {
    id: 'computer-science',
    label: 'Computer science',
    tooltipLabel: 'Core foundation',
    detail: 'The fundamental logic beneath every framework. I rely on strong algorithmic thinking and systems architecture to ensure everything I build is rock solid.',
    topics: ['Algorithms', 'Concurrency', 'Networks'],
    Icon: Cpu,
  },
]

const activation = {
  id: 'activation',
  label: 'Ways of working',
  detail: 'Clear communication, early feedback, and shared ownership turn technical foundations into work people can use.',
  Icon: Handshake,
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

const technologyIcons = {
  PostgreSQL: Database,
  REST: ServerCog,
  Docker: Container,
  Python: Code2,
  Django: ServerCog,
  Tailwind: Sparkles,
  'LLM API': BrainCircuit,
  'Knowledge Graphs': Network,
  Web: Network,
  RAG: SearchCode,
  Transformers: BrainCircuit,
  NLP: MessageCircleMore,
  'Computer Vision': Eye,
  'Raspberry Pi': Cpu,
  YOLOv3: ScanEye,
}

function curveToOutput(start, end) {
  const verticalDistance = Math.max(0, end.y - start.y)
  const control = Math.min(110, Math.max(54, verticalDistance * 0.42))
  return `M ${start.x} ${start.y} C ${start.x} ${start.y + control}, ${end.x} ${end.y - control}, ${end.x} ${end.y}`
}

function curveThrough(start, end) {
  const direction = end.x >= start.x ? 1 : -1
  const control = Math.max(28, Math.abs(end.x - start.x) * 0.52)
  return `M ${start.x} ${start.y} C ${start.x + direction * control} ${start.y}, ${end.x - direction * control} ${end.y}, ${end.x} ${end.y}`
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
          <small>{item.tooltipLabel ?? 'Working knowledge'}</small>
          <strong>{item.label}</strong>
          <span>{item.detail}</span>
          {item.topics && <i>{item.topics.join(' · ')}</i>}
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
        {item.stack.map((technology) => {
          const TechnologyIcon = technologyIcons[technology] ?? Code2
          const languageMark = { TypeScript: 'TS', Python: 'Py', JavaScript: 'JS' }[technology]
          return (
            <span
              className={`tech-badge ${languageMark ? 'tech-badge-language' : ''}`}
              data-technology={technology}
              aria-label={technology}
              title={technology}
              key={technology}
            >
              {languageMark ? <b aria-hidden="true">{languageMark}</b> : <TechnologyIcon aria-hidden="true" size={15} strokeWidth={1.75} />}
            </span>
          )
        })}
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
      const pointFor = (id, edge, offsetY = 0) => {
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
          ) / scaleY + offsetY,
        }
      }

      const paths = []
      const foundationOutputs = foundationLayer.map((item) => ({ id: item.id, point: pointFor(item.id, 'right') }))
      const toolInputs = toolsLayer.map((item) => ({ id: item.id, point: pointFor(item.id, 'left') }))
      const toolOutputs = toolsLayer.map((item) => ({ id: item.id, point: pointFor(item.id, 'right') }))
      const activationInput = pointFor(activation.id, 'left')

      if (foundationOutputs.every(({ point }) => point) && toolInputs.every(({ point }) => point)) {
        foundationOutputs.forEach(({ id: sourceId, point: start }) => {
          toolInputs.forEach(({ id: targetId, point: end }) => paths.push({
            id: `${sourceId}-${targetId}`,
            source: sourceId,
            target: targetId,
            related: [sourceId, targetId],
            kind: 'rail',
            d: curveThrough(start, end),
          }))
        })
      }

      if (toolOutputs.every(({ point }) => point) && activationInput) {
        toolOutputs.forEach(({ id, point }) => paths.push({
          id: `${id}-activation`,
          source: id,
          target: activation.id,
          related: [id, activation.id],
          kind: 'rail',
          d: curveThrough(point, activationInput),
        }))
      }

      const outputStart = pointFor(activation.id, 'bottom')
      const outputEnd = pointFor('project-output', 'top')
      if (outputStart && outputEnd) {
        paths.push({
          id: 'activation-project-output',
          source: activation.id,
          target: 'project-output',
          related: [activation.id],
          outputConnection: true,
          kind: 'output',
          d: curveToOutput(outputStart, outputEnd),
        })
      }

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
        <div className="linear-map" ref={mapRef}>
          {diagram.width > 0 && (
            <svg
              className="linear-connections"
              viewBox={`0 0 ${diagram.width} ${diagram.height}`}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="layer-link" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#39728a" stopOpacity=".76" />
                  <stop offset=".55" stopColor="#756c91" stopOpacity=".8" />
                  <stop offset="1" stopColor="#39728a" stopOpacity=".86" />
                </linearGradient>
                <linearGradient id="layer-link-active" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#c65f55" />
                  <stop offset="1" stopColor="#39728a" />
                </linearGradient>
              </defs>
              {diagram.paths.map((path) => {
                const active = activeItem && path.related?.includes(activeItem.id)
                return (
                  <g className={`${active ? 'is-active ' : ''}is-${path.kind}`} key={path.id}>
                    <path d={path.d} vectorEffect="non-scaling-stroke" />
                  </g>
                )
              })}
            </svg>
          )}

          <div className="linear-grid">
            <section className="linear-layer" aria-label="Foundations">
              <header><span>01</span>Foundations</header>
              <div className="layer-stack">
                {foundationLayer.map((item) => (
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

            <section className="linear-layer" aria-label="Tools: code and engineering tools">
              <header><span>02</span>Tools</header>
              <div className="layer-stack">
                {toolsLayer.map((item) => (
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

            <section className="linear-activation" aria-label="Collaboration">
              <header><span>03</span>Collaboration</header>
              <button
                ref={registerNode(activation.id)}
                type="button"
                className={activeItem?.id === activation.id ? 'activation-gate is-active' : 'activation-gate'}
                onMouseEnter={() => setActiveItem(activation)}
                onMouseLeave={() => setActiveItem(null)}
                onFocus={() => setActiveItem(activation)}
                onBlur={() => setActiveItem(null)}
              >
                <span className="activation-port" aria-hidden="true" />
                <span className="activation-gate-core"><Handshake size={25} strokeWidth={1.6} /></span>
                <strong>Build with people, not around them</strong>
                <span className="activation-signals">
                  {activationSignals.map(({ label, Icon }) => (
                    <i key={label}><Icon size={14} />{label}</i>
                  ))}
                </span>
              </button>
            </section>

            <section className="linear-layer linear-layer-output" aria-label="Output layer: software I ship">
              <header ref={registerNode('project-output')}><span>04</span>Projects</header>
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
