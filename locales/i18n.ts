import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en/_index';
import es from '@/locales/es/_index';
import nl from '@/locales/nl/_index';
import uk from '@/locales/uk/_index';
import it from '@/locales/it/_index';
import hu from '@/locales/hu/_index';

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
      passport: en.passport,
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
    nl: {
      data: nl.data,
      home: nl.home,
      difficulty: nl.difficulty,
      summary: nl.summary,
      custom: nl.custom,
      customSummary: nl.customSummary,
      loading: nl.loading,
      setup: nl.setup,
      settings: nl.settings,
      energy: nl.energy,
      feedback: nl.feedback,
    },
    uk: {
      data: uk.data,
      home: uk.home,
      difficulty: uk.difficulty,
      summary: uk.summary,
      custom: uk.custom,
      customSummary: uk.customSummary,
      loading: uk.loading,
      setup: uk.setup,
      settings: uk.settings,
      energy: uk.energy,
      feedback: uk.feedback,
    },
    it: {
      data: it.data,
      home: it.home,
      difficulty: it.difficulty,
      summary: it.summary,
      custom: it.custom,
      customSummary: it.customSummary,
      loading: it.loading,
      setup: it.setup,
      settings: it.settings,
      energy: it.energy,
      feedback: it.feedback,
    },
    hu: {
      data: hu.data,
      home: hu.home,
      difficulty: hu.difficulty,
      summary: hu.summary,
      custom: hu.custom,
      customSummary: hu.customSummary,
      loading: hu.loading,
      setup: hu.setup,
      settings: hu.settings,
      energy: hu.energy,
      feedback: hu.feedback,
    },
  },

  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
