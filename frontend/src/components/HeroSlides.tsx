import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Mouse } from "lucide-react";

import slideImage1 from "figma:asset/e19a773782dae8fbf826f97faab569e90fafc57d.png";
import slideImage2 from "figma:asset/955b161b7a485da63e279ee73f09e10e329c7e04.png";
import slideImage3 from "figma:asset/cd574ccfe511221f260233004e9cc11a57382f39.png";

interface Slide {
  category: string;
  title: string;
  description: string;
  year: string;
  image: string;
}

const slides: Slide[] = [
  {
    category: "КОФЕЙНАЯ ТЕРАПИЯ",
    title: "Wi-Fi и кофе навсегда",
    description: "Желаю, чтобы Wi-Fi всегда был стабильным, а кофе — не заканчивался ☕️",
    year: "2024",
    image: slideImage2,
  },
  {
    category: "В МИР ЧИПСОВ И СУХАРИКОВ",
    title: "Добро пожаловать",
    description: "Пусть жизнь будет такой же крутой и яркой, как эта картинка!",
    year: "2024",
    image: slideImage3,
  },
  {
    category: "СКОРОСТЬ И СТИЛЬ",
    title: "На полной скорости",
    description: "Пусть твоя жизнь мчится вперёд стильно и без тормозов 🏎️",
    year: "2024",
    image: slideImage1,
  },
];

export function HeroSlides() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxX = useTransform(mouseX, [0, 1], [-20, 20]);
  const parallaxY = useTransform(mouseY, [0, 1], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY, currentTarget } = e;
      const target = currentTarget as Window;
      mouseX.set(clientX / target.innerWidth);
      mouseY.set(clientY / target.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      nextSlide();
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      prevSlide();
    }
  };

  const currentData = slides[currentSlide];

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex h-full flex-col md:flex-row">
        {/* Left Panel - Fixed */}
        <div className="w-full md:w-[40%] lg:w-[35%] bg-black text-white flex flex-col justify-between p-8 md:p-12 lg:p-16 relative z-10">
          {/* Header */}
          <div>
            <div
              className="border border-white/20 inline-block px-4 py-3 mb-8 cursor-default"
            >
              <h1
                className="text-xs tracking-[0.2em] uppercase text-left"
              >
                HAPPY BIRTHDAY
                <br />
                ЯНА
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-6">
                  {currentData.category}
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
                  {currentData.title}
                </h2>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-md">
                  {currentData.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-2">
                Age
              </p>
              <p className="text-sm tracking-wider">24 года, самый сок...</p>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-2 text-gray-500"
            >
              <Mouse className="w-4 h-4" />
              <span className="text-xs tracking-wider uppercase">Scroll</span>
            </motion.div>
          </div>
        </div>

        {/* Right Panel - Image for Desktop */}
        <div className="hidden md:block md:w-[60%] lg:w-[65%] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center bg-black"
            >
              <motion.img
                src={currentData.image}
                alt={currentData.title}
                className="w-full h-full object-contain"
                style={{
                  x: parallaxX,
                  y: parallaxY,
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-white/30 hover:border-white hover:bg-white/10 flex items-center justify-center transition-all duration-300 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-white/30 hover:border-white hover:bg-white/10 flex items-center justify-center transition-all duration-300 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Mobile Image Section */}
        <div className="md:hidden relative h-[35vh] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center bg-black"
            >
              <img
                src={currentData.image}
                alt={currentData.title}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </AnimatePresence>

          {/* Minimal swipe indicator */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-0.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-8 md:px-12 lg:px-16 py-4 flex items-center justify-between">
          <span className="text-white text-sm tracking-wider font-mono">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <div className="flex-1 mx-8 h-[1px] bg-white/20 relative">
            <motion.div
              className="absolute left-0 top-0 h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-white/50 text-sm tracking-wider font-mono">
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}