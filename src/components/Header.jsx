import { useEffect, useState } from 'react'
import { BriefcaseBusiness, FolderKanban, GraduationCap, Handshake, Menu, Send, X } from 'lucide-react'

const links = [
  { label: 'Profession', href: '#experience', icon: BriefcaseBusiness },
  { label: 'Projects', href: '#projects', icon: FolderKanban },
  { label: 'Education', href: '#education', icon: GraduationCap },
  { label: 'Collaboration', href: '#credentials', icon: Handshake },
  { label: 'Reach me', href: '#contact', icon: Send },
]

const getAnchorOffset = () => {
  const isMobileNav = window.matchMedia('(max-width: 720px)').matches
  if (!isMobileNav) return 28
  return (document.querySelector('.nav')?.getBoundingClientRect().height ?? 70) + 28
}

export function Logo({ href = '#top', onClick, active = false, ariaLabel = 'S Hari Sankar, home' }) {
  return (
    <a className={`logo ${active ? 'is-active' : ''}`} href={href} aria-label={ariaLabel} onClick={onClick}>
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

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-20% 0px -58%', threshold: [0.05, 0.2, 0.45] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="shell nav">
        <Logo
          href="#top"
          onClick={(event) => scrollToSection(event, '#top')}
          active={activeSection === 'top'}
          ariaLabel="Back to top"
        />
        <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <a
                className={link.href === `#${activeSection}` ? 'is-active' : ''}
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
