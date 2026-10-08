import { useEffect, useState } from 'react'

// True while the page is scrolled further down than `offset` pixels.
export function useScrolledPast(offset) {
  const [isPast, setIsPast] = useState(false)

  useEffect(() => {
    const update = () => setIsPast(window.scrollY > offset)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [offset])

  return isPast
}
