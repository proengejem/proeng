"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projectImages = [
  "/Estaca Raiz.jpeg?height=600&width=1200",
  "/Estaca Helice.jpeg?height=600&width=1200",
  "/Solo Grampeado.jpeg?height=600&width=1200",
  "/placeholder.svg?height=600&width=1200",
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export function ProjectHero() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const imageIndex = Math.abs(page % projectImages.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setTimeout(() => {
        paginate(1);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [page, isAutoPlaying]);

  return (
    <div className="bg-gray-100">
      <div className="relative mx-auto h-[400px] max-w-4xl overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={projectImages[imageIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute h-[400px] w-full rounded-lg object-cover shadow-lg"
            alt={`Project image ${imageIndex + 1}`}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          />
        </AnimatePresence>

        {/* Navigation buttons */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white/70 p-2 text-gray-800 shadow"
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white/70 p-2 text-gray-800 shadow"
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </motion.button>

        {/* Image indicators */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
          {projectImages.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full ${index === imageIndex ? "bg-white" : "bg-white/50"}`}
              initial={false}
              animate={{
                width: index === imageIndex ? 16 : 8,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
