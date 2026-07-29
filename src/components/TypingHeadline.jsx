import { useEffect, useState } from 'react'

const phrases = [
  'Hello, world —\nfrom Hari.',
  'class\nHariSankar {}',
  'def\nhari_sankar():',
  'func\nHariSankar() {}',
  '<h1>\nHari Sankar</h1>',
  '# Hello from\nHari Sankar',
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
    <div className="typing-headline" aria-label="S Hari Sankar, software and AI engineer">
      <h1>
        <span>{phrase.slice(0, characterIndex)}</span>
        <i aria-hidden="true" />
      </h1>
    </div>
  )
}
