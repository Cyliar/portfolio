import { content } from '../data/content'
import ProjectCard from './ProjectCard'
import Section from './Section'

export default function Projects() {
  return (
    <Section
      id="projects"
      index="02"
      kicker={{ fr: 'Sélection', en: 'Selected work' }}
      title={{ fr: 'Projets', en: 'Projects' }}
    >
      <div className="grid gap-4 nav:grid-cols-2 nav:gap-5">
        {content.projects.map((project, index) => (
          <div
            key={project.title.fr}
            // Le dernier projet occupe toute la largeur quand le compte est impair.
            className={
              index === content.projects.length - 1 && content.projects.length % 2 === 1
                ? 'nav:col-span-2'
                : undefined
            }
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </Section>
  )
}
