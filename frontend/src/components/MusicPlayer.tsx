import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
// ИМПОРТИРУЕМ АУДИО ФАЙЛ
import audioFile from "../assets/Radiohead All I Need.mp3";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
                // Устанавливаем громкость в %
        audioRef.current.volume = 0.15;
        // ВОТ ЭТА СТРОКА ВАЖНА - добавляем воспроизведение
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
        console.log("Radiohead - All I Need");
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="fixed top-4 right-4 md:top-8 md:right-8 z-50 flex items-center gap-3"
    >
      {/* Информация о текущем воспроизведении — отображается, когда воспроизводится музыка. */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 10, width: 0 }}
            animate={{ opacity: 1, x: 0, width: "auto" }}
            exit={{ opacity: 0, x: 10, width: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-black border border-white/30 px-3 py-2 flex items-center gap-2 whitespace-nowrap">
              <span className="text-white text-xs tracking-wider hidden sm:inline">
                Radiohead - All I Need
              </span>
              <span className="text-white text-xs tracking-wider sm:hidden">
                Radiohead - All I Need
              </span>
              {/* Звуковая волна анимация */}
              <div className="flex gap-0.5 items-center">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-white"
                    animate={{
                      height: ["4px", "12px", "4px"],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Кнопка «Воспроизведение/Пауза» */}
      <motion.button
        onClick={togglePlay}
        className="w-10 h-10 border border-white/30 hover:border-white flex items-center justify-center transition-colors duration-300 bg-black shrink-0"
        aria-label={isPlaying ? "Pause music" : "Play music"}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-white" />
        ) : (
          <Play className="w-4 h-4 text-white ml-0.5" />
        )}
      </motion.button>

      {/* Аудиоэлемент с импортированным источником */}
      <audio ref={audioRef} loop>
        <source src={audioFile} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </motion.div>
  );
}
