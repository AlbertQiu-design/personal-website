import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useLanguage } from './LanguageContext';
import type { ResumeId } from './resume';

export type Lens = 'ba' | 'dse' | 'aipm' | 'all';

const LENS_KEY = 'aq_lens';

interface LensContextType {
  lens: Lens;
  setLens: (lens: Lens) => void;
}

const LensContext = createContext<LensContextType | undefined>(undefined);

function readLens(): Lens {
  try {
    const v = sessionStorage.getItem(LENS_KEY);
    if (v === 'ba' || v === 'dse' || v === 'aipm' || v === 'all') return v;
  } catch {
    /* ignore */
  }
  return 'all';
}

export function LensProvider({ children }: { children: ReactNode }) {
  const [lens, setLensState] = useState<Lens>(readLens);
  const setLens = useCallback((l: Lens) => {
    setLensState(l);
    try {
      sessionStorage.setItem(LENS_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);
  return <LensContext.Provider value={{ lens, setLens }}>{children}</LensContext.Provider>;
}

export function useLens() {
  const ctx = useContext(LensContext);
  if (!ctx) return { lens: 'all' as Lens, setLens: () => {} };
  return ctx;
}

/** 各身份推荐的简历 */
export const LENS_RESUME: Record<Lens, ResumeId> = {
  ba: 'ba',
  dse: 'dse',
  aipm: 'ai',
  all: 'ba',
};

export const LENSES: Exclude<Lens, 'all'>[] = ['ba', 'dse', 'aipm'];

/**
 * 带身份后缀的翻译：先查 `${key}.${lens}`，查不到回退到 `${key}`
 */
export function useLensT() {
  const { t, raw } = useLanguage();
  const { lens } = useLens();
  const tl = useCallback(
    (key: string) => {
      const v = raw(`${key}.${lens}`);
      return v !== undefined ? v : t(key);
    },
    [t, raw, lens],
  );
  return { tl, t, lens };
}
