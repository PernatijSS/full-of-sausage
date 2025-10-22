import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Emoji {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
}

export function FloatingEmojis() {
  const [emojis] = useState<Emoji[]>(() => {
    const emojiList = ["🎂", "🎉", "🎁", "✨", "🎈", "💫", "🌟", "🎊"];
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }));
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {emojis.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: "100vh", opacity: 0, rotate: 0 }}
          animate={{
            y: "-100vh",
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${item.x}%`,
            fontSize: "2rem",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}
