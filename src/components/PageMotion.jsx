import { useEffect, useRef } from 'react'

export default function PageMotion() {
  const progressRef = useRef(null)
  const auraRef = useRef(null)

  useEffect(() => {
    const progress = progressRef.current
    const aura = auraRef.current
    const finePointer = window.matchMedia('(pointer: fine)').matches
    let scrollFrame = 0
    let pointerFrame = 0

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const value = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0
      progress?.style.setProperty('--page-progress', value)
      scrollFrame = 0
    }

    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateProgress)
    }

    const onPointerMove = (event) => {
      if (!finePointer || !aura) return
      const { clientX, clientY } = event
      window.cancelAnimationFrame(pointerFrame)
      pointerFrame = window.requestAnimationFrame(() => {
        aura.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`
        aura.dataset.active = 'true'
      })
    }

    const hideAura = () => {
      if (aura) aura.dataset.active = 'false'
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', hideAura)

    return () => {
      window.cancelAnimationFrame(scrollFrame)
      window.cancelAnimationFrame(pointerFrame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('mouseleave', hideAura)
    }
  }, [])

  return (
    <>
      <div className="page-progress" ref={progressRef} aria-hidden="true">
        <span />
      </div>
      <div className="pointer-aura" ref={auraRef} aria-hidden="true" />
    </>
  )
}
