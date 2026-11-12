import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2025 张设计</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              用 <Heart size={14} className="text-red-500 fill-red-500" /> 设计
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a href="#works" className="text-muted-foreground hover:text-foreground transition-colors">
              作品
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              关于
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              联系
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
