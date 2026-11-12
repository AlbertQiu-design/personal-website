import { motion } from 'motion/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown, Eye, Check } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useLens, LENSES, Lens } from './LensContext';

/** Hero 中的「Viewing as」分段控件 */
export function LensSegmented({ className = '' }: { className?: string }) {
  const { t } = useLanguage();
  const { lens, setLens } = useLens();
  return (
    <div className={`inline-flex items-center gap-3 flex-wrap ${className}`}>
      <span className="font-meta text-xs text-white/45">{t('nav.lens')}</span>
      <div className="relative inline-flex p-1 rounded-xl border border-white/15 bg-white/[0.04]">
        {LENSES.map((l) => (
          <button
            key={l}
            onClick={() => setLens(lens === l ? 'all' : l)}
            className={`relative px-3 md:px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
              lens === l ? 'text-black' : 'text-white/60 hover:text-white'
            }`}
            aria-pressed={lens === l}
            data-interactive="true"
          >
            {lens === l && (
              <motion.span
                layoutId="lens-seg"
                className="absolute inset-0 rounded-lg bg-[#DBFE02]"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative">{t(`lens.short.${l}`)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Header 中的紧凑身份下拉（lg 及以上） */
export function LensDropdown() {
  const { t } = useLanguage();
  const { lens, setLens } = useLens();
  const options: Lens[] = [...LENSES, 'all'];
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          className="group inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition-colors outline-none"
          data-interactive="true"
          aria-label={t('nav.lens')}
        >
          <Eye size={16} />
          <span className="text-sm font-semibold">{t(`lens.short.${lens}`)}</span>
          <ChevronDown size={14} className="transition-transform group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-[60] w-64 rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-md p-2 shadow-2xl shadow-black/60"
        >
          <DropdownMenu.Label className="px-3 pt-1.5 pb-2 font-meta text-[11px] uppercase tracking-[0.2em] text-white/40">
            {t('nav.lens')}
          </DropdownMenu.Label>
          {options.map((l) => (
            <DropdownMenu.Item
              key={l}
              onSelect={() => setLens(l)}
              className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm text-white outline-none cursor-pointer data-[highlighted]:bg-white/10"
              data-interactive="true"
            >
              {t(`lens.${l}`)}
              {lens === l && <Check size={14} className="text-[#DBFE02]" />}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
