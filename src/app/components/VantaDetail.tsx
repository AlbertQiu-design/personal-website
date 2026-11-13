import { SolutionCaseDetail } from './SolutionCaseDetail';
import slide01 from '../assets/vanta/slide-01.jpg';
import slide02 from '../assets/vanta/slide-02.jpg';
import slide03 from '../assets/vanta/slide-03.jpg';
import slide04 from '../assets/vanta/slide-04.jpg';
import slide05 from '../assets/vanta/slide-05.jpg';
import slide06 from '../assets/vanta/slide-06.jpg';
import slide07 from '../assets/vanta/slide-07.jpg';
import slide08 from '../assets/vanta/slide-08.jpg';
import slide09 from '../assets/vanta/slide-09.jpg';
import slide10 from '../assets/vanta/slide-10.jpg';
import slide11 from '../assets/vanta/slide-11.jpg';
import slide12 from '../assets/vanta/slide-12.jpg';
import slide13 from '../assets/vanta/slide-13.jpg';
import slide14 from '../assets/vanta/slide-14.jpg';
import slide15 from '../assets/vanta/slide-15.jpg';
import slide16 from '../assets/vanta/slide-16.jpg';
import slide17 from '../assets/vanta/slide-17.jpg';
import slide18 from '../assets/vanta/slide-18.jpg';

interface VantaDetailProps {
  onNavigate?: (sectionId: string) => void;
}

const SLIDES = [
  slide01, slide02, slide03, slide04, slide05, slide06,
  slide07, slide08, slide09, slide10, slide11, slide12,
  slide13, slide14, slide15, slide16, slide17, slide18,
];

function VantaDeck() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {SLIDES.map((src) => (
        <img key={src} src={src} alt="" className="w-full rounded-3xl" />
      ))}
    </div>
  );
}

export function VantaDetail({ onNavigate }: VantaDetailProps) {
  return <SolutionCaseDetail projectId="vanta" onNavigate={onNavigate} leading={<VantaDeck />} />;
}
