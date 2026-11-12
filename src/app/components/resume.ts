// 简历 PDF —— 本地文件经 Vite 打包（文件名带 hash），下载时使用友好的通用文件名
// 副本放在 assets/resumes，AI 版使用通用文件名，避免打包后的 URL 暴露公司名
import baPdf from '../assets/resumes/Albert_Qiu_BA_Business_Systems_Analysis.pdf?url';
import dsePdf from '../assets/resumes/Albert_Qiu_Digital_Solutions_Engineering.pdf?url';
import aiPdf from '../assets/resumes/Albert_Qiu_AI_Product.pdf?url';

export type ResumeId = 'ba' | 'dse' | 'ai';

export interface ResumeItem {
  id: ResumeId;
  /** i18n key：resume.<id> / resume.<id>.desc */
  file: string;
  filename: string;
}

export const RESUMES: ResumeItem[] = [
  { id: 'ba', file: baPdf, filename: 'Albert_Qiu_BA_Business_Systems_Analysis.pdf' },
  { id: 'dse', file: dsePdf, filename: 'Albert_Qiu_Digital_Solutions_Engineering.pdf' },
  // 原文件名含公司名，对外下载使用通用文件名
  { id: 'ai', file: aiPdf, filename: 'Albert_Qiu_AI_Product.pdf' },
];

export const CONTACT_EMAIL = 'albertqiu17@gmail.com';
export const CONTACT_PHONE = '+852 6759 9932';
export const PORTFOLIO_URL = 'https://www.albert-designer.com';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/albert-qiu-7024a9440/';

export function downloadResume(id: ResumeId = 'ba') {
  const item = RESUMES.find((r) => r.id === id) ?? RESUMES[0];
  const link = document.createElement('a');
  link.href = item.file;
  link.download = item.filename;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
