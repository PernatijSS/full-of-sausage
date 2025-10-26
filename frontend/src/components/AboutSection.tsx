import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";

import yanaPhoto from "figma:asset/5b966b0a6a2bde9de4fecb70c9549cd3c376dd7e.png";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) / (rect.width / 2);
    const distanceY = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(distanceX);
    mouseY.set(distanceY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <section
      ref={ref}
      className="min-h-screen bg-[#e8e8e8] text-black flex items-center py-20 px-6 md:px-8"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setIsHovered(true)}
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
          }}
          className="bg-white border border-gray-300 p-8 md:p-12 lg:p-16"
        >
          <div className="grid md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr] gap-8 md:gap-12 lg:gap-20">
            {/* Left side - Photo and Name */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                whileHover={{ scale: 1.05, rotateZ: 2 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="border-2 border-black p-3 mb-8 cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <motion.img
                    src={yanaPhoto}
                    alt="Яна"
                    className="w-full h-full object-cover"
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl"></h3>
              </motion.div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-6">
                  PLIN PLIN PLON
                </p>
                <motion.h2 
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-2 leading-tight"
                  whileHover={{ 
                    scale: 1.05,
                    color: "#c52e8bff",
                    transition: { duration: 0.3 }
                  }}
                >
                  Яна,
                </motion.h2>
                <motion.h2 
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-8 md:mb-12 leading-tight"
                  whileHover={{ 
                    x: 10,
                    transition: { duration: 0.3 }
                  }}
                >
                  с днём рождения!
                </motion.h2>
              </motion.div>

              <div className="grid md:grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="space-y-6"
                >
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    Хочу сказать тебе самые простые, но самые важные слова: спасибо, что ты есть. 
                    Ты стала для меня по - настоящему близким человеком, и я бесконечно рад, что в моей жизни появился кто-то, с кем мне тепло, спокойно и хорошо. 
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    Меня восхищает, как ты смотришь на мир. Ты умеешь сочетать уверенность взрослого человека и ту самую искренность, что идёт изнутри. 
                    В тебе есть стремление - ставить цели, идти к ним спокойно и по-взрослому. 
                    И рядом с этим - твоя живая, настоящая часть: то, как ты радуешься новой игре, как горят глаза, когда рассказывала мне то, что с тобой произошло. Никогда не забуду про то, как ты мне рассказывала сюжет Death Stranding 2.
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    Я верю, что у тебя этот год - будет насыщенным и светлым!
                  </p>

                  <div className="pt-4">
                    <p className="text-xs tracking-[0.2em] uppercase text-gray-400">
                    </p>
                  </div>
                </motion.div>

                {/* Quote box */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="border-t-2 border-black pt-6"
                >
                  <p className="text-xs uppercase leading-relaxed tracking-wide">
                    ГЛАВНОЕ, ЧТО НУЖНО ЗНАТЬ: Ты замечательная. И я хочу, чтобы ты всегда об этом помнила. 
                    Ты справишься со всем.
                    Оставайся такой же - настоящей. Такой, какая ты есть.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}