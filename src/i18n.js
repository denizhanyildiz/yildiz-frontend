import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// JSON dosyalarını doğrudan import
import tr from "./locales/tr/common.json";
import en from "./locales/en/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: { common: tr },
      en: { common: en }
    },
    fallbackLng: "tr",
    supportedLngs: ["tr", "en"],
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "htmlTag", "navigator"],
      caches: ["localStorage"]
    }
  });

export default i18n;