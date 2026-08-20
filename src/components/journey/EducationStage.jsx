import { Fragment, useEffect, useRef, useState } from 'react'
import { ArrowRight, BrainCircuit, ChevronLeft, ChevronRight, GraduationCap, Medal } from 'lucide-react'
import { education } from '../../data/portfolio'
import { StageHeading } from './Stage'

const educationCards = [
  {
    label: 'Degree',
    shortLabel: 'Degree',
    title: education.degree,
    copy: education.university,
    detail: education.period,
    Icon: GraduationCap,
  },
  {
    label: 'Specialization',
    shortLabel: 'AI & ML',
    title: education.specialization,
    copy: 'Computer Science',
    Icon: BrainCircuit,
  },
  {
    label: 'Academic recognition',
    shortLabel: 'Silver medal',
    title: 'Silver Medal',
    copy: 'Academic Excellence',
    Icon: Medal,
    isAward: true,
  },
]

export default function EducationStage() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasOverflow, setHasOverflow] = useState(false)
  const carouselRef = useRef(null)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)

  const updateScrollState = () => {
    const el = carouselRef.current
    if (!el) return

    const isOverflowing = el.scrollWidth > el.clientWidth + 1
    setHasOverflow(isOverflowing)
    if (!isOverflowing) return

    const cards = el.querySelectorAll('.education-card')
    const frameRect = el.getBoundingClientRect()
    const frameCenter = frameRect.left + frameRect.width / 2
    let closestIndex = 0
    let closestDistance = Infinity

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect()
      const distance = Math.abs(cardRect.left + cardRect.width / 2 - frameCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex(closestIndex)
  }

  useEffect(() => {
    const el = carouselRef.current
    const queue = el?.querySelector('.education-carousel-queue')
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
    const card = el?.querySelectorAll('.education-card')[index]
    if (!el || !card) return

    setActiveIndex(index)
    const frameRect = el.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    const targetLeft = el.scrollLeft + cardRect.left + cardRect.width / 2 - frameRect.left - frameRect.width / 2
    el.scrollTo({ left: targetLeft, behavior: 'smooth' })
  }

  const handleMouseDown = (event) => {
    const el = carouselRef.current
    if (!el) return
    isDraggingRef.current = true
    startXRef.current = event.pageX - el.offsetLeft
    scrollLeftRef.current = el.scrollLeft
  }

  const handleMouseMove = (event) => {
    const el = carouselRef.current
    if (!el || !isDraggingRef.current) return
    const currentX = event.pageX - el.offsetLeft
    el.scrollLeft = scrollLeftRef.current - (currentX - startXRef.current) * 1.3
  }

  const stopDragging = () => {
    isDraggingRef.current = false
  }

  return (
    <>
      <div className="career-stage-header education-stage-header">
        <StageHeading
          kicker="Education / Foundation"
          title="Education and"
          accent="recognition."
          description="A computer-science degree, an AI and machine-learning specialization, and a Silver Medal for Academic Excellence."
        />

        {hasOverflow && (
          <div className="career-carousel-controls" aria-label="Education carousel navigation">
            <button
              type="button"
              className="career-nav-btn"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous education card"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <div className="career-step-list" role="group" aria-label="Select an education card">
              {educationCards.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  className={`career-step ${activeIndex === index ? 'is-active' : ''}`}
                  onClick={() => scrollToIndex(index)}
                  aria-label={`${String(index + 1).padStart(2, '0')}: ${item.title}`}
                  aria-current={activeIndex === index ? 'step' : undefined}
                  title={item.title}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="career-nav-btn"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === educationCards.length - 1}
              aria-label="Next education card"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>
        )}
      </div>

      <section
        className="education-simple education-carousel-section"
        data-reveal
        aria-label="Education and academic recognition"
      >
        <div
          className="career-carousel-frame education-carousel-frame"
          ref={carouselRef}
          onScroll={updateScrollState}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
        >
          <div className="education-carousel-queue">
            {educationCards.map((item, index) => {
              const isLinked = hoveredLink === index || hoveredLink === index - 1
              const Icon = item.Icon

              return (
                <Fragment key={item.label}>
                  <article
                    className={`education-card ${item.isAward ? 'education-card-award' : ''} ${isLinked ? 'is-linked' : ''}`}
                    tabIndex="0"
                    aria-label={item.isAward ? 'Silver Medal for Academic Excellence' : undefined}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onFocus={() => setHoveredCard(index)}
                    onBlur={() => setHoveredCard(null)}
                  >
                    {item.isAward ? (
                      <>
                        <div className="award-copy">
                          <span className="award-icon"><Icon size={29} strokeWidth={1.6} /></span>
                          <small>{item.label}</small>
                          <h3>{item.title}</h3>
                          <p>{item.copy}</p>
                        </div>
                        <div className="award-medal" aria-hidden="true">
                          <span className="award-ribbon award-ribbon-left" />
                          <span className="award-ribbon award-ribbon-right" />
                          <span className="award-medal-ring">
                            <span className="award-medal-face">
                              <Medal size={34} strokeWidth={1.35} />
                              <b>EXCELLENCE</b>
                            </span>
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span><Icon size={27} strokeWidth={1.6} /></span>
                        <small>{item.label}</small>
                        <h3>{item.title}</h3>
                        <p>{item.copy}</p>
                        {item.detail && <i>{item.detail}</i>}
                      </>
                    )}
                  </article>

                  {index < educationCards.length - 1 && (
                    <button
                      type="button"
                      className={`career-queue-link education-queue-link ${
                        hoveredCard === index || hoveredCard === index + 1 ? 'is-card-adjacent' : ''
                      } ${hoveredLink === index ? 'is-hovered' : ''}`}
                      data-link-index={index}
                      aria-label={`Show next education card: ${educationCards[index + 1].title}`}
                      onClick={() => scrollToIndex(index + 1)}
                      onMouseEnter={() => setHoveredLink(index)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <div className="career-neural-edge">
                        <span className="career-edge-line" />
                        <span className="career-data-cube cube-1" />
                        <span className="career-data-cube cube-2" />
                        <span className="career-data-cube cube-3" />
                      </div>
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

        <div className="career-carousel-pagination education-carousel-pagination" aria-label="Education card navigation">
          {educationCards.map((item, index) => (
            <button
              key={`education-dot-${item.label}`}
              type="button"
              className={`career-pagination-dot ${hoveredCard === index ? 'is-card-hovered' : ''}`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Jump to ${item.title}`}
              aria-current={activeIndex === index ? 'true' : undefined}
            >
              <span className="dot-pill" />
              <span className="dot-name">{item.shortLabel}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  )
}
