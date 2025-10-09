import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// TODO - replace imports with index usage

// English namespaces
import en_data from './en/data';
import en_home from './en/home';
import en_difficulty from './en/difficulty';
import en_summary from './en/summary';
import en_custom from './en/custom';
import en_customSummary from './en/customSummary';
import en_loading from './en/loading';
import en_setup from './en/setup';

// Spanish namespaces
import es_data from './es/data';
import es_home from './es/home';
import es_difficulty from './es/difficulty';
import es_summary from './es/summary';
import es_custom from './es/custom';
import es_customSummary from './es/customSummary';
import es_loading from './es/loading';
import es_setup from './es/setup';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: 'en',
  fallbackLng: 'en',

  resources: {
    en: {
      data: en_data,
      home: en_home,
      difficulty: en_difficulty,
      summary: en_summary,
      custom: en_custom,
      customSummary: en_customSummary,
      loading: en_loading,
      setup: en_setup,
    },
    es: {
      data: es_data,
      home: es_home,
      difficulty: es_difficulty,
      summary: es_summary,
      custom: es_custom,
      customSummary: es_customSummary,
      loading: es_loading,
      setup: es_setup,
    },
  },

  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
