import anime from 'animejs'
import { useEffect, useRef, useState } from 'react'
import { Code2, PackageCheck, Search, TestTube2, Workflow } from 'lucide-react'

const descentSegments = [
  'M150 118 C181.5 113.7 277.3 80 339 92',
  'M339 92 C400.7 104 494.8 163.7 520 190',
  'M520 190 C545.2 216.3 510 236.7 490 250',
  'M490 250 C470 263.3 415 266.7 400 270',
]

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
    tone: '#FF7517',
    Icon: Search,
  },
  {
    step: 'Design',
    detail: 'Choose boundaries and trade-offs before choosing tools.',
    x: 339,
    y: 92,
    tone: '#b98268',
    Icon: Workflow,
  },
  {
    step: 'Build',
    detail: 'Turn the design into a small, dependable working slice.',
    x: 520,
    y: 190,
    tone: '#948995',
    Icon: Code2,
  },
  {
    step: 'Test',
    detail: 'Check behaviour, edge cases, and the assumptions underneath.',
    x: 490,
    y: 250,
    tone: '#87947d',
    Icon: TestTube2,
  },
  {
    step: 'Deliver',
    detail: 'Ship carefully, observe the result, and carry the learning forward.',
    x: 400,
    y: 270,
    tone: '#d0a951',
    Icon: PackageCheck,
  },
]

const targetCheckpoint = checkpoints[checkpoints.length - 1]

