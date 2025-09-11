import React from 'react';
import '../styles/projeler.css';
import { useTranslation } from "react-i18next";

export default function Projeler() {
  const { t } = useTranslation();

  const list = [
    { title: t("projects.listTitle1"), desc: t("projects.listDescription1") },
    { title: t("projects.listTitle2"), desc: t("projects.listDescription2") },
  ];
  return (
    <main className="page-projeler">
      <section className="container" style={{paddingTop:'2.2rem'}}>
        <h2>{t("projects.projects")}</h2>
        <div className="projects">
          {list.map((p, i) => (
            <article key={i} className="project-card card">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
