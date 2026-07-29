import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Résumé', href: '/hari-sankar-resume.md' },
]

export function Logo() {
  return (
    <a className="logo" href="#top" aria-label="S Hari Sankar, home">
      H<span />S
    </a>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="shell nav">
        <Logo />
        <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="nav-contact" href="#contact">
          Let&apos;s talk <ArrowUpRight size={16} />
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
