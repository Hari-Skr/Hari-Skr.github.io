import { useState } from 'react'
import { Code2, PackageCheck, Search, TestTube2, Workflow } from 'lucide-react'

const descentPath =
  'M82 92 C110 121 130 143 154 159 C178 176 188 194 207 211 C227 229 240 242 254 251 C268 260 279 265 290 267'

const contours = [
  'M39 284 C38 151 127 47 267 28 C409 9 501 84 512 219 C523 352 456 461 317 492 C173 523 47 438 39 284 Z',
  'M72 286 C70 172 145 82 267 64 C389 46 473 111 480 226 C487 340 427 428 313 454 C194 480 79 410 72 286 Z',
  'M108 286 C106 192 166 115 270 99 C374 84 438 137 445 231 C452 326 402 395 311 417 C215 440 113 387 108 286 Z',
  'M143 284 C141 210 190 145 274 134 C359 122 407 164 412 237 C417 310 378 365 309 381 C235 399 147 363 143 284 Z',
  'M180 283 C179 226 213 177 280 169 C346 160 379 190 381 242 C383 295 353 334 306 345 C252 358 182 343 180 283 Z',
  'M216 282 C215 242 240 207 284 202 C329 197 351 215 350 247 C350 281 330 306 303 313 C268 321 217 320 216 282 Z',
  'M251 280 C251 257 264 237 288 235 C313 232 327 241 324 257 C322 276 311 287 298 290 C279 295 252 299 251 280 Z',
]

const checkpoints = [
  {
    step: 'Understand',
    detail: 'Start with the user, the constraint, and the actual problem.',
    x: 82,
    y: 92,
    Icon: Search,
  },
  {
    step: 'Design',
    detail: 'Choose boundaries and trade-offs before choosing tools.',
    x: 154,
    y: 159,
    Icon: Workflow,
  },
  {
    step: 'Build',
    detail: 'Turn the design into a small, dependable working slice.',
    x: 207,
    y: 211,
    Icon: Code2,
  },
  {
    step: 'Test',
    detail: 'Check behaviour, edge cases, and the assumptions underneath.',
    x: 254,
    y: 251,
    Icon: TestTube2,
  },
  {
    step: 'Deliver',
    detail: 'Ship carefully, observe the result, and carry the learning forward.',
    x: 290,
    y: 267,
    Icon: PackageCheck,
  },
]

export default function HeroLossLandscape() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeCheckpoint = checkpoints[activeIndex]

  return (
    <aside className="hero-landscape" data-reveal aria-label="An optimization path converging toward a useful result">
      <div className="landscape-toolbar" aria-hidden="true">
        <span><i /> Engineering loop</span>
        <small>ITERATION / 05</small>
      </div>

      <div className="landscape-heading">
        <span>HOW I BUILD</span>
        <strong>Clear decisions move useful software forward.</strong>
        <p>From understanding the problem to observing what ships—each pass reduces uncertainty.</p>
      </div>

      <div className="loss-visual">
        <svg viewBox="0 0 520 520" role="img" aria-label="A clean optimization path descending through a loss landscape toward an optimum">
          <defs>
            <linearGradient id="new-trace-gradient" x1="82" y1="92" x2="290" y2="267" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#ef6b5b" />
              <stop offset=".48" stopColor="#6c72b8" />
              <stop offset="1" stopColor="#1f7088" />
            </linearGradient>
            <linearGradient id="new-contour-gradient" x1="40" y1="40" x2="490" y2="470" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#58a7b4" />
              <stop offset=".52" stopColor="#7779a6" />
              <stop offset="1" stopColor="#de8575" />
            </linearGradient>
            <radialGradient id="new-basin-glow" cx="0" cy="0" r="1" gradientTransform="translate(305 270) rotate(90) scale(178 206)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4e99ac" stopOpacity=".3" />
              <stop offset=".38" stopColor="#7489b0" stopOpacity=".14" />
              <stop offset=".72" stopColor="#dd8d7d" stopOpacity=".05" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <filter id="new-runner-glow" x="-300%" y="-300%" width="700%" height="700%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g className="landscape-grid">
            <path d="M0 130 H520 M0 260 H520 M0 390 H520" />
            <path d="M130 0 V520 M260 0 V520 M390 0 V520" />
          </g>

          <path className="basin-glow" d={contours[0]} />

          <g className="new-loss-contours">
            {contours.map((path, index) => <path d={path} key={path} style={{ '--contour-index': index }} />)}
          </g>

          <path className="new-trace-shadow" d={descentPath} />
          <path className="new-optimization-trace" d={descentPath} pathLength="1" />

          {checkpoints.slice(0, -1).map((checkpoint, index) => (
            <g
              className={`svg-checkpoint ${activeIndex === index ? 'is-active' : ''}`}
              transform={`translate(${checkpoint.x} ${checkpoint.y})`}
              key={checkpoint.step}
            >
              <circle r="14" />
              <circle r="4" />
              <text x="0" y="-23">0{index + 1}</text>
            </g>
          ))}

          <circle className="trace-runner" r="4" filter="url(#new-runner-glow)">
            <animateMotion dur="6.2s" repeatCount="indefinite" path={descentPath} />
          </circle>

          <g
            className={`optimum-marker ${activeIndex === checkpoints.length - 1 ? 'is-active' : ''}`}
            transform="translate(290 267)"
          >
            <circle r="27" />
            <circle r="15" />
            <circle r="5" />
            <text x="0" y="-34">05</text>
          </g>

          <text className="axis-label axis-label-y" x="16" y="268">LOSS</text>
          <text className="axis-label axis-label-x" x="414" y="500">ITERATION →</text>
          <text className="optimum-label" x="313" y="276">USEFUL RESULT</text>
        </svg>
      </div>

      <div className="landscape-readout" aria-live="polite">
        <span>0{activeIndex + 1}</span>
        <div>
          <strong>{activeCheckpoint.step}</strong>
          <p>{activeCheckpoint.detail}</p>
        </div>
      </div>

      <div className="landscape-steps" aria-label="Engineering process checkpoints">
        {checkpoints.map(({ step, Icon }, index) => (
          <button
            type="button"
            className={activeIndex === index ? 'is-active' : ''}
            aria-pressed={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            key={step}
          >
            <Icon size={15} strokeWidth={1.7} aria-hidden="true" />
            <span>{step}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}
