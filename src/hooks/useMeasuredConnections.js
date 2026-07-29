import { useLayoutEffect, useState } from 'react'

function curveBetween(start, end) {
  const direction = Math.sign(end.x - start.x) || 1
  const control = Math.max(42, Math.abs(end.x - start.x) * 0.42)
  return `M ${start.x} ${start.y} C ${start.x + control * direction} ${start.y}, ${end.x - control * direction} ${end.y}, ${end.x} ${end.y}`
}

export default function useMeasuredConnections(containerRef, nodeRefs, pairs) {
  const [diagram, setDiagram] = useState({ width: 0, height: 0, paths: [] })

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    let animationFrame

    const measure = () => {
      const containerBounds = container.getBoundingClientRect()
      const width = container.clientWidth
      const height = container.clientHeight
      if (!containerBounds.width || !containerBounds.height || !width || !height) return

      const scaleX = containerBounds.width / width
      const scaleY = containerBounds.height / height

      const geometryFor = (id) => {
        const node = nodeRefs.current[id]
        if (!node) return null
        const bounds = node.getBoundingClientRect()
        return {
          left: (bounds.left - containerBounds.left) / scaleX,
          right: (bounds.right - containerBounds.left) / scaleX,
          centerX: (bounds.left - containerBounds.left + bounds.width / 2) / scaleX,
          centerY: (bounds.top - containerBounds.top + bounds.height / 2) / scaleY,
        }
      }

      const paths = pairs.flatMap(([sourceId, targetId]) => {
        const source = geometryFor(sourceId)
        const target = geometryFor(targetId)
        if (!source || !target) return []

        const flowsRight = target.centerX >= source.centerX
        const start = {
          x: flowsRight ? source.right : source.left,
          y: source.centerY,
        }
        const end = {
          x: flowsRight ? target.left : target.right,
          y: target.centerY,
        }

        return [{ id: `${sourceId}-${targetId}`, d: curveBetween(start, end) }]
      })

      setDiagram({ width, height, paths })
    }

    const scheduleMeasure = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(measure)
    }

    const resizeObserver = new ResizeObserver(scheduleMeasure)
    resizeObserver.observe(container)
    Object.values(nodeRefs.current).forEach((node) => node && resizeObserver.observe(node))
    document.fonts?.ready.then(scheduleMeasure)
    scheduleMeasure()

    return () => {
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
    }
  }, [containerRef, nodeRefs, pairs])

  return diagram
}
