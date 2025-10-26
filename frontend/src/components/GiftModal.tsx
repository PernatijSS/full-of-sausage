import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface GiftModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  giftTitle: string;
  promoCode: string;
}

export function GiftModal({ open, onOpenChange, giftTitle, promoCode }: GiftModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Используем современный Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(promoCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        console.log('Промокод скопирован:', promoCode);
        return;
      }
      
      // Fallback для старых браузеров
      throw new Error('Clipboard API not available');
      
    } catch (err) {
      console.error('Clipboard API failed:', err);
      
      // Пробуем старый метод как fallback
      try {
        const textArea = document.createElement('textarea');
        textArea.value = promoCode;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          console.log('Промокод скопирован через fallback:', promoCode);
          return;
        }
      } catch (fallbackErr) {
        console.error('Fallback also failed:', fallbackErr);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-black text-white border border-white/20 p-0 overflow-hidden [&>button]:text-white [&>button]:hover:text-white [&>button]:hover:bg-white/10 [&>button]:transition-all [&>button]:hover:scale-110 [&>button]:hover:rotate-90">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative p-8 md:p-12"
        >
          {/* Content */}
          <div className="relative z-10">
            <DialogTitle className="sr-only">Твой подарок</DialogTitle>
            <DialogDescription className="sr-only">
              Используй промокод ниже, чтобы получить свой подарок
            </DialogDescription>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 md:mb-12"
            >
              <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-6">
                ПОДАРОК
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
                {giftTitle}
              </h2>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                Наверное нужно будет используй промокод ниже, чтобы что то произошло... 
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="border border-white/20 p-8"
            >
              <div className="space-y-6">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
                    ПРОМОКОД
                  </p>
                  <p className="text-2xl md:text-3xl font-mono tracking-wider mb-6">
                    {promoCode}
                  </p>
                </div>
                <motion.button
                  onClick={handleCopy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-black px-6 py-4 hover:bg-gray-200 transition-colors duration-200 text-sm tracking-wider uppercase font-semibold"
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  {copied ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      Скопировано!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Copy className="w-5 h-5" />
                      Копировать код
                    </span>
                  )}
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-gray-500">
                * Все отправляем в тг и согласовываем дату....
              </p>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}