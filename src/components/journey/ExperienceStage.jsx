import { Fragment, useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Globe2 } from 'lucide-react'
import { experience } from '../../data/portfolio'
import { StageHeading } from './Stage'

export default function ExperienceStage() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasOverflow, setHasOverflow] = useState(false)

  const carouselRef = useRef(null)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const hasDraggedRef = useRef(false)

  const updateScrollState = () => {
    const el = carouselRef.current
    if (!el) return

    const isOverflowing = el.scrollWidth > el.clientWidth + 1
    setHasOverflow(isOverflowing)

    // A fully visible row does not need scroll-derived selection state.
    if (!isOverflowing) return

    const cardNodes = el.querySelectorAll('.career-role')
    if (cardNodes.length > 0) {
      let closestIndex = 0
      let minDistance = Infinity
      const containerRect = el.getBoundingClientRect()
      const containerCenter = containerRect.left + containerRect.width / 2

      cardNodes.forEach((node, idx) => {
        const nodeRect = node.getBoundingClientRect()
        const nodeCenter = nodeRect.left + nodeRect.width / 2
        const distance = Math.abs(nodeCenter - containerCenter)
        if (distance < minDistance) {
          minDistance = distance
          closestIndex = idx
        }
      })
      setActiveIndex(closestIndex)
    }
  }

  useEffect(() => {
    const el = carouselRef.current
    const queue = el?.querySelector('.career-queue')
    const resizeObserver = new ResizeObserver(updateScrollState)

    updateScrollState()
    if (el) resizeObserver.observe(el)
    if (queue) resizeObserver.observe(queue)
    window.addEventListener('resize', updateScrollState)
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  const scrollToIndex = (index) => {
    const el = carouselRef.current
    if (!el) return
    const cardNodes = el.querySelectorAll('.career-role')
    const card = cardNodes[index]
    if (!card) return

    setActiveIndex(index)
    const frameRect = el.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    const targetLeft = el.scrollLeft + cardRect.left + cardRect.width / 2 - frameRect.left - frameRect.width / 2
    el.scrollTo({ left: targetLeft, behavior: 'smooth' })
  }

  const handleMouseDown = (e) => {
    const el = carouselRef.current
    if (!el) return
    isDraggingRef.current = true
    hasDraggedRef.current = false
    startXRef.current = e.pageX - el.offsetLeft
    scrollLeftRef.current = el.scrollLeft
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return
    const el = carouselRef.current
    if (!el) return
    const x = e.pageX - el.offsetLeft
    const walk = (x - startXRef.current) * 1.3
    if (Math.abs(walk) > 4) {
      hasDraggedRef.current = true
    }
    el.scrollLeft = scrollLeftRef.current - walk
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  const handleCardClick = (e) => {
    if (hasDraggedRef.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <>
      <div className="career-stage-header">
        <StageHeading
          kicker="Experience / Sequence"
          title="Professional"
          accent="Progression"
          description="My professional journeys"
        />

        {experience.length > 1 && hasOverflow && (
          <div className="career-carousel-controls" aria-label="Carousel navigation">
            <button
              type="button"
              className="career-nav-btn"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous role"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <div className="career-step-list" role="group" aria-label="Select an experience">
              {experience.map((item, index) => (
                <button
                  key={`step-${item.company}-${item.period}`}
                  type="button"
                  className={`career-step ${activeIndex === index ? 'is-active' : ''}`}
                  onClick={() => scrollToIndex(index)}
                  aria-label={`${String(index + 1).padStart(2, '0')}: ${item.role} at ${item.company}`}
                  aria-current={activeIndex === index ? 'step' : undefined}
                  title={`${item.role} at ${item.company}`}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="career-nav-btn"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === experience.length - 1}
              aria-label="Next role"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>
        )}
      </div>

      <section className="career-timeline career-carousel-section" data-reveal aria-label="Professional experience">
        <div
          className="career-carousel-frame"
          ref={carouselRef}
          onScroll={updateScrollState}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="career-queue">
            {experience.map((item, index) => {
              const isSourceOfHoveredLink = hoveredLink !== null && hoveredLink === index
              const isTargetOfHoveredLink = hoveredLink !== null && hoveredLink === index - 1
              const isCardLinked = isSourceOfHoveredLink || isTargetOfHoveredLink

              return (
                <Fragment key={`${item.company}-${item.period}`}>
                  <a
                    className={`career-role ${isCardLinked ? 'is-linked' : ''} ${activeIndex === index ? 'is-in-view' : ''}`}
                    href={item.website}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit ${item.company} website`}
                    onClick={handleCardClick}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onFocus={() => setHoveredCard(index)}
                    onBlur={() => setHoveredCard(null)}
                  >
                    <span
                      className="career-node company-logo"
                      style={{
                        '--logo-width': `${item.logo.width}px`,
                        '--logo-height': `${item.logo.height}px`,
                      }}
                    >
                      <img src={item.logo.src} alt="" />
                    </span>
                    <span className="career-period">{item.period}</span>
                    <h3>{item.role}</h3>
                    <strong>{item.company}</strong>
                    <div className="company-meta">
                      <span className="company-site">
                        <Globe2 size={13} aria-hidden="true" />
                        Click the card to visit {item.company}
                        <ExternalLink size={11} aria-hidden="true" />
                      </span>
                    </div>
                    <p>{item.summary}</p>
                  </a>
                  {index < experience.length - 1 && (
                    <button
                      type="button"
                      className={`career-queue-link ${
                        hoveredCard === index || hoveredCard === index + 1 ? 'is-card-adjacent' : ''
                      } ${hoveredCard === index ? 'is-source-active' : ''} ${
                        hoveredCard === index + 1 ? 'is-target-active' : ''
                      } ${hoveredLink === index ? 'is-hovered' : ''}`}
                      data-link-index={index}
                      aria-label={`Show next role: ${experience[index + 1].role}`}
                      onClick={() => scrollToIndex(index + 1)}
                      onMouseEnter={() => setHoveredLink(index)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {/* Neural network style edge line with traveling data cubes */}
                      <div className="career-neural-edge">
                        <span className="career-edge-line" />
                        <span className="career-data-cube cube-1" />
                        <span className="career-data-cube cube-2" />
                        <span className="career-data-cube cube-3" />
                      </div>

                      {/* Clean Arrow inside circle */}
                      <div className="career-arrow-badge">
                        <ArrowRight className="career-arrow-icon" size={17} strokeWidth={2} />
                      </div>
                    </button>
                  )}
                </Fragment>
              )
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        {experience.length > 1 && (
          <div className="career-carousel-pagination" aria-label="Role quick jump navigation">
            {experience.map((item, index) => (
              <button
                key={`dot-${item.company}-${item.period}`}
                type="button"
                className={`career-pagination-dot ${hoveredCard === index ? 'is-card-hovered' : ''}`}
                onClick={() => scrollToIndex(index)}
                aria-label={`Jump to ${item.role} at ${item.company}`}
                aria-current={activeIndex === index ? 'true' : undefined}
              >
                <span className="dot-pill" />
                <span className="dot-name">{item.company.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
