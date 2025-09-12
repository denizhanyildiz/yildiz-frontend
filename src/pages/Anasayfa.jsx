import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/anasayfa.css';
import { useTranslation } from "react-i18next";

export default function Anasayfa() {

  const { t } = useTranslation();
  
  return (
    <main className="page-anasayfa">
      <section className="container hero">
        <div className="logo">
          <img src="/logo.png" alt="Company Logo" />
        </div>
        <h1>{t("brand")}</h1>
        <p>{t("yildizDescription")}</p>
        <div className="quick">
          <Link className="btn" to="/projeler">{t("nav.projects")}</Link>
          <Link className="btn" to="/biz-kimiz">{t("about.title")}</Link>
          <Link className="btn" to="/iletisim">{t("contact.title")}</Link>
        </div>
      </section>

      <section className="container" style={{marginTop:'2.5rem'}}>
        <div className="grid-2">
          <div className="card" style={{padding:'1.25rem'}}>
            <h3>{t("mainJobs")}</h3>
            <p className="muted">{t("mainJobDesription")}</p>
          </div>
          <div className="card" style={{padding:'1.25rem'}}>
            <h3>{t("approach.title")}</h3>
            <p className="muted">{t("approach.description")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
