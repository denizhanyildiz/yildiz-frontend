import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/quoteForm.css';

// VITE_FORM_ENDPOINT (örn. https://formspree.io/f/xxxx) tanımlıysa form oraya gönderilir;
// aksi halde kullanıcının e-posta uygulaması önceden doldurulmuş şekilde açılır.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;
const SERVICES = ['construction', 'agriculture', 'technology'];

export default function QuoteForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (!ENDPOINT) {
      const body = `${data.name}\n${data.phone}\n${data.email}\n${t(`services.${data.service}.title`)}\n\n${data.message}`;
      window.location.href = `mailto:${t('contact.email')}?subject=${encodeURIComponent(t('quote.subject'))}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.statusText);
      e.currentTarget.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="quote-form card" onSubmit={onSubmit}>
      <h3>{t('quote.title')}</h3>
      <label>{t('quote.name')}<input name="name" required autoComplete="name" /></label>
      <div className="quote-two">
        <label>{t('quote.phone')}<input name="phone" type="tel" required autoComplete="tel" /></label>
        <label>{t('quote.email')}<input name="email" type="email" autoComplete="email" /></label>
      </div>
      <label>{t('quote.service')}
        <select name="service" defaultValue="construction">
          {SERVICES.map((s) => <option key={s} value={s}>{t(`services.${s}.title`)}</option>)}
        </select>
      </label>
      <label>{t('quote.message')}<textarea name="message" rows="4" required /></label>
      <button className="btn btn-gold" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t('quote.sending') : t('quote.submit')}
      </button>
      <p className={`quote-status ${status}`} role="status">
        {status === 'success' && t('quote.success')}
        {status === 'error' && t('quote.error')}
      </p>
    </form>
  );
}
