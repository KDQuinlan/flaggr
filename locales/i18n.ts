import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en/_index';
import es from '@/locales/es/_index';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: 'en',
  fallbackLng: 'en',

  resources: {
    en: {
      data: en.data,
      home: en.home,
      difficulty: en.difficulty,
      summary: en.summary,
      custom: en.custom,
      customSummary: en.customSummary,
      loading: en.loading,
      setup: en.setup,
      settings: en.settings,
      energy: en.energy,
      feedback: en.feedback,
    },
    es: {
      data: es.data,
      home: es.home,
      difficulty: es.difficulty,
      summary: es.summary,
      custom: es.custom,
      customSummary: es.customSummary,
      loading: es.loading,
      setup: es.setup,
      settings: es.settings,
      energy: es.energy,
      feedback: es.feedback,
    },
  },

  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
