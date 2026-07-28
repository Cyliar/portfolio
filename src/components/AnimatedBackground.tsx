import { motion, useReducedMotion } from 'framer-motion'

const blobs = [
  { className: 'bg-signal/30 w-[420px] h-[420px] -top-32 -right-24', duration: 22 },
  { className: 'bg-pulse/25 w-[380px] h-[380px] top-1/3 -left-32', duration: 26 },
  { className: 'bg-ink-3 w-[320px] h-[320px] bottom-0 right-1/4', duration: 30 },
]

export default function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-ink via-ink-2 to-ink-3">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          animate={
            prefersReducedMotion ? undefined : { x: [0, 30, -20, 0], y: [0, -20, 30, 0] }
          }
          transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
