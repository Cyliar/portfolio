import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const { t } = useLang()

  return (
    <section id="projets" className="border-t border-glass-border py-16 md:py-20">
      <p className="mb-5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-signal">
        02 — {t({ fr: 'Projets', en: 'Projects' })}
      </p>
      <h2 className="mb-7 font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em]">
        {t({ fr: "Ce que j'ai construit", en: "What I've built" })}
      </h2>

      <div className="grid gap-4">
        {content.projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
