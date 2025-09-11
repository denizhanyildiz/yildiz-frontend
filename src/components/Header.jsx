import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Home, Building2, Users2, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher.jsx';

export default function Header() {
  const { t } = useTranslation();
  return (
    <header className="site-header">
      <nav className="container nav">
        <Link to="/" className="brand" aria-label={t("brand")}>
          <img
            src="/logo.png"
            alt="Company Logo"
          />
          <span>{t("brand")}</span>
        </Link>
        <div className="menu">
          <NavLink to="/" end className={({isActive})=> isActive?'active':undefined}><Home size={18}/> {t("nav.home")}</NavLink>
          <NavLink to="/projeler" className={({isActive})=> isActive?'active':undefined}><Building2 size={18}/> {t("nav.projects")}</NavLink>
          <NavLink to="/biz-kimiz" className={({isActive})=> isActive?'active':undefined}><Users2 size={18}/> {t("nav.about")}</NavLink>
          <NavLink to="/iletisim" className={({isActive})=> isActive?'active':undefined}><Phone size={18}/> {t("nav.contact")}</NavLink>
        </div>
        <LanguageSwitcher />
      </nav>
    </header>
  )
}
