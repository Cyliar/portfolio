import { useRef, type MouseEvent } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import type { Project } from '../data/content'
import { useLang } from '../i18n/useLang'

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-40, 40], [6, -6])
  const rotateY = useTransform(x, [-40, 40], [-6, 6])

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set(event.clientX - rect.left - rect.width / 2)
    y.set(event.clientY - rect.top - rect.height / 2)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px -20px rgba(124,92,255,0.35)' }}
      className="grid grid-cols-1 gap-5 rounded-xl border border-glass-border bg-glass p-6 backdrop-blur-md sm:grid-cols-[1fr_108px]"
    >
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper-2">
          {t(project.label)}
        </div>
        <h3 className="mb-2 mt-2 font-display text-[19px] font-bold tracking-[-0.01em]">
          {t(project.title)}
        </h3>
        <p className="max-w-[52ch] text-[14.5px] text-paper-2">{t(project.description)}</p>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-glass-border bg-ink-2/60 px-2.5 py-1 font-mono text-[11px] text-paper-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox="0 0 108 34" className="h-[34px] w-[108px] self-start sm:w-full" aria-hidden="true">
        <polyline points="0,17 108,17" fill="none" stroke="#8B93B8" strokeWidth={1} strokeDasharray="2 3" />
        <polyline
          points={project.sparkPoints}
          fill="none"
          stroke="#7C5CFF"
          strokeWidth={1.6}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </motion.article>
  )
}
