import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Home, Building2, Users2, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher.jsx';
import '../styles/header.css';

const links = [
  { to: '/', key: 'nav.home', Icon: Home, end: true },
  { to: '/projeler', key: 'nav.projects', Icon: Building2 },
  { to: '/biz-kimiz', key: 'nav.about', Icon: Users2 },
  { to: '/iletisim', key: 'nav.contact', Icon: Phone },
];

export default function Header() {
  const { t } = useTranslation();
  return (
    <header className="site-header">
      <nav className="container nav" aria-label={t('common.menu')}>
        <Link to="/" className="brand" aria-label={t('brand')}>
          <img src="/logo.png" alt={t('common.logoAlt')} />
          <span>{t('brand')}</span>
        </Link>
        <div className="menu">
          {links.map(({ to, key, Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              <Icon size={18} aria-hidden="true" /> <span>{t(key)}</span>
            </NavLink>
          ))}
        </div>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
