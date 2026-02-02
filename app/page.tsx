"use client";

import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Envelope from "@/components/Envelope";
import Letter from "@/components/Letter";
import Gallery, { mediaItems } from "@/components/Gallery";
import Image from "next/image";

type Stage = "envelope" | "letter" | "gallery";

export default function Home() {
  const [stage, setStage] = useState<Stage>("envelope");
  const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // ลดเสียงลงเป็น 30%
      audioRef.current.play().catch((error) => {
        console.log("Audio play failed:", error);
      });
    }
  };

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpening(true);
    startMusic(); // เริ่มเพลงตอนคลิกซอง
    // Wait for envelope animation then transition to letter
    setTimeout(() => {
      setStage("letter");
    }, 1200);
  };

  const handleProceedToGallery = () => {
    setStage("gallery");
  };

  return (
    <main className="min-h-screen min-h-[100dvh] overflow-hidden">
      {/* Background music - อยู่ที่ระดับ page เพื่อเล่นต่อเนื่อง */}
      <audio
        ref={audioRef}
        src="/music/birthday-song.mp3"
        loop
        preload="auto"
      />

      <AnimatePresence mode="wait">
        {stage === "envelope" && (
          <Envelope
            key="envelope"
            onOpen={handleEnvelopeOpen}
            isOpening={isEnvelopeOpening}
          />
        )}
        {stage === "letter" && (
          <Letter key="letter" onProceed={handleProceedToGallery} />
        )}
        {stage === "gallery" && <Gallery key="gallery" />}
      </AnimatePresence>

      {/* Hidden image preloader - loads images while user is reading the letter */}
      {stage === "letter" && (
        <div className="fixed opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
          {mediaItems
            .filter((item) => item.type === "photo")
            .slice(0, 4) // Preload first 4 photos
            .map((item) => (
              <Image
                key={item.id}
                src={item.src}
                alt="preload"
                width={400}
                height={600}
                priority
              />
            ))}
        </div>
      )}
    </main>
  );
}
