import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../styles/whatsapp.css';

export default function WhatsAppButton() {
  const { t } = useTranslation();
  const number = t('contact.phoneNumber').replace(/\D/g, '');
  const text = encodeURIComponent(t('contact.whatsappMessage'));
  return (
    <a
      className="whatsapp-fab"
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('contact.whatsapp')}
    >
      <MessageCircle size={26} aria-hidden="true" />
      <span>{t('contact.whatsapp')}</span>
    </a>
  );
}
