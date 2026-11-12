import { motion, AnimatePresence } from 'motion/react';
import { Mail, MessageSquare, Phone, X, Loader2, Download, Copy, Check, Linkedin, ArrowUpRight, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { downloadResume, RESUMES, CONTACT_EMAIL, CONTACT_PHONE, LINKEDIN_URL, PORTFOLIO_URL } from './resume';
import { useLensT, LENS_RESUME } from './LensContext';
import { SpringText } from './SpringText';
import { useState } from 'react';
import wechatQR from 'figma:asset/ac493a8f5a41bd1f4f24a95d217355f6dd3eef5d.png';

export function ContactPage() {
  const [showWechat, setShowWechat] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t, tl, lens } = useLensT();
  const rec = LENS_RESUME[lens];

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
      } else {
        const ta = document.createElement('textarea');
        ta.value = CONTACT_EMAIL;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      toast.success(t('contact.copied'), { description: CONTACT_EMAIL });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t('contact.copyFailed'));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 md:pt-32 pb-12 md:pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="text-white mb-6" style={{ fontSize: '3.5rem', fontWeight: 700 }}>
            <SpringText text={t('contact.subtitle')} />
          </h1>
          <div className="inline-flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2.5 bg-[#DBFE02]/10 border border-[#DBFE02]/30 rounded-xl px-5 py-2.5">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inset-0 rounded-full bg-[#DBFE02] aq-breathe" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-[#DBFE02]" />
              </span>
              <span className="text-[#DBFE02]">{tl('contact.available')}</span>
            </div>
            <span className="font-meta text-xs md:text-sm text-white/50">{tl('hero.avail')}</span>
          </div>
          <motion.div 
            className="w-24 h-1 bg-[#DBFE02] mb-8 mx-auto"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
          <p className="text-white/70 text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-8 max-w-3xl mx-auto"
        >
          {/* Contact Methods */}
          <div className="space-y-4">
            {/* 邮箱：一键复制 */}
            <div className="flex items-stretch gap-2">
              <motion.a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex-1 min-w-0 flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 hover:bg-white/10 transition-all"
                whileHover={{ x: 5 }}
                data-interactive="true"
              >
                <div className="bg-[#DBFE02]/10 p-3 rounded-xl">
                  <Mail className="text-[#DBFE02]" size={24} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white mb-1">{t('contact.email')}</h3>
                  <p className="text-white/60 font-meta text-sm md:text-base truncate">{CONTACT_EMAIL}</p>
                </div>
              </motion.a>
              <motion.button
                onClick={handleCopyEmail}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl px-4 md:px-6 font-semibold transition-colors ${
                  copied ? 'bg-white text-black' : 'bg-[#DBFE02] text-black hover:bg-[#b8d402]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-interactive="true"
                aria-label={t('contact.copy')}
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
                <span className="text-xs md:text-sm">{t('contact.copy')}</span>
              </motion.button>
            </div>

            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 hover:bg-white/10 transition-all"
              whileHover={{ x: 5 }}
              data-interactive="true"
            >
              <div className="bg-[#DBFE02]/10 p-3 rounded-xl">
                <Linkedin className="text-[#DBFE02]" size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white mb-1">{t('contact.linkedin')}</h3>
                <p className="text-white/60 font-meta text-sm truncate">linkedin.com/in/albert-qiu-7024a9440</p>
              </div>
              <ArrowUpRight className="text-white/40" size={20} />
            </motion.a>

            <motion.button
              onClick={() => setShowWechat(true)}
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 hover:bg-white/10 transition-all cursor-pointer w-full text-left"
              whileHover={{ x: 5 }}
              data-interactive="true"
            >
              <div className="bg-[#DBFE02]/10 p-3 rounded-xl">
                <MessageSquare className="text-[#DBFE02]" size={24} />
              </div>
              <div>
                <h3 className="text-white mb-1">{t('contact.wechat')}</h3>
                <p className="text-white/60">qhw19357394639</p>
              </div>
            </motion.button>

            <motion.a
              href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 hover:bg-white/10 transition-all"
              whileHover={{ x: 5 }}
              data-interactive="true"
            >
              <div className="bg-[#DBFE02]/10 p-3 rounded-xl">
                <Phone className="text-[#DBFE02]" size={24} />
              </div>
              <div>
                <h3 className="text-white mb-1">{t('contact.phone')}</h3>
                <p className="text-white/60 font-meta text-sm md:text-base">{CONTACT_PHONE}</p>
              </div>
            </motion.a>

            <motion.a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 hover:bg-white/10 transition-all"
              whileHover={{ x: 5 }}
              data-interactive="true"
            >
              <div className="bg-[#DBFE02]/10 p-3 rounded-xl">
                <Globe className="text-[#DBFE02]" size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white mb-1">{t('contact.portfolio')}</h3>
                <p className="text-white/60 font-meta text-sm md:text-base truncate">www.albert-designer.com</p>
              </div>
              <ArrowUpRight className="text-white/40" size={20} />
            </motion.a>

            {/* 三份简历 */}
            <div className="pt-4">
              <p className="font-meta text-xs uppercase tracking-[0.2em] text-white/40 mb-3">{t('contact.resumes')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[...RESUMES]
                  .sort((x, y) => (x.id === rec ? -1 : y.id === rec ? 1 : 0))
                  .map((r) => (
                    <motion.button
                      key={r.id}
                      onClick={() => downloadResume(r.id)}
                      className={`group text-left rounded-xl p-5 border transition-colors flex flex-col gap-3 ${
                        r.id === rec
                          ? 'bg-[#DBFE02]/10 border-[#DBFE02]/40 hover:bg-[#DBFE02]/20'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                      whileHover={{ y: -3 }}
                      data-interactive="true"
                    >
                      <div className="flex items-center justify-between">
                        <Download className={r.id === rec ? 'text-[#DBFE02]' : 'text-white/60'} size={20} />
                        {r.id === rec && (
                          <span className="font-meta text-[10px] uppercase tracking-wider text-[#DBFE02]">{t('resume.recommended')}</span>
                        )}
                      </div>
                      <div>
                        <h3 className={`mb-1 ${r.id === rec ? 'text-[#DBFE02]' : 'text-white'}`}>{t(`resume.${r.id}`)}</h3>
                        <p className="text-white/50 font-meta text-[11px] leading-snug">{t(`resume.${r.id}.desc`)}</p>
                      </div>
                    </motion.button>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* WeChat QR Code Modal */}
      <AnimatePresence>
        {showWechat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-6"
            onClick={() => {
              setShowWechat(false);
              setImageLoaded(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-lg p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setShowWechat(false);
                  setImageLoaded(false);
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                data-interactive="true"
              >
                <X size={24} />
              </button>
              
              <div className="text-center">
                <h3 className="text-2xl text-black mb-2">{t('contact.wechatScan')}</h3>
                <p className="text-gray-600 mb-6">qhw19357394639</p>
                
                <div className="rounded-xl overflow-hidden mb-4 relative bg-gray-100 aspect-square">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ 
                          duration: 1, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                      >
                        <Loader2 className="text-[#DBFE02]" size={48} />
                      </motion.div>
                    </div>
                  )}
                  <img 
                    src={wechatQR} 
                    alt="WeChat QR Code" 
                    className={`w-full h-auto transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
                
                <p className="text-sm text-gray-500">
                  {t('contact.wechatHint')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}