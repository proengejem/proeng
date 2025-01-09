"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projectImages = [
  "/Estaca Raiz.jpeg?height=600&width=1200",
  "/Estaca Helice.jpeg?height=600&width=1200",
  "/Solo Grampeado.jpeg?height=600&width=1200",
  // "/placeholder.svg?height=600&width=1200",
];

export function ProjectHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + projectImages.length) % projectImages.length,
    );
  };

  return (
    <div className="bg-gray-100">
      {/* Imagem Central */}
      <div className="relative mx-auto max-w-4xl">
        <img
          src={projectImages[currentImageIndex]}
          alt={`Project image ${currentImageIndex + 1}`}
          className="h-[400px] w-full rounded-lg object-cover shadow-lg"
        />

        {/* Botões de navegação */}
        <button
          onClick={prevImage}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 p-2 text-gray-800 shadow hover:bg-gray-100"
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 p-2 text-gray-800 shadow hover:bg-gray-100"
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}
