"use client";

import { useState, memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Optimized spring config for smoother animations
const springConfig = {
  type: "spring" as const,
  stiffness: 200,
  damping: 25,
};

interface LetterProps {
  onProceed: () => void;
}

// Greeting cards from different people
const greetingCards = [
  {
    id: 1,
    from: "น้องไอซ์",
    emoji: "🎂",
    sticker: "/stickers/ice_sticker.png",
    title: "สุขสันต์วันเกิดพ่อนุ้ย",
    messages: [
      "ขอให้พ่อนุ้ยมีสุขภาพแข็งแรง",
      "อยู่กับน้องอายุยืนๆ",
      "ขอให้รวยๆ เลยนะพ่อนุ้ย",
      "สุดยอดเลยนะ",
    ],
    closing: "รักพ่อนุ้ยที่สุดเลยนะ 💖",
  },
  {
    id: 2,
    from: "พี่เตย",
    emoji: "🎂",
    title: "สุขสันต์วันเกิดพ่อนุ้ย 💖",
    messages: [
      "ขอให้มีสุขภาพแข็งแรง",
      "ไม่เจ็บไม่ป่วย",
      "พบเจอแต่สิ่งดีๆ",
      "เข้ามาในชีวิตค่ะะ",
    ],
    closing: "พระคุ้มครองค่ะะ 🙏🏻💖",
  },
];

function Letter({ onProceed }: LetterProps) {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    if (currentCard < greetingCards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      onProceed();
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 py-10 no-select"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stacked cards container */}
      <div className="relative w-full max-w-[340px] md:max-w-[480px] h-[480px] md:h-[620px]">
        {greetingCards.map((card, index) => {
          const isActive = index === currentCard;
          const isBehind = index > currentCard;
          const isPassed = index < currentCard;

          // Calculate offset for stacked effect
          const offsetX = isBehind ? (index - currentCard) * 20 : 0;
          const offsetY = isBehind ? (index - currentCard) * 15 : 0;
          const rotation = isBehind ? (index - currentCard) * 3 : 0;
          const scale = isBehind ? 1 - (index - currentCard) * 0.05 : 1;

          return (
            <motion.div
              key={card.id}
              className={`absolute inset-0 w-full bg-white rounded-3xl px-8 shadow-xl will-change-transform flex flex-col items-center justify-center ${isActive ? "cursor-pointer" : ""}`}
              initial={false}
              animate={{
                x: isPassed ? -400 : offsetX,
                y: offsetY,
                rotate: isPassed ? -15 : rotation,
                scale: isPassed ? 0.9 : scale,
                opacity: isPassed ? 0 : isBehind ? 0.8 : 1,
                zIndex: greetingCards.length - index,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{
                transformOrigin: "bottom left",
              }}
              onClick={isActive ? nextCard : undefined}
              whileTap={isActive ? { scale: 0.98 } : undefined}
            >
              {/* Card indicator */}
              <div className="absolute top-4 right-4 text-sm text-gray-400">
                {index + 1} / {greetingCards.length}
              </div>

              {/* Sticker or emoji */}
              <div className="text-center mb-4 md:mb-8">
                {card.sticker ? (
                  <Image
                    src={card.sticker}
                    alt={card.from}
                    width={100}
                    height={100}
                    className="mx-auto w-[100px] h-[100px] md:w-[140px] md:h-[140px]"
                  />
                ) : (
                  <span className="text-5xl md:text-7xl">{card.emoji}</span>
                )}
              </div>

              {/* Greeting */}
              <div className="text-center space-y-4 md:space-y-6">
                {/* Title */}
                <p className="text-2xl md:text-3xl font-medium text-gray-700">
                  {card.title}
                </p>

                {/* Message */}
                <div className="text-lg md:text-xl text-gray-600 leading-relaxed space-y-1 md:space-y-3">
                  {card.messages.map((msg, idx) => (
                    <p key={idx}>{msg}</p>
                  ))}
                </div>

                {/* Closing */}
                <p className="text-xl md:text-2xl text-gray-600 pt-1 md:pt-2">
                  {card.closing}
                </p>

                {/* From */}
                <div className="pt-2 md:pt-3">
                  <p className="text-base md:text-lg text-pink-400 font-medium">
                    — {card.from} 💌
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Next button - only show on last card */}
      {currentCard === greetingCards.length - 1 && (
        <motion.button
          className="mt-8 text-pink-400 hover:text-pink-500 transition-colors flex items-center gap-1"
          onClick={onProceed}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span>ไปต่อ</span>
          <span>→</span>
        </motion.button>
      )}
    </motion.div>
  );
}

export default memo(Letter);
