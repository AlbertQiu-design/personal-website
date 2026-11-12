import { useEffect } from 'react';
import { useLanguage } from './LanguageContext';

/** 根据语言同步页面 <title> 与 meta description，方便分享链接时显示定位语 */
export function DocumentMeta() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = t('meta.title');
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';

    const ensure = (selector: string, attr: 'name' | 'property', key: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      return el;
    };
    ensure('meta[name="description"]', 'name', 'description').content = t('meta.description');
    ensure('meta[property="og:title"]', 'property', 'og:title').content = t('meta.title');
    ensure('meta[property="og:description"]', 'property', 'og:description').content = t('meta.description');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return null;
}
