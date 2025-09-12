import React, { useState } from 'react';
import '../styles/projeler.css';
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Projeler() {
  const { t } = useTranslation();

    const projects = [
    {
      title: t("projects.project1.title"),
      start: t("projects.project1.startTime"),
      end: t("projects.project1.endTime"),
      desc: t("projects.project1.desc"),
      images: [
        "/besevlerProjesi/1.jpg",
        "/besevlerProjesi/2.jpeg",
        "/besevlerProjesi/3.jpg",
        "/besevlerProjesi/4.jpeg",
      ]
    },
    {
      title: t("projects.project2.title"),
      start: t("projects.project2.startTime"),
      end: t("projects.project2.endTime"),
      desc: t("projects.project2.desc"),
      images: [
        "/endustriyelTarim/1.jpeg",
        "/endustriyelTarim/2.jpeg",
        "/endustriyelTarim/3.jpeg",
        "/endustriyelTarim/4.jpeg",
      ]
    }
  ];

  return (
    <main className="page-projeler">
      <section className="container" style={{paddingTop:'2.2rem'}}>
        <h2>{t("projects.projects")}</h2>
        <div className="projects">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </div>
      </section>
    </main>
  );

  function ProjectCard({ project }) {
  const [index, setIndex] = useState(0);
  const imagesToShow = project.images.slice(0, 4);

  const prevImage = () => setIndex((index - 1 + imagesToShow.length) % imagesToShow.length);
  const nextImage = () => setIndex((index + 1) % imagesToShow.length);

  return (
    <article className="project-card card">
      <h3>{project.title}</h3>
      <p><strong>Başlangıç:</strong> {project.start}</p>
      <p><strong>Bitiş:</strong> {project.end}</p>
      <p>{project.desc}</p>

      <div className="project-images">
        <div className="images-row">
          {imagesToShow.map((img, i) => (
            <img
              key={i}
              src={imagesToShow[(index + i) % imagesToShow.length]}
              alt={`${project.title} görsel ${i+1}`}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
}
