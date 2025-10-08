import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English namespaces
import en_data from './en/data';
import en_home from './en/home';
import en_difficulty from './en/difficulty';
import en_summary from './en/summary';
import en_custom from './en/custom';
import en_customSummary from './en/customSummary';
import en_loading from './en/loading';

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
    },
  },

  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
