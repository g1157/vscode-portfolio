import Image from 'next/image';
import { VscGlobe, VscLinkExternal } from 'react-icons/vsc';

import { projectCategoryMeta } from '@/data/projects';
import { Project } from '@/types';

import styles from '@/styles/ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

const formatProjectHost = (link: string) => {
  try {
    return new URL(link).host.replace(/^www\./, '');
  } catch {
    return link;
  }
};

const getVisitLabel = (link: string) => {
  try {
    return new URL(link).host === 'github.com' ? 'Open repo' : 'Open site';
  } catch {
    return 'Open link';
  }
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const category = projectCategoryMeta[project.category];

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.content}>
        <div className={styles.cardHeader}>
          <div className={styles.logoWrapper}>
            <Image
              src={project.logo}
              alt={`${project.title} logo`}
              width={24}
              height={24}
              className={styles.logo}
            />
          </div>
          <span className={styles.category}>{category.label}</span>
        </div>

        <div className={styles.cardBody}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{project.title}</h3>
            <VscLinkExternal className={styles.externalIcon} />
          </div>
          <p className={styles.description}>{project.description}</p>
        </div>

        <div className={styles.cardFooter}>
          <span className={styles.host}>
            <VscGlobe className={styles.hostIcon} />
            {formatProjectHost(project.link)}
          </span>
          <span className={styles.visitLabel}>{getVisitLabel(project.link)}</span>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
