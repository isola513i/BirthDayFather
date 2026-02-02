"use client";

import { useState, useRef, useEffect, memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Media items - can be photos or videos
export const mediaItems = [
  { id: 1, type: "photo", src: "/photos/photo1.jpg" },
  { id: 2, type: "photo", src: "/photos/photo2.jpg" },
  { id: 3, type: "photo", src: "/photos/photo3.jpg" },
  { id: 4, type: "photo", src: "/photos/photo4.jpg" },
  { id: 5, type: "photo", src: "/photos/photo5.jpg" },
  { id: 6, type: "video", src: "/videos/video1.mp4" },
  { id: 7, type: "video", src: "/videos/video2.mp4" },
  { id: 8, type: "video", src: "/videos/video3.mp4" },
];

// Reduced particles for better performance on low-spec devices (10 instead of 20)
const particles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  emoji: ["✨", "🎂", "🎉", "🎈", "💖"][i % 5],
  x: Math.random() * 100,
  delay: Math.random() * 3,
  duration: 4 + Math.random() * 3,
}));

// Optimized spring config for smoother animations on low-spec devices
const springConfig = {
  type: "spring" as const,
  stiffness: 200,
  damping: 25,
};

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipeThreshold = 50;
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  useEffect(() => {
    // Only control videos that are adjacent to current
    [-1, 0, 1].forEach((offset) => {
      const index = currentIndex + offset;
      if (index >= 0 && index < mediaItems.length) {
        const item = mediaItems[index];
        if (item.type === "video" && videoRefs.current[index]) {
          if (index === currentIndex) {
            videoRefs.current[index]?.play().catch(() => {});
          } else {
            videoRefs.current[index]?.pause();
          }
        }
      }
    });
  }, [currentIndex]);

  const paginate = (direction: number) => {
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) {
      nextIndex = mediaItems.length - 1;
    } else if (nextIndex >= mediaItems.length) {
      nextIndex = 0;
    }
    setCurrentIndex(nextIndex);
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeDistance = info.offset.x;
    if (swipeDistance > swipeThreshold) {
      paginate(-1);
    } else if (swipeDistance < -swipeThreshold) {
      paginate(1);
    }
  };

  const getRelativePosition = (index: number) => {
    const diff = index - currentIndex;
    const total = mediaItems.length;
    if (diff > total / 2) return diff - total;
    if (diff < -total / 2) return diff + total;
    return diff;
  };

  const getCardStyle = (index: number) => {
    const diff = getRelativePosition(index);
    if (diff === 0) {
      return { x: 0, scale: 1, zIndex: 30, opacity: 1 };
    } else if (
      diff === -1 ||
      (currentIndex === 0 && index === mediaItems.length - 1)
    ) {
      return { x: -120, scale: 0.85, zIndex: 20, opacity: 0.7 };
    } else if (
      diff === 1 ||
      (currentIndex === mediaItems.length - 1 && index === 0)
    ) {
      return { x: 120, scale: 0.85, zIndex: 20, opacity: 0.7 };
    } else {
      return { x: diff < 0 ? -200 : 200, scale: 0.7, zIndex: 10, opacity: 0 };
    }
  };

  const isCardVisible = (index: number) => {
    const diff = getRelativePosition(index);
    return Math.abs(diff) <= 1;
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen px-4 no-select overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Reduced floating particles for performance */}
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute text-xl pointer-events-none will-change-transform"
          style={{ left: `${particle.x}%` }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-20vh",
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        >
          {particle.emoji}
        </motion.span>
      ))}

      {/* Header text */}
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        🎂 Happy Birthday พ่อนุ้ย 🎂
      </motion.h1>

      {/* Date text */}
      <motion.p
        className="text-lg text-white/80 mb-6 md:mb-10 text-center -mt-4 md:-mt-6 font-bold pt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        2 กุมภาพันธ์ 2569
      </motion.p>

      {/* Carousel container */}
      <motion.div
        className="relative w-full h-[65dvh] flex items-center justify-center touch-pan-y"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
      >
        {mediaItems.map((item, index) => {
          const style = getCardStyle(index);
          const visible = isCardVisible(index);

          // Skip rendering non-visible cards for performance
          if (!visible) return null;

          return (
            <motion.div
              key={item.id}
              className="absolute w-[70vw] max-w-[280px] md:max-w-[400px] h-[55dvh] md:h-[60dvh] rounded-3xl overflow-hidden shadow-2xl cursor-pointer bg-gray-900 will-change-transform"
              animate={style}
              transition={springConfig}
              onClick={() => {
                const diff = getRelativePosition(index);
                if (diff === 0) {
                  paginate(1);
                } else if (
                  diff === -1 ||
                  (currentIndex === 0 && index === mediaItems.length - 1)
                ) {
                  paginate(-1);
                } else if (
                  diff === 1 ||
                  (currentIndex === mediaItems.length - 1 && index === 0)
                ) {
                  paginate(1);
                }
              }}
            >
              {item.type === "video" ? (
                <div className="w-full h-full relative bg-black">
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={item.src}
                    className="absolute inset-0 w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <Image
                    src={item.src}
                    alt={`Photo ${item.id}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 70vw, 280px"
                    priority={index <= 2}
                    loading={index <= 2 ? "eager" : "lazy"}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Dots indicator */}
      <div className="flex gap-2 mt-6">
        {mediaItems.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              index === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default memo(Gallery);
