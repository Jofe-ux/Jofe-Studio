/** Monograma de Jofe Studio: "J" geométrica con una chispa naranja. Usa los colores del tema activo. */
export function Logo({ className = 'size-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect x="1.5" y="1.5" width="61" height="61" rx="15" className="fill-card stroke-line" strokeWidth="3" />
      <path
        d="M41 15v23a10.5 10.5 0 0 1-21 0"
        fill="none"
        className="stroke-accent"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="34.5" r="4.6" className="fill-spark" />
    </svg>
  )
}
