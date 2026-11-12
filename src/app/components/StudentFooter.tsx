import { motion } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { Linkedin } from 'lucide-react';
import { LINKEDIN_URL } from './resume';

interface StudentFooterProps {
  onNavigate?: (sectionId: string) => void;
}

export function StudentFooter({ onNavigate }: StudentFooterProps) {
  const { language, t } = useLanguage();
  
  return (
    <footer className="hidden md:block py-12 px-6 bg-black text-white border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 text-white/60">
            <span>© 2026 {language === 'zh' ? '邱皓惟' : 'Albert Qiu'}</span>
            <span>•</span>
            <span>{t('footer.role')}</span>
            <span>•</span>
            <span className="flex items-center gap-2">
              Made with 💛
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#DBFE02] transition-colors"
              aria-label="LinkedIn"
              data-interactive="true"
            >
              <Linkedin size={18} />
            </a>
            {[
              { key: 'nav.work', id: 'works' },
              { key: 'nav.about', id: 'about' },
              { key: 'nav.contact', id: 'contact' }
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onNavigate && onNavigate(item.id)}
                className="text-white/60 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
                data-interactive="true"
              >
                {t(item.key)}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}