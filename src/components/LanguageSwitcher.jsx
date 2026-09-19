import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/languageSwitcher.css";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  // Tarayıcı "tr-TR" gibi bölgesel kod döndürebilir; select yalnızca "tr"/"en" içerir.
  const current = (i18n.resolvedLanguage || i18n.language || "tr").slice(0, 2);

  useEffect(() => {
    document.documentElement.lang = current;
  }, [current]);

  return (
    <div className="lang-switcher">
      <label htmlFor="lang-select" className="sr-only">{t("actions.change_language")}</label>
      <select id="lang-select" value={current} onChange={(e) => i18n.changeLanguage(e.target.value)}>
        <option value="tr">TR</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
}
