import { useEffect, useState } from 'react'

const phrases = [
  'builds production AI.',
  'designs backend systems.',
  'turns research into products.',
  'ships dependable software.',
]

export default function TypingHeadline() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [characterIndex, setCharacterIndex] = useState(1)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setCharacterIndex(phrases[0].length)
      return undefined
    }

    const phrase = phrases[phraseIndex]
    let delay = deleting ? 52 : 96

    if (!deleting && characterIndex === phrase.length) delay = 1900

    const timeout = window.setTimeout(() => {
      if (!deleting && characterIndex < phrase.length) {
        setCharacterIndex((value) => value + 1)
        return
      }

      if (!deleting && characterIndex === phrase.length) {
        setDeleting(true)
        return
      }

      if (deleting && characterIndex > 1) {
        setCharacterIndex((value) => value - 1)
        return
      }

      const step = 1 + Math.floor(Math.random() * (phrases.length - 1))
      setPhraseIndex((value) => (value + step) % phrases.length)
      setCharacterIndex(1)
      setDeleting(false)
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [characterIndex, deleting, phraseIndex])

  const phrase = phrases[phraseIndex]

  return (
    <div
      className="typing-headline"
      aria-label="Hari Sankar builds production AI, backend systems, and dependable software."
    >
      <h1 aria-hidden="true">
        <span className="hero-name">Hari Sankar<span>.</span></span>
        <span className="typing-line">
          <span>{phrase.slice(0, characterIndex)}</span>
          <i />
        </span>
      </h1>
    </div>
  )
}
