import React from 'react';
import '../styles/iletisim.css';
import { useTranslation } from "react-i18next";

export default function Iletisim() {
  const { t } = useTranslation();
  const email = t("contact.email");

  return (
    <main className="page-iletisim">
      <section className="container" style={{paddingTop:'2.2rem'}}>
        <h2>{t("contact.header")}</h2>
        <div className="contact card">
          <div className="contact-row">
            <div className="info">
              <h3>{t("contact.title")}</h3>
              <p>{t("contact.email")}</p>
              <p>{t("contact.phoneNumber")}</p>
              <p>{t("contact.adress")}</p>
              <div style={{marginTop:'1rem'}}>
                <a className="btn" href={`mailto:${email}`}>
                  {t("contact.sendmail")}
                </a>
              </div>
            </div>
            <div className="map card" style={{background:'#eef2ff', display:'grid', placeItems:'center'}}>
              <span style={{color:'#475569'}}>Harita alanı (statik görsel veya embed ekleyin)</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
