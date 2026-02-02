"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronUp } from "lucide-react";

interface EnvelopeProps {
  onOpen: () => void;
  isOpening: boolean;
}

function Envelope({ onOpen, isOpening }: EnvelopeProps) {
  const handleEnvelopeClick = () => {
    if (isOpening) return;
    onOpen();
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-6 no-select"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {/* Cute envelope image - large touch target */}
      <motion.div
        className="relative cursor-pointer p-4 will-change-transform"
        animate={
          isOpening ? { scale: 1.05, y: -20, opacity: 0 } : { y: [0, -6, 0] }
        }
        transition={
          isOpening
            ? { duration: 0.4, ease: "easeOut" }
            : {
                y: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }
        }
        onClick={handleEnvelopeClick}
        whileTap={!isOpening ? { scale: 0.97 } : undefined}
      >
        <Image
          src="/images/envelope.png"
          alt="Love Letter"
          width={400}
          height={300}
          className="w-[280px] sm:w-[320px] md:w-[400px] h-auto drop-shadow-lg"
          priority
        />
      </motion.div>

      {/* Minimal stacked chevrons CTA - simplified animation */}
      {!isOpening && (
        <div className="mt-2 flex flex-col items-center gap-0">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="will-change-opacity"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            >
              <ChevronUp
                className="w-7 h-7 text-pink-400 -my-2"
                strokeWidth={1.5}
              />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default memo(Envelope);
