import { useState } from 'react'
import { Code2, PackageCheck, Search, TestTube2, Workflow } from 'lucide-react'

const descentPath =
  'M150 118 C181.5 113.7 277.3 80 339 92 C400.7 104 494.8 163.7 520 190 C545.2 216.3 510 236.7 490 250 C470 263.3 415 266.7 400 270'

const terrainBands = [
  'M43 272 C32 190 89 110 199 70 C316 27 478 43 565 111 C651 178 631 296 537 366 C449 432 287 443 158 393 C91 367 49 322 43 272 Z',
  'M84 273 C75 205 125 138 219 103 C318 66 454 73 527 128 C598 182 582 278 504 336 C430 392 302 402 198 362 C137 339 90 306 84 273 Z',
  'M132 270 C126 218 165 166 239 137 C318 107 426 110 485 153 C543 195 532 264 472 308 C414 351 316 360 237 331 C184 312 137 291 132 270 Z',
  'M185 271 C180 233 210 195 265 174 C323 151 402 153 445 184 C487 214 480 258 437 290 C395 321 324 326 268 306 C229 292 189 283 185 271 Z',
  'M244 274 C241 246 263 220 302 205 C344 189 398 191 427 212 C456 233 451 260 422 281 C393 302 345 306 307 293 C280 284 247 283 244 274 Z',
  'M304 277 C302 259 316 243 342 233 C370 223 405 225 424 238 C442 252 439 268 420 282 C402 295 371 298 347 290 C330 285 306 285 304 277 Z',
  'M362 279 C361 269 370 260 385 255 C401 249 420 251 430 258 C440 265 438 273 428 281 C418 289 401 290 388 286 C379 283 363 284 362 279 Z',
]

const checkpoints = [
  {
    step: 'Understand',
    detail: 'Start with the user, the constraint, and the actual problem.',
    x: 150,
    y: 118,
    tone: '#f26430',
    Icon: Search,
  },
  {
    step: 'Design',
    detail: 'Choose boundaries and trade-offs before choosing tools.',
    x: 339,
    y: 92,
    tone: '#d96d5b',
    Icon: Workflow,
  },
  {
    step: 'Build',
    detail: 'Turn the design into a small, dependable working slice.',
    x: 520,
    y: 190,
    tone: '#a17c83',
    Icon: Code2,
  },
  {
    step: 'Test',
    detail: 'Check behaviour, edge cases, and the assumptions underneath.',
    x: 490,
    y: 250,
    tone: '#4e91ae',
    Icon: TestTube2,
  },
  {
    step: 'Deliver',
    detail: 'Ship carefully, observe the result, and carry the learning forward.',
    x: 400,
    y: 270,
    tone: '#009ddc',
    Icon: PackageCheck,
  },
]

const targetCheckpoint = checkpoints[checkpoints.length - 1]

