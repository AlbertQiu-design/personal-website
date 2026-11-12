import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg"></div>
            <span className="tracking-tight">张设计</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('works')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              作品
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              关于
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              联系
            </button>
            <Button onClick={() => scrollToSection('contact')}>
              合作咨询
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <button 
              onClick={() => scrollToSection('works')}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
            >
              作品
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
            >
              关于
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
            >
              联系
            </button>
            <Button className="w-full" onClick={() => scrollToSection('contact')}>
              合作咨询
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
