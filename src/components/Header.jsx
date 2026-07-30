import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#projects' },
  { label: 'Résumé', href: '/hari-sankar-resume.md' },
]

export function Logo() {
  return (
    <a className="logo" href="#top" aria-label="S Hari Sankar, home">
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

  useEffect(() => {
    const sections = ['top', 'about', 'education', 'projects', 'experience', 'credentials']
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
        <Logo />
        <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
          {links.map((link, index) => (
            <a
              className={link.href === `#${activeSection}` ? 'is-active' : ''}
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              <span>0{index + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="nav-contact" href="#contact">
          <i aria-hidden="true" />
          Let&apos;s build <ArrowUpRight size={16} />
        </a>
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
