const tracePath =
  'M64 112 C132 50 211 64 228 132 C248 210 158 238 173 316 C190 400 307 436 402 372 C474 324 469 220 402 190 C338 160 282 197 283 253 C284 305 348 326 380 287 C398 266 384 250 370 276'

export default function HeroLossLandscape() {
  return (
    <aside className="hero-landscape" data-reveal aria-label="A loss landscape converging toward working software">
      <div className="landscape-heading">
        <span>WHAT I BELIEVE</span>
        <strong>Start with the problem. Build the system around it.</strong>
      </div>

      <svg viewBox="0 0 520 520" aria-hidden="true">
        <defs>
          <linearGradient id="trace-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#cf6256" />
            <stop offset=".5" stopColor="#806e9d" />
            <stop offset="1" stopColor="#2d7897" />
          </linearGradient>
          <linearGradient
            id="contour-gradient"
            x1="80"
            y1="74"
            x2="492"
            y2="438"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#4f9ba6" />
            <stop offset=".34" stopColor="#4d829d" />
            <stop offset=".68" stopColor="#81709c" />
            <stop offset="1" stopColor="#cb7469" />
          </linearGradient>
          <radialGradient id="minimum-glow">
            <stop offset="0" stopColor="#2d7897" stopOpacity=".34" />
            <stop offset=".45" stopColor="#619bb1" stopOpacity=".13" />
            <stop offset="1" stopColor="#39728a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="loss-heatmap">
            <stop offset="0" stopColor="#2d7897" stopOpacity=".3" />
            <stop offset=".2" stopColor="#5799ae" stopOpacity=".22" />
            <stop offset=".4" stopColor="#9a7194" stopOpacity=".16" />
            <stop offset=".64" stopColor="#c87970" stopOpacity=".085" />
            <stop offset=".82" stopColor="#cf6256" stopOpacity=".04" />
            <stop offset="1" stopColor="#39728a" stopOpacity="0" />
          </radialGradient>
          <filter id="heatmap-soft" x="-20%" y="-25%" width="140%" height="150%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        <g className="contour-grid">
          <line x1="20" y1="130" x2="500" y2="130" />
          <line x1="20" y1="260" x2="500" y2="260" />
          <line x1="20" y1="390" x2="500" y2="390" />
          <line x1="130" y1="20" x2="130" y2="500" />
          <line x1="260" y1="20" x2="260" y2="500" />
          <line x1="390" y1="20" x2="390" y2="500" />
        </g>

        <ellipse
          className="loss-heatmap"
          cx="342"
          cy="264"
          rx="270"
          ry="214"
          filter="url(#heatmap-soft)"
        />
        <g className="loss-contours" transform="rotate(-13 342 264)">
          <ellipse cx="342" cy="264" rx="270" ry="214" />
          <ellipse cx="342" cy="264" rx="230" ry="182" />
          <ellipse cx="342" cy="264" rx="194" ry="152" />
          <ellipse cx="342" cy="264" rx="160" ry="123" />
          <ellipse cx="342" cy="264" rx="128" ry="96" />
          <ellipse cx="342" cy="264" rx="96" ry="70" />
          <ellipse cx="342" cy="264" rx="65" ry="45" />
          <ellipse cx="342" cy="264" rx="32" ry="21" />
        </g>

        <circle className="minimum-glow" cx="370" cy="276" r="58" />
        <path className="optimization-trace" d={tracePath} />

        <g className="curve-step curve-step-start" transform="translate(64 112)">
          <circle r="8" />
        </g>
        <g className="curve-step" transform="translate(173 316)">
          <circle r="8" />
        </g>
        <g className="curve-step" transform="translate(402 372)">
          <circle r="8" />
        </g>
        <g className="curve-step" transform="translate(402 190)">
          <circle r="8" />
        </g>
        <g className="curve-step" transform="translate(393 245)">
          <circle r="8" />
        </g>

        <circle className="trace-particle" r="4">
          <animateMotion dur="10.5s" repeatCount="indefinite" path={tracePath} />
        </circle>
        <circle className="minimum-ring" cx="370" cy="276" r="12" />
        <circle className="minimum-core" cx="370" cy="276" r="4" />
      </svg>
    </aside>
  )
}
