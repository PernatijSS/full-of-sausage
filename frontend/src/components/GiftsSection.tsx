import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { GiftModal } from "./GiftModal";

import giftImage1 from "figma:asset/d2dd30bae84ba8c2811de92d757e3e0b3f30c7e8.png";
import giftImage2 from "figma:asset/ebb7f6681ea38fcdbeefd6abbfa9feafde7b14a4.png";

interface Gift {
  date: string;
  title: string;
  description: string;
  image: string;
  promoCode: string;
}

const gifts: Gift[] = [
  {
    date: "ОКТ 20, 2025",
    title: "Кулинарное приключение",
    description: "Потому что лучшие моменты рождаются на кухне, даже если с огоньком 🔥",
    image: giftImage1,
    promoCode: "YANA-COOKING-2025",
  },
  {
    date: "ОКТ 20, 2025",
    title: "День на природе",
    description: "Потому что лучшие воспоминания создаются за пределами зоны комфорта 🏕️",
    image: giftImage2,
    promoCode: "YANA-ADVENTURE-2025",
  },
];

function GiftCard({ gift, index }: { gift: Gift; index: number }) {
  const ref = useRef(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
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
  };

  const handleClick = () => {
    setSelectedGift(gift);
    setModalOpen(true);
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        onClick={handleClick}
        className="group cursor-pointer"
      >
        <motion.div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="border border-black/20 overflow-hidden hover:border-black/60 hover:shadow-2xl transition-all duration-500"
        >
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-gray-900">
            <motion.img
              src={gift.image}
              alt={gift.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              whileHover={{ scale: 1.1, rotate: 2 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700" />
            
            {/* Overlay text on image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-black/60"
            >
              <p className="text-white text-sm tracking-widest uppercase">
                Открыть подарок
              </p>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 bg-white border-t border-black/10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              className="text-xs tracking-[0.2em] uppercase text-gray-600 mb-4"
            >
              {gift.date}
            </motion.p>
            
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
              className="text-xl md:text-2xl mb-4 group-hover:text-gray-700 transition-colors duration-300"
            >
              {gift.title}
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
              className="text-sm text-gray-600 leading-relaxed"
            >
              {gift.description}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {selectedGift && (
        <GiftModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          giftTitle={selectedGift.title}
          promoCode={selectedGift.promoCode}
        />
      )}
    </>
  );
}

export function GiftsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="min-h-screen bg-white text-black py-20 px-6 md:px-8"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">
            Твои подарки
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
            Потому что ты заслуживаешь самое лучшее
          </p>
        </motion.div>

        {/* Gifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {gifts.map((gift, index) => (
            <GiftCard key={index} gift={gift} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}