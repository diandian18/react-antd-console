import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { baseModel } from '@/models/base';
// import en from './en';
// import zh_Hans from './zh-Hans';

let mounted = false;

export async function i18nInit() {
  if (mounted) return;

  const en = (await import('./en')).default;
  const zh_Hans = (await import('./zh-Hans')).default;

  const resources = {
    en,
    ['zh_Hans']: zh_Hans,
  };

  i18n
    .use(initReactI18next)
    .init({
      fallbackLng: baseModel.state.language ?? 'zh_Hans',
      resources,
      interpolation: {
        escapeValue: false,
      },
    });

  mounted = true;
}

export default i18n;

