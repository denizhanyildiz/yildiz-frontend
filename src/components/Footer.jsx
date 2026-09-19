import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/footer.css';

export default function Footer() {
  const { t } = useTranslation();
  const phone = t('contact.phoneNumber');
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <img src="/logo.png" alt="" />
            <strong>{t('brand')}</strong>
          </div>
          <p>{t('yildizDescription')}</p>
        </div>
        <div>
          <h4>{t('contact.title')}</h4>
          <ul>
            <li><MapPin size={16} aria-hidden="true" /> {t('contact.adress')}</li>
            <li><Phone size={16} aria-hidden="true" /> <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></li>
            <li><Mail size={16} aria-hidden="true" /> <a href={`mailto:${t('contact.email')}`}>{t('contact.email')}</a></li>
          </ul>
        </div>
        <div>
          <h4>{t('common.menu')}</h4>
          <ul>
            <li><Link to="/projeler">{t('nav.projects')}</Link></li>
            <li><Link to="/biz-kimiz">{t('nav.about')}</Link></li>
            <li><Link to="/iletisim">{t('nav.contact')}</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} {t('brand')}. {t('common.rights')}</div>
    </footer>
  );
}
