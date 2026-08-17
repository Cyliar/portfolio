import { useRef, useState, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '../data/content'
import { useLang } from '../i18n/useLang'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useLang()
  const cardRef = useRef<HTMLElement>(null)
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false })

  // Position du curseur en pourcentage de la carte, pour y ancrer la lueur.
  function handleMove(event: MouseEvent<HTMLElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setGlow({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
      on: true,
    })
  }

  const gradientId = `spark-${index}`

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, on: false }))}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-line-strong nav:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: glow.on ? 1 : 0,
          background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, rgba(124,92,255,0.16), transparent 68%)`,
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan/80">
          {t(project.label)}
        </span>
        <span className="font-mono text-[11px] text-muted-2">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="relative mt-4 font-display text-xl font-semibold leading-snug text-text nav:text-[1.4rem]">
        {t(project.title)}
      </h3>

      <p className="relative mt-3 text-[14.5px] leading-relaxed text-muted">
        {t(project.description)}
      </p>

      {/* Bloc de pied, poussé en bas pour aligner les cartes entre elles. */}
      <div className="relative mt-auto pt-6">
        {/* Mini-graphique : évoque la forme du signal traité par le projet. */}
        <svg aria-hidden viewBox="0 0 108 36" preserveAspectRatio="none" className="h-14 w-full">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#7C5CFF" />
              <stop offset="1" stopColor="#22D3EE" />
            </linearGradient>
            <linearGradient id={`${gradientId}-fill`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7C5CFF" stopOpacity="0.28" />
              <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Aire sous la courbe : la polyligne refermée sur le bas du cadre. */}
          <polygon
            points={`0,36 ${project.sparkPoints} 108,36`}
            fill={`url(#${gradientId}-fill)`}
          />
          <polyline
            points={project.sparkPoints}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted transition-colors group-hover:border-line-strong"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}
