import React from 'react';
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
      <section className="container" style={{paddingTop:'2.2rem'}}>
        <div className="card about">
          <h2>{t("about.title")}</h2>
          <p className="muted"> {t("about.description")}</p>
          <div className="stats">
            {stats.map((s, i) => (
              <div key={i} className="stat card">
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
