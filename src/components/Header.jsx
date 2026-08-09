import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BriefcaseBusiness, Code2, GraduationCap, Mail, Menu, UsersRound, X } from 'lucide-react'

const links = [
  { label: 'Profession', href: '#experience', icon: BriefcaseBusiness },
  { label: 'Projects', href: '#projects', icon: Code2 },
  { label: 'Education', href: '#education', icon: GraduationCap },
  { label: 'Collaboration', href: '#credentials', icon: UsersRound },
  { label: 'Reach me', href: '#contact', icon: Mail },
]

const getAnchorOffset = () => {
  if (window.matchMedia('(min-width: 1441px) and (min-height: 700px)').matches) return 28
  return (document.querySelector('.nav')?.getBoundingClientRect().bottom ?? 70) + 28
}

export function Logo({ href = '#top', onClick, active = false, ariaLabel = 'S Hari Sankar, home', anchorRef }) {
  return (
    <a ref={anchorRef} className={`logo ${active ? 'is-active' : ''}`} href={href} aria-label={ariaLabel} onClick={onClick}>
      <span className="logo-mark">HS</span>
      <span className="logo-copy">
        <strong>Hari Sankar</strong>
        <small>Software × AI</small>
      </span>
    </a>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [indicator, setIndicator] = useState({ x: 0, y: 0, width: 0, height: 0, visible: false })
  const navRef = useRef(null)
  const itemRefs = useRef(new Map())
  const activeNavItem = activeSection === 'top' || activeSection === 'about' ? 'identity' : activeSection

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  const scrollToSection = (event, href) => {
    if (!href.startsWith('#')) {
      setOpen(false)
      return
    }
    const section = document.querySelector(href)
    const heading = section?.querySelector('.stage-heading') ?? section
    if (!heading) return

    event.preventDefault()
    const top = window.scrollY + heading.getBoundingClientRect().top - getAnchorOffset()
    window.history.pushState(null, '', href)
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    setOpen(false)
  }

  useEffect(() => {
    const sections = ['top', 'about', 'experience', 'projects', 'education', 'credentials', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    let frame = 0
    const updateActiveSection = () => {
      frame = 0
      const marker = window.innerHeight * 0.32
      const atPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      let nextSection = sections[0]?.id ?? 'top'

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) nextSection = section.id
        else break
      }

      if (atPageEnd) nextSection = sections.at(-1)?.id ?? nextSection
      setActiveSection((current) => (current === nextSection ? current : nextSection))
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  useLayoutEffect(() => {
    const updateIndicator = () => {
      if (window.matchMedia('(max-width: 720px)').matches) {
        setIndicator((current) => ({ ...current, visible: false }))
        return
      }

      const nav = navRef.current
      const activeItem = itemRefs.current.get(activeNavItem)
      if (!nav || !activeItem) return

      const navBounds = nav.getBoundingClientRect()
      const itemBounds = activeItem.getBoundingClientRect()
      setIndicator({
        x: itemBounds.left - navBounds.left,
        y: itemBounds.top - navBounds.top,
        width: itemBounds.width,
        height: itemBounds.height,
        visible: true,
      })
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeNavItem, scrolled])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="shell nav" ref={navRef}>
        <span
          className={`nav-active-indicator ${indicator.visible ? 'is-visible' : ''}`}
          style={{
            '--indicator-x': `${indicator.x}px`,
            '--indicator-y': `${indicator.y}px`,
            '--indicator-width': `${indicator.width}px`,
            '--indicator-height': `${indicator.height}px`,
          }}
          aria-hidden="true"
        />
        <Logo
          href="#top"
          onClick={(event) => scrollToSection(event, '#top')}
          active={activeNavItem === 'identity'}
          anchorRef={(node) => itemRefs.current.set('identity', node)}
          ariaLabel="Introduction and about me"
        />
        <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <a
                className={link.href === `#${activeSection}` ? 'is-active' : ''}
                ref={(node) => itemRefs.current.set(link.href.slice(1), node)}
                key={link.label}
                href={link.href}
                aria-label={link.label}
                onClick={(event) => scrollToSection(event, link.href)}
              >
                <Icon className="nav-icon" size={17} strokeWidth={1.7} aria-hidden="true" />
                <span className="nav-label">{link.label}</span>
              </a>
            )
          })}
        </nav>
        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
