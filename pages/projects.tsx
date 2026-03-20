import { useMemo, useState } from 'react';

import ProjectCard from '@/components/ProjectCard';
import {
  projectCategoryMeta,
  projectCategoryOrder,
  projects,
} from '@/data/projects';
import { ProjectCategory } from '@/types';

import styles from '@/styles/ProjectsPage.module.css';

type ProjectFilter = ProjectCategory | 'all';

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectFilter>('all');

  const groupedProjects = useMemo(
    () =>
      projectCategoryOrder
        .map((category) => ({
          key: category,
          ...projectCategoryMeta[category],
          projects: projects.filter(
            (project) =>
              project.category === category &&
              (activeCategory === 'all' || project.category === activeCategory)
          ),
        }))
        .filter((group) => group.projects.length > 0),
    [activeCategory]
  );

  return (
    <div className={styles.layout}>
      <div className={styles.pageHeading}>
        <h1 className={styles.pageTitle}>Projects &amp; Services</h1>
        <p className={styles.pageSubtitle}>
          按用途整理当前常用的项目、站点与服务入口，支持按类别快速筛选。
        </p>

        <div className={styles.filters}>
          <button
            type="button"
            aria-pressed={activeCategory === 'all'}
            className={`${styles.filterButton} ${
              activeCategory === 'all' ? styles.filterActive : ''
            }`}
            onClick={() => setActiveCategory('all')}
          >
            全部
            <span className={styles.filterCount}>{projects.length}</span>
          </button>

          {projectCategoryOrder.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              className={`${styles.filterButton} ${
                activeCategory === category ? styles.filterActive : ''
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {projectCategoryMeta[category].label}
              <span className={styles.filterCount}>
                {
                  projects.filter((project) => project.category === category)
                    .length
                }
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.sectionList}>
        {groupedProjects.map((group) => (
          <section key={group.key} className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>{group.label}</h2>
                <p className={styles.sectionDescription}>{group.description}</p>
              </div>
              <span className={styles.sectionCount}>
                {group.projects.length} items
              </span>
            </div>

            <div className={styles.container}>
              {group.projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Projects' },
  };
}

export default ProjectsPage;
