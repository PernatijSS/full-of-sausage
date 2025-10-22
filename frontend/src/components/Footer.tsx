import { motion, useMotionValue, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Send, Heart } from "lucide-react";

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [isHeartHovered, setIsHeartHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgX = useTransform(mouseX, [0, 1], [-20, 20]);
  const bgY = useTransform(mouseY, [0, 1], [-20, 20]);

  return (
    <footer ref={ref} className="bg-black text-white border-t border-white/10">
      <div className="container mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h3 
              className="text-3xl md:text-4xl lg:text-5xl mb-4"
              whileHover={{
                scale: 1.05,
                color: "#fbbf24",
                transition: { duration: 0.3 }
              }}
            >
              С днём рождения, Яна! 🎉
            </motion.h3>
            <p className="text-base md:text-lg text-gray-400">
              Пусть этот год будет самым невероятным, если нужна поддержка или просто чилл то ты всегда можешь написать
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.a
              href="https://t.me/PernatyjSS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm tracking-wider uppercase text-gray-400 hover:text-white transition-colors duration-300 group relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                <Send className="w-5 h-5" />
              </motion.div>
              <span>Написать в Telegram</span>
              
              {/* Heart icon that appears on hover */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2"
              >
                <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}