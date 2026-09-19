import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, Sprout, Cpu, ArrowRight } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import '../styles/anasayfa.css';
import { useTranslation } from "react-i18next";

const services = [
  { key: 'construction', Icon: HardHat },
  { key: 'agriculture', Icon: Sprout },
  { key: 'technology', Icon: Cpu },
];

export default function Anasayfa() {
  const { t } = useTranslation();

  return (
    <main className="page-anasayfa">
      <Seo />
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="eyebrow">{t("hero.eyebrow")}</span>
            <h1>{t("brand")}</h1>
            <p>{t("yildizDescription")}</p>
            <div className="quick">
              <Link className="btn btn-gold" to="/projeler">{t("hero.cta")} <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link className="btn btn-ghost" to="/iletisim">{t("hero.cta2")}</Link>
            </div>
          </div>
          <div className="hero-logo">
            <img src="/logo.png" alt={t("common.logoAlt")} />
          </div>
        </div>
      </section>

      <Reveal as="section" className="container section">
        <h2 className="section-title">{t("mainJobs")}</h2>
        <div className="services">
          {services.map(({ key, Icon }) => (
            <article key={key} className="service card">
              <span className="service-icon"><Icon size={26} aria-hidden="true" /></span>
              <h3>{t(`services.${key}.title`)}</h3>
              <p>{t(`services.${key}.desc`)}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="container section">
        <h2 className="section-title">{t("process.title")}</h2>
        <ol className="steps">
          {t("process.steps", { returnObjects: true }).map((step, i) => (
            <li key={i} className="step card">
              <span className="step-no">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal as="section" className="container section">
        <h2 className="section-title">{t("faq.title")}</h2>
        <div className="faq">
          {t("faq.items", { returnObjects: true }).map((item, i) => (
            <details key={i} className="faq-item card">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="container section">
        <div className="approach">
          <h3>{t("approach.title")}</h3>
          <p>{t("approach.description")}</p>
          <Link className="btn btn-gold" to="/biz-kimiz">{t("about.title")} <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </Reveal>
    </main>
  );
}
