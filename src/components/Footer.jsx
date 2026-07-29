import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { profile } from '../data/portfolio'
import { Logo } from './Header'

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(null)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  return (
    <footer className="footer" id="contact">
      <div className="shell" data-reveal>
        <p className="eyebrow">Contact</p>
        <h2>
          Interested in working
          <br />
          <em>together?</em>
        </h2>
        <p className="footer-intro">
          For software engineering, backend systems, data, or applied AI work, feel free to reach out.
        </p>
        <div className="footer-actions">
          <a className="button button-dark" href={`mailto:${profile.email}`}>
            <Mail size={18} /> Send an email <ArrowUpRight size={16} />
          </a>
          <button className="copy-email" type="button" onClick={copyEmail}>
            {copied ? <Check size={17} /> : <Copy size={17} />}
            {copied ? 'Email copied' : profile.email}
          </button>
        </div>

        <div className="footer-bottom">
          <Logo />
          <div className="footer-links">
            <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} />GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} />LinkedIn</a>
            <span><MapPin size={17} />{profile.location}</span>
          </div>
          <small>© {new Date().getFullYear()} {profile.name}</small>
        </div>
      </div>
    </footer>
  )
}
