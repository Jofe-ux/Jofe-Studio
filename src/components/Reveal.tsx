import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  id?: string
  /** Retraso en ms para escalonar elementos hermanos. */
  delay?: number
}

/** Hace aparecer su contenido una vez al entrar en pantalla. */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties
  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`} data-in={shown} style={style}>
      {children}
    </Tag>
  )
}