export default function HeroLossLandscape() {
  const [activeIndex, setActiveIndex] = useState(null)
  const activeCheckpoint = activeIndex === null ? null : checkpoints[activeIndex]
  const showCheckpoint = (index) => setActiveIndex(index)
  const hideCheckpoint = () => setActiveIndex(null)
  const toggleCheckpoint = (index) => setActiveIndex((current) => (current === index ? null : index))

  return (
    <aside className="hero-landscape" data-reveal aria-label="An optimization path converging toward a useful result">
      <div className="landscape-heading">
        <span>DECISION PATH</span>
        <strong>Clear decisions move useful software forward.</strong>
        <p>Each pass removes uncertainty, turning an open problem into something useful and observable.</p>
      </div>

      <div className="loss-visual">
        <svg viewBox="0 0 640 420" role="img" aria-label="An organic topographic uncertainty field with five engineering decisions descending toward a shipped result">
          <defs>
            <radialGradient id="terrain-basin-fill" cx="0" cy="0" r="1" gradientTransform="translate(418 275) rotate(-155) scale(400 265)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#009ddc" stopOpacity=".28" />
              <stop offset=".42" stopColor="#4e91ae" stopOpacity=".12" />
              <stop offset=".82" stopColor="#f26430" stopOpacity=".04" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <filter id="terrain-shadow" x="-30%" y="-30%" width="160%" height="170%">
              <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#263d42" floodOpacity=".09" />
            </filter>
          </defs>

          <g className="terrain-grid" aria-hidden="true">
            <path d="M25 78 H616 M25 166 H616 M25 254 H616 M25 342 H616" />
            <path d="M82 31 V389 M190 31 V389 M298 31 V389 M406 31 V389 M514 31 V389" />
          </g>

          <g className="terrain-field" filter="url(#terrain-shadow)" aria-hidden="true">
            {terrainBands.map((path, index) => (
              <path
                className="terrain-band"
                d={path}
                key={path}
                style={{ '--terrain-level': index }}
              />
            ))}
          </g>

          <g className="terrain-readings" aria-hidden="true">
            <text x="74" y="202">UNCERTAINTY 1.00</text>
            <text x="178" y="303">0.64</text>
            <text x="318" y="326">0.31</text>
            <text x="486" y="298">0.08</text>
          </g>

          <path className="descent-path" d={descentPath} pathLength="1" />

          {checkpoints.slice(0, -1).map((checkpoint, index) => (
            <g
              className={`terrain-checkpoint ${activeIndex === index ? 'is-active' : ''}`}
              transform={`translate(${checkpoint.x} ${checkpoint.y})`}
              style={{ '--checkpoint-tone': checkpoint.tone }}
              key={checkpoint.step}
            >
              <circle className="checkpoint-halo" r="17" />
              <circle className="checkpoint-shell" r="11" />
              <circle className="checkpoint-core" r="3.5" />
              <text x="0" y="-24">0{index + 1}</text>
            </g>
          ))}

          <g
            className={`terrain-target ${activeIndex === checkpoints.length - 1 ? 'is-active' : ''}`}
            transform={`translate(${targetCheckpoint.x} ${targetCheckpoint.y})`}
            style={{ '--target-tone': targetCheckpoint.tone }}
          >
            <path d="M-34 0 H34 M0 -34 V34" />
            <circle className="target-ring" r="15" />
            <circle className="target-core" r="5" />
            <text x="0" y="-38">05</text>
          </g>

          <g className="terrain-target-label" aria-hidden="true">
            <text x={targetCheckpoint.x + 30} y={targetCheckpoint.y - 18}>OPTIMUM</text>
          </g>
        </svg>

        {checkpoints.map((checkpoint, index) => (
          <button
            type="button"
            className="terrain-node-hit"
            style={{
              '--node-x': `${(checkpoint.x / 640) * 100}%`,
              '--node-y': `${(checkpoint.y / 420) * 100}%`,
            }}
            aria-label={`${checkpoint.step}: ${checkpoint.detail}`}
            aria-expanded={activeIndex === index}
            onMouseEnter={() => showCheckpoint(index)}
            onMouseLeave={hideCheckpoint}
            onFocus={() => showCheckpoint(index)}
            onBlur={hideCheckpoint}
            onClick={() => toggleCheckpoint(index)}
            key={checkpoint.step}
          />
        ))}

        {activeCheckpoint && (
          <div
            className="terrain-tooltip"
            data-position={activeIndex}
            style={{
              '--tooltip-x': `${(activeCheckpoint.x / 640) * 100}%`,
              '--tooltip-y': `${(activeCheckpoint.y / 420) * 100}%`,
            }}
            role="status"
            aria-live="polite"
          >
            <span>0{activeIndex + 1}</span>
            <div>
              <strong>{activeCheckpoint.step}</strong>
              <p>{activeCheckpoint.detail}</p>
            </div>
          </div>
        )}
      </div>

      <div className="landscape-steps" aria-label="Engineering process checkpoints">
        {checkpoints.map(({ step, Icon }, index) => (
          <button
            type="button"
            className={activeIndex === index ? 'is-active' : ''}
            aria-pressed={activeIndex === index}
            onMouseEnter={() => showCheckpoint(index)}
            onMouseLeave={hideCheckpoint}
            onFocus={() => showCheckpoint(index)}
            onBlur={hideCheckpoint}
            onClick={() => toggleCheckpoint(index)}
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
