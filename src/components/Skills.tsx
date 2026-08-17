import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'
import Section from './Section'

/**
 * Grille bento : le premier groupe, le plus fourni, occupe deux colonnes ;
 * les suivants remplissent le reste.
 */
export default function Skills() {
  const { t } = useLang()

  return (
    <Section
      id="skills"
      index="04"
      kicker={{ fr: 'Boîte à outils', en: 'Toolbox' }}
      title={{ fr: 'Compétences', en: 'Skills' }}
    >
      {/* items-start : chaque carte prend sa hauteur propre, sans s'étirer sur
          la plus haute de sa ligne — c'est ce qui donne l'aspect bento. */}
      <div className="grid items-start gap-4 nav:grid-cols-3">
        {content.skills.map((group, index) => (
          <motion.div
            key={group.title.fr}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className={`glass rounded-2xl p-6 ${index === 0 ? 'nav:col-span-2' : ''}`}
          >
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan/80">
              {t(group.title)}
            </h3>

            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item.fr}
                  className="rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 text-[13px] text-text transition-colors hover:border-violet/50 hover:bg-violet/[0.08]"
                >
                  {t(item)}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
