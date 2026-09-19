import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Sayfa başlığını ve meta açıklamasını dile göre günceller.
export default function Seo({ title, description }) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const brand = t('brand');
    document.title = title ? `${title} | ${brand}` : brand;
    const desc = description || t('yildizDescription');
    for (const [attr, key] of [['name', 'description'], ['property', 'og:title'], ['property', 'og:description']]) {
      const el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) continue;
      el.setAttribute('content', key === 'og:title' ? document.title : desc);
    }
  }, [title, description, t, i18n.language]);
  return null;
}
