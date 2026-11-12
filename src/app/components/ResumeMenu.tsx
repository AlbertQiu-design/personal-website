import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown, Download, FileText } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useLens, LENS_RESUME } from './LensContext';
import { RESUMES, downloadResume } from './resume';

interface ResumeMenuProps {
  variant?: 'nav' | 'primary' | 'outline';
  align?: 'start' | 'center' | 'end';
  label?: string;
}

const TRIGGER: Record<NonNullable<ResumeMenuProps['variant']>, string> = {
  nav: 'px-4 py-2 rounded-xl border border-[#DBFE02]/60 text-[#DBFE02] hover:bg-[#DBFE02] hover:text-black data-[state=open]:bg-[#DBFE02] data-[state=open]:text-black font-semibold',
  primary: 'px-7 py-3.5 rounded-xl bg-[#DBFE02] text-black hover:bg-[#b8d402] font-semibold text-base md:text-lg',
  outline: 'px-6 md:px-7 py-3.5 rounded-xl border border-white/25 text-white hover:border-white/60 hover:bg-white/5 data-[state=open]:border-white/60 font-medium text-base md:text-lg',
};

/** 简历下拉：三份简历，按当前身份把推荐的那份排在第一位 */
export function ResumeMenu({ variant = 'outline', align = 'start', label }: ResumeMenuProps) {
  const { t } = useLanguage();
  const { lens } = useLens();
  const rec = LENS_RESUME[lens];
  const items = [...RESUMES].sort((a, b) => (a.id === rec ? -1 : b.id === rec ? 1 : 0));

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          className={`group inline-flex items-center gap-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#DBFE02]/60 ${TRIGGER[variant]}`}
          data-interactive="true"
        >
          {variant !== 'nav' && <FileText size={18} />}
          <span>{label ?? (variant === 'nav' ? t('nav.resume') : t('resume.button'))}</span>
          <ChevronDown size={16} className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          sideOffset={8}
          className="z-[60] w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-md p-2 shadow-2xl shadow-black/60 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <DropdownMenu.Label className="px-3 pt-1.5 pb-2 font-meta text-[11px] uppercase tracking-[0.2em] text-white/40">
            {t('resume.choose')}
          </DropdownMenu.Label>
          {items.map((r) => (
            <DropdownMenu.Item
              key={r.id}
              onSelect={() => downloadResume(r.id)}
              className="group/item flex items-center gap-3 rounded-xl px-3 py-3 outline-none cursor-pointer data-[highlighted]:bg-[#DBFE02] transition-colors"
              data-interactive="true"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white group-data-[highlighted]/item:text-black font-medium">
                    {t(`resume.${r.id}`)}
                  </span>
                  {r.id === rec && (
                    <span className="rounded-md bg-[#DBFE02]/15 px-1.5 py-0.5 font-meta text-[10px] uppercase tracking-wider text-[#DBFE02] group-data-[highlighted]/item:bg-black/10 group-data-[highlighted]/item:text-black">
                      {t('resume.recommended')}
                    </span>
                  )}
                </div>
                <p className="font-meta text-[11px] text-white/45 group-data-[highlighted]/item:text-black/60 mt-0.5 truncate">
                  {t(`resume.${r.id}.desc`)}
                </p>
              </div>
              <Download size={16} className="text-white/40 group-data-[highlighted]/item:text-black flex-shrink-0" />
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
