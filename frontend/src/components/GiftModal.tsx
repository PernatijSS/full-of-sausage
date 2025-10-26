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
      // Создаем временный textarea для копирования
      const textArea = document.createElement('textarea');
      textArea.value = promoCode;
      
      // Делаем его невидимым
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.opacity = '0';
      textArea.style.pointerEvents = 'none';
      textArea.style.zIndex = '-1';
      
      document.body.appendChild(textArea);
      
      // Выделяем текст
      textArea.select();
      textArea.setSelectionRange(0, 99999); // Для мобильных устройств
      
      // Пытаемся скопировать старым методом (работает в iOS)
      const success = document.execCommand('copy');
      
      // Удаляем элемент
      document.body.removeChild(textArea);
      
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }
      
      // Если старый метод не сработал, пробуем современный
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(promoCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        throw new Error('Clipboard API not available');
      }
      
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback для iOS - показываем промокод для ручного копирования
      const fallbackText = document.createElement('div');
      fallbackText.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        color: black;
        padding: 20px;
        border-radius: 8px;
        z-index: 10000;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        border: 2px solid #000;
      `;
      fallbackText.innerHTML = `
        <div>${promoCode}</div>
        <div style="font-size: 14px; color: #666; margin-top: 10px;">Нажмите и удерживайте для копирования</div>
      `;
      document.body.appendChild(fallbackText);
      
      setTimeout(() => {
        if (document.body.contains(fallbackText)) {
          document.body.removeChild(fallbackText);
        }
      }, 3000);
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
                  <p className="text-2xl md:text-3xl font-mono tracking-wider mb-6 select-text bg-white/5 p-4 rounded">
                    {promoCode}
                  </p>
                </div>
                <motion.button
                  onClick={handleCopy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-black px-6 py-4 hover:bg-gray-200 transition-colors duration-200 text-sm tracking-wider uppercase"
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