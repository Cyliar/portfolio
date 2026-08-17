import { useReducedMotion } from 'framer-motion'

interface Blob {
  className: string
  style: React.CSSProperties
}

/**
 * Trois halos colorés en mouvement lent derrière le contenu, plus une grille
 * ténue et un voile de grain. Purement décoratif, donc masqué aux lecteurs
 * d'écran et sans interception du pointeur.
 */
export default function Aurora() {
  const reduced = useReducedMotion()

  const blobs: Blob[] = [
    {
      className: reduced ? '' : 'animate-drift-slow',
      style: {
        top: '-18%',
        left: '-10%',
        width: '58vw',
        height: '58vw',
        background: 'radial-gradient(circle at 50% 50%, rgba(124,92,255,0.42), transparent 68%)',
      },
    },
    {
      className: reduced ? '' : 'animate-drift-slower',
      style: {
        top: '22%',
        right: '-16%',
        width: '52vw',
        height: '52vw',
        background: 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.30), transparent 68%)',
        animationDelay: '-9s',
      },
    },
    {
      className: reduced ? '' : 'animate-drift-slow',
      style: {
        bottom: '-14%',
        left: '18%',
        width: '46vw',
        height: '46vw',
        background: 'radial-gradient(circle at 50% 50%, rgba(244,114,182,0.22), transparent 70%)',
        animationDelay: '-17s',
      },
    },
  ]

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {blobs.map((blob, index) => (
        <div
          key={index}
          className={`absolute rounded-full blur-[90px] will-change-transform ${blob.className}`}
          style={blob.style}
        />
      ))}

      {/* Grille technique, très basse opacité : donne une assise au fond. */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, #000 30%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 70% at 50% 30%, #000 30%, transparent 78%)',
        }}
      />

      {/* Assombrit le bas de page pour détacher le contenu du fond. */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/40 to-void/85" />
    </div>
  )
}
