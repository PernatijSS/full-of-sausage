import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

interface Wish {
  number: string;
  title: string;
  description: string;
}

const wishes: Wish[] = [
  {
    number: "01",
    title: "Путь к мечтам",
    description: "С днём рождения! Пусть мечты становятся реальностью, цели достигаются без преград, а рядом всегда будут близкие люди.",
  },
  {
    number: "02",
    title: "Гармония в мелочах",
    description: "Поздравляю! Пусть жизнь радует мелочами, душа будет спокойна, а каждый момент приносит удовольствие и покой.",
  },
  {
    number: "03",
    title: "Свет каждый день",
    description: "Поздравляю с праздником! Желаю, чтобы каждый день приносил светлые новости, вдохновение и внутреннюю гармонию.",
  },
  {
    number: "04",
    title: "Энергия жизни",
    description: "С твоим днём! Желаю энергии, любви к жизни, веры в себя и людей рядом. Пусть всё складывается как хочется!",
  },
];

function WishCard({ wish, index }: { wish: Wish; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ 
        scale: 1.02,
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        transition: { duration: 0.3 }
      }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="border-t border-white/10 pt-8 px-4 py-2 rounded-lg"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
        className="text-sm text-gray-500 mb-6 font-mono"
      >
        {wish.number}
      </motion.p>
      
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        whileHover={{ 
          x: 10,
          scale: 1.05,
          color: "#fbbf24",
          transition: { duration: 0.3 }
        }}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
        className="text-2xl md:text-3xl mb-6 cursor-default"
      >
        {wish.title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
        className="text-sm md:text-base text-gray-400 leading-relaxed cursor-default"
      >
        {wish.description}
      </motion.p>

      {/* Fun emoji animation on hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.3, scale: 0.5 } : {}}
        whileHover={{ 
          opacity: 1, 
          scale: [1, 1.2, 1],
          rotate: [0, -15, 15, -15, 0],
          y: [0, -10, 0],
          transition: { duration: 0.6 }
        }}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.5 }}
        className="absolute top-4 right-4 text-4xl cursor-pointer"
      >
        {index === 0 ? "🎬" : index === 1 ? "😊" : index === 2 ? "✨" : "💡"}
      </motion.div>
    </motion.div>
  );
}

export function WishesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="min-h-screen bg-black text-white py-20 px-8"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl max-w-4xl">
            Типикал кринж поздравления
          </h2>
        </motion.div>

        {/* Wishes Grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {wishes.map((wish, index) => (
            <div key={index} className="relative">
              <WishCard wish={wish} index={index} />
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent origin-center"
        />
      </div>
    </section>
  );
}