import * as DialogPrimitive from '@radix-ui/react-dialog@1.1.6';
import { X } from 'lucide-react';
import img1 from "figma:asset/e972d80191832bca2ed73812be0c4911fdb526e8.png";
import { useLanguage } from './LanguageContext';

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  const { language } = useLanguage();
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        {/* Content */}
        <DialogPrimitive.Content 
          className="fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg shadow-lg p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
        >
          {/* Accessibility titles - visually hidden */}
          <DialogPrimitive.Title className="sr-only">
            Contact Information
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Scan the WeChat QR code to connect with {language === 'zh' ? '邱皓惟' : 'Albert Qiu'}
          </DialogPrimitive.Description>
          
          <div className="flex flex-col">
            {/* X 关闭按钮 - 位于图片上方，左对齐 */}
            <div className="px-4 py-3">
              <button
                onClick={() => onOpenChange(false)}
                className="rounded-full bg-black/60 backdrop-blur-sm p-2 text-white hover:bg-black/80 transition-colors"
                data-interactive="true"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* 微信二维码图片 */}
            <div className="relative w-[585px] h-[648px] rounded-b-lg overflow-hidden">
              <div className="absolute inset-0">
                <img 
                  alt={`WeChat QR Code - Contact ${language === 'zh' ? '邱皓惟' : 'Albert Qiu'}`}
                  className="absolute h-[195.37%] left-0 max-w-none top-[-43.06%] w-full" 
                  src={img1} 
                />
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
