import { useEffect, useRef, useState } from 'react'
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from 'lucide-react'
import { profile } from '../data/portfolio'
import { Logo } from './Header'

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const buttonRef = useRef(null)
  const timeoutRef = useRef(null)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current)
  }, [])

  return (
    <footer className="footer" id="contact">
      <div className="shell footer-shell" data-reveal>
        <div className="footer-contact-grid">
          <div className="footer-lead">
            <p className="footer-eyebrow">Contact</p>

            <h2 className="footer-headline">
              Want to <span>build</span>
              <br />
              <em>something together?</em>
            </h2>

            <p className="footer-intro">
              I am open to collaborating on thoughtful software, backend systems, data products, and applied AI work.
            </p>

            <div className="footer-actions">
              <a
                ref={buttonRef}
                className="catchy-contact-btn"
                href={`mailto:${profile.email}`}
                onMouseMove={handleMouseMove}
                style={{
                  '--mouse-x': `${mousePos.x}px`,
                  '--mouse-y': `${mousePos.y}px`,
                }}
              >
                <span className="btn-beam" aria-hidden="true" />
                <span className="btn-surface">
                  <span className="btn-glow-follower" aria-hidden="true" />
                  <span className="btn-icon-wrap">
                    <Mail className="btn-icon-mail" size={18} />
                    <Send className="btn-icon-send" size={16} />
                  </span>
                  <span className="btn-label">Send an email</span>
                  <span className="btn-arrow-badge">
                    <ArrowUpRight size={15} />
                  </span>
                </span>
              </a>

              <button
                className={`creative-copy-pill ${copied ? 'is-copied' : ''}`}
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                <span className="copy-pill-indicator">
                  {copied ? <Check size={16} className="check-icon" /> : <Copy size={16} />}
                </span>
                <span className="copy-pill-text">
                  {copied ? 'Email copied!' : profile.email}
                </span>
                {copied && <span className="copy-pill-ripple" aria-hidden="true" />}
              </button>
            </div>
          </div>

          <aside className="contact-signal" aria-label="A playful network handshake inviting the visitor to start a conversation">
            <span className="contact-signal-status"><i aria-hidden="true" /> Channel open</span>

            <div className="network-handshake" aria-hidden="true">
              <div className="handshake-endpoint handshake-you">
                <span className="handshake-avatar">You</span>
                <small>Your side of the wire</small>
                <strong>
                  Got a spark? <span className="endpoint-emoji">💡</span>
                </strong>
                <p>An idea · a challenge · a wild maybe</p>
              </div>

              <div className="handshake-channel">
                <div className="handshake-packet packet-outbound">
                  <span>SYN</span>
                  <strong>Hey Hari—got a thought <span className="packet-emoji">💡</span></strong>
                  <i aria-hidden="true">→</i>
                </div>
                <div className="handshake-packet packet-inbound">
                  <i aria-hidden="true">←</i>
                  <span>SYN–ACK</span>
                  <strong>I’m all ears <span className="packet-emoji">👀</span></strong>
                </div>
                <div className="handshake-packet packet-outbound packet-final">
                  <span>ACK</span>
                  <strong>So here it goes ..... <span className="packet-emoji">🚀</span></strong>
                  <i aria-hidden="true">→</i>
                </div>
              </div>

              <div className="handshake-endpoint handshake-hari">
                <span className="handshake-avatar">HS</span>
                <small>On the other end</small>
                <strong>Let’s make it<br />click. <span className="endpoint-emoji">✨</span></strong>
                <p>Listen · explore · build</p>
              </div>
            </div>

            <p className="contact-signal-note"><span aria-hidden="true">↳</span> No perfect brief needed—just send the first packet.</p>
          </aside>
        </div>

        {/* Clean Modern Bottom Bar */}
        <div className="footer-bottom">
          <Logo />

          <div className="footer-links">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="footer-link-item"
            >
              <Github size={15} />
              <span>GitHub</span>
              <ArrowUpRight size={12} className="link-ext" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="footer-link-item"
            >
              <Linkedin size={15} />
              <span>LinkedIn</span>
              <ArrowUpRight size={12} className="link-ext" />
            </a>
            <span className="footer-location-item">
              <MapPin size={15} />
              <span>{profile.location}</span>
            </span>
          </div>

          <div className="footer-bottom-end">
            <button
              type="button"
              className="footer-back-to-top"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp size={13} />
            </button>
            <small>© {new Date().getFullYear()} {profile.name}</small>
          </div>
        </div>
      </div>
    </footer>
  )
}