export default function HeroLossLandscape() {
  const [autoIndex, setAutoIndex] = useState(null)
  const [userIndex, setUserIndex] = useState(null)
  const activeIndex = userIndex !== null ? userIndex : autoIndex
  const activeCheckpoint = activeIndex === null ? null : checkpoints[activeIndex]

  const svgRef = useRef(null)
  const runnerRef = useRef(null)
  const tlRef = useRef(null)

  const showCheckpoint = (index) => {
    setUserIndex(index)
    tlRef.current?.pause()
  }

  const hideCheckpoint = () => {
    setUserIndex(null)
    tlRef.current?.play()
  }

  const toggleCheckpoint = (index) => {
    setUserIndex((current) => {
      const next = current === index ? null : index
      if (next === null) {
        tlRef.current?.play()
      } else {
        tlRef.current?.pause()
      }
      return next
    })
  }

  useEffect(() => {
    const runner = runnerRef.current
    const svgEl = svgRef.current
    if (!runner || !svgEl) return

    const seg0 = svgEl.querySelector('#descent-seg-0')
    const seg1 = svgEl.querySelector('#descent-seg-1')
    const seg2 = svgEl.querySelector('#descent-seg-2')
    const seg3 = svgEl.querySelector('#descent-seg-3')
    if (!seg0 || !seg1 || !seg2 || !seg3) return

    const p0 = anime.path(seg0)
    const p1 = anime.path(seg1)
    const p2 = anime.path(seg2)
    const p3 = anime.path(seg3)

    const getIndexForTime = (t) => {
      if (t >= 0 && t < 2000) return 0
      if (t >= 2900 && t < 4900) return 1
      if (t >= 5750 && t < 7750) return 2
      if (t >= 8450 && t < 10450) return 3
      if (t >= 11100 && t < 13300) return 4
      return null
    }

    const tl = anime.timeline({
      loop: true,
      autoplay: true,
      update: (anim) => {
        const nextIdx = getIndexForTime(anim.currentTime)
        setAutoIndex((prev) => (prev !== nextIdx ? nextIdx : prev))
      },
    })
    tlRef.current = tl

    // Initial position at Checkpoint 0
    anime.set(runner, {
      translateX: checkpoints[0].x,
      translateY: checkpoints[0].y,
      opacity: 1,
    })

    // Checkpoint 0 (Understand) - 0 to 2000ms
    tl.add({
      targets: runner,
      translateX: checkpoints[0].x,
      translateY: checkpoints[0].y,
      duration: 2000,
      easing: 'linear',
    })

    // Travel to Checkpoint 1 (Design) - 2000 to 2900ms (900ms)
    .add({
      targets: runner,
      translateX: p0('x'),
      translateY: p0('y'),
      easing: 'easeInOutQuad',
      duration: 900,
    })

    // Checkpoint 1 (Design) - 2900 to 4900ms (2000ms)
    .add({
      targets: runner,
      translateX: checkpoints[1].x,
      translateY: checkpoints[1].y,
      duration: 2000,
      easing: 'linear',
    })

    // Travel to Checkpoint 2 (Build) - 4900 to 5750ms (850ms)
    .add({
      targets: runner,
      translateX: p1('x'),
      translateY: p1('y'),
      easing: 'easeInOutQuad',
      duration: 850,
    })

    // Checkpoint 2 (Build) - 5750 to 7750ms (2000ms)
    .add({
      targets: runner,
      translateX: checkpoints[2].x,
      translateY: checkpoints[2].y,
      duration: 2000,
      easing: 'linear',
    })

    // Travel to Checkpoint 3 (Test) - 7750 to 8450ms (700ms)
    .add({
      targets: runner,
      translateX: p2('x'),
      translateY: p2('y'),
      easing: 'easeInOutQuad',
      duration: 700,
    })

    // Checkpoint 3 (Test) - 8450 to 10450ms (2000ms)
    .add({
      targets: runner,
      translateX: checkpoints[3].x,
      translateY: checkpoints[3].y,
      duration: 2000,
      easing: 'linear',
    })

    // Travel to Checkpoint 4 (Deliver) - 10450 to 11100ms (650ms)
    .add({
      targets: runner,
      translateX: p3('x'),
      translateY: p3('y'),
      easing: 'easeInOutQuad',
      duration: 650,
    })

    // Checkpoint 4 (Deliver) - 11100 to 13300ms (2200ms)
    .add({
      targets: runner,
      translateX: checkpoints[4].x,
      translateY: checkpoints[4].y,
      duration: 2200,
      easing: 'linear',
    })

    // Rewind back to Checkpoint 0 - 13300 to 13700ms (400ms)
    .add({
      targets: runner,
      opacity: [1, 0, 1],
      translateX: checkpoints[0].x,
      translateY: checkpoints[0].y,
      duration: 400,
      easing: 'easeInOutQuad',
    })

    return () => {
      tl.pause()
    }
  }, [])

  return (
    <aside className="hero-landscape" data-reveal aria-label="An optimization path converging toward a useful result">
      <div className="landscape-heading">
        <span>DECISION PATH</span>
        <strong>Clarity drives innovation.</strong>
        <p>Every iteration cuts through the uncertainty, transforming complex engineering problems into scalable, observable software.</p>
      </div>

      <div className="loss-visual">
        <svg ref={svgRef} viewBox="0 0 640 420" role="img" aria-label="An organic topographic uncertainty field with five engineering decisions descending toward a shipped result">
          <defs>
            <radialGradient id="terrain-basin-fill" cx="0" cy="0" r="1" gradientTransform="translate(418 275) rotate(-155) scale(400 265)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d0a951" stopOpacity=".22" />
              <stop offset=".42" stopColor="#87947d" stopOpacity=".1" />
              <stop offset=".82" stopColor="#FF7517" stopOpacity=".035" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <mask id="descent-checkpoint-gaps" maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="420">
              <rect width="640" height="420" fill="white" />
              {checkpoints.slice(0, -1).map((checkpoint) => (
                <circle cx={checkpoint.x} cy={checkpoint.y} r="14" fill="black" key={checkpoint.step} />
              ))}
              <circle cx={targetCheckpoint.x} cy={targetCheckpoint.y} r="18" fill="black" />
            </mask>
          </defs>

          <g className="terrain-grid" aria-hidden="true">
            <path d="M25 78 H616 M25 166 H616 M25 254 H616 M25 342 H616" />
            <path d="M82 31 V389 M190 31 V389 M298 31 V389 M406 31 V389 M514 31 V389" />
          </g>

          <g className="terrain-field" aria-hidden="true">
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

          <g className="descent-path" mask="url(#descent-checkpoint-gaps)" aria-hidden="true">
            {descentSegments.map((segment, index) => (
              <path
                id={`descent-seg-${index}`}
                className="descent-segment"
                d={segment}
                pathLength="1"
                style={{ '--segment-index': index }}
                key={segment}
              />
            ))}
          </g>

          <circle ref={runnerRef} className="terrain-runner" cx="0" cy="0" r="5.5" aria-hidden="true" />

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
