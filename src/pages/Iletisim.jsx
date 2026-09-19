import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import '../styles/iletisim.css';
import { useTranslation } from "react-i18next";

export default function Iletisim() {
  const { t } = useTranslation();
  const email = t("contact.email");
  const phone = t("contact.phoneNumber");
  const address = t("contact.adress");
  const q = encodeURIComponent(address);

  return (
    <main className="page-iletisim">
      <section className="container section">
        <h2 className="section-title">{t("contact.header")}</h2>
        <p className="lead">{t("contact.intro")}</p>
        <div className="contact-row">
          <div className="info card">
            <h3>{t("contact.title")}</h3>
            <ul className="info-list">
              <li><Mail size={20} aria-hidden="true" /><div><small>{t("contact.emailLabel")}</small><a href={`mailto:${email}`}>{email}</a></div></li>
              <li><Phone size={20} aria-hidden="true" /><div><small>{t("contact.phoneLabel")}</small><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></div></li>
              <li><MapPin size={20} aria-hidden="true" /><div><small>{t("contact.addressLabel")}</small><span>{address}</span></div></li>
            </ul>
            <div className="actions">
              <a className="btn btn-gold" href={`mailto:${email}`}>{t("contact.sendmail")}</a>
              <a className="btn" href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer">
                {t("contact.openMap")} <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="map card">
            <iframe
              title={t("contact.mapTitle")}
              src={`https://www.google.com/maps?q=${q}&hl=${t("contact.mapLang", { defaultValue: "tr" })}&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}
