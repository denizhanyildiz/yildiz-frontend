import React from 'react';
import Seo from '../components/Seo.jsx';
import '../styles/bizkimiz.css';
import { useTranslation } from "react-i18next";

export default function BizKimiz() {
  const { t } = useTranslation();
  const stats = [
    { k: '+20', v: t("about.doneProjects") },
    { k: '10+', v: t("about.experiencedTeam") },
    { k: '%98', v: t("about.delivery") },
    { k: '7/24', v: t("about.support") },
  ];

  return (
    <main className="page-bizkimiz">
      <Seo title={t("about.title")} />
      <section className="container section">
        <div className="about card">
          <h2 className="section-title">{t("about.title")}</h2>
          <p className="lead">{t("about.description")}</p>
          <div className="stats">
            {stats.map((s, i) => (
              <div key={i} className="stat">
                <strong>{s.k}</strong>
                <span>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
