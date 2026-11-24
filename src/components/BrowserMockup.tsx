import { Construction } from 'lucide-react'

interface Props {
  /** Si no hay imagen se muestra el placeholder. */
  src?: string
  alt: string
  /** Texto de la barra de direcciones (dominio). */
  address?: string
  /** El placeholder se presenta como "en construcción". */
  construction?: boolean
  name: string
  priority?: boolean
}

/** Marco tipo navegador con la captura real; si no existe, placeholder reemplazable. */
export function BrowserMockup({ src, alt, address, construction = false, name, priority = false }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-bg-2 shadow-[0_20px_40px_-24px_rgb(0_0_0/0.9)]">
      <div className="flex items-center gap-3 border-b border-line bg-card px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="size-2.5 rounded-full bg-fg-3/40" />
          <i className="size-2.5 rounded-full bg-fg-3/40" />
          <i className="size-2.5 rounded-full bg-fg-3/40" />
        </span>
        <span className="mono-label min-w-0 flex-1 truncate rounded bg-bg/70 px-3 py-1 text-center text-[0.65rem] tracking-normal text-fg-3 normal-case">
          {address ?? 'en construcción'}
        </span>
      </div>

      <div className="relative aspect-[16/10] w-full">
        {src ? (
          <img
            src={src}
            alt={alt}
            width={1440}
            height={900}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="size-full object-cover object-top"
          />
        ) : (
          <div role="img" aria-label={alt} className={`hatch grid size-full place-items-center ${construction ? '' : 'opacity-80'}`}>
            <div className="flex flex-col items-center gap-3 px-6 text-center">
              <span className="grid size-12 place-items-center rounded-lg border border-dashed border-wip/60 bg-bg/70 text-wip">
                <Construction className="size-6" aria-hidden="true" />
              </span>
              <span className="text-xl font-bold tracking-tight text-fg">{name}</span>
              <span className="mono-label text-fg-3">{construction ? 'Vista previa en construcción' : 'Captura pendiente'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
