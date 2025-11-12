import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { enUS } from '../locales/en-US';
import { ptBR } from '../locales/pt-BR';



i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({

    supportedLngs: ['pt-BR', 'en-US'],
    resources: {
      'en-US': { translation: enUS },
      'pt-BR': { translation: ptBR },
    },
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;