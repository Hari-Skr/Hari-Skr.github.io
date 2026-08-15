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
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const itemRefs = useRef(new Map())
  const activeNavItem = activeSection === 'top' || activeSection === 'about' ? 'identity' : activeSection

  useEffect(() => {
    if (!open) return undefined

    const menu = menuRef.current
    const focusableItems = [...(menu?.querySelectorAll('a[href]') ?? [])]

    focusableItems[0]?.focus({ preventScroll: true })

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus({ preventScroll: true })
        return
      }

      if (event.key !== 'Tab' || focusableItems.length === 0) return
      const firstItem = focusableItems[0]
      const lastItem = focusableItems.at(-1)

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault()
        lastItem.focus()
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault()
        firstItem.focus()
      }
    }

    const closeAtDesktop = (event) => {
      if (event.matches) setOpen(false)
    }

    const desktopQuery = window.matchMedia('(min-width: 721px)')

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    desktopQuery.addEventListener('change', closeAtDesktop)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      desktopQuery.removeEventListener('change', closeAtDesktop)
    }
  }, [open])

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
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-menu-open' : ''}`}>
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
        <nav
          ref={menuRef}
          id="primary-navigation"
          className={open ? 'nav-links is-open' : 'nav-links'}
          aria-label="Primary navigation"
        >
          <div className="nav-sheet-heading" aria-hidden="true">
            <span>Portfolio index</span>
            <small>Jump to a signal</small>
          </div>
          {links.map((link, index) => {
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
                <small className="nav-index" aria-hidden="true">0{index + 1}</small>
              </a>
            )
          })}
          <p className="nav-sheet-status"><i /> Available for thoughtful engineering work</p>
        </nav>
        {open && (
          <button
            className="nav-scrim"
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          />
        )}
        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
