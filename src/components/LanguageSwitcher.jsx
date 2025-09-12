import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/languageSwitcher.css";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const setLng = (e) => {
    const lng = e.target.value;
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <div className="lang-switcher">
      <label htmlFor="lang-select">{t("actions.change_language")}:</label>
      <select id="lang-select" value={i18n.language} onChange={setLng}>
        <option value="tr">🇹🇷 TR</option>
        <option value="en">🇬🇧 EN</option>
      </select>
    </div>
  );
}