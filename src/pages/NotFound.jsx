import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo.jsx';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <main className="section container" style={{ textAlign: 'center' }}>
      <Seo title="404" />
      <h1 style={{ fontSize: 'clamp(3rem, 12vw, 6rem)', margin: 0 }}>404</h1>
      <p className="lead" style={{ margin: '0 auto 1.5rem' }}>{t('notFound.text')}</p>
      <Link className="btn btn-gold" to="/">{t('notFound.back')}</Link>
    </main>
  );
}
