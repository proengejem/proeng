"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projectImages = [
  "/Estaca Raiz.jpeg?height=600&width=1200",
  "/Estaca Raiz.jpeg?height=600&width=1200",
  "/Estaca Raiz.jpeg?height=600&width=1200",
  "/placeholder.svg?height=600&width=1200",
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
    <div className="relative h-[calc(100vh-4rem)] bg-gray-900">
      <div className="absolute inset-0">
        <img
          src={projectImages[currentImageIndex]}
          alt={`Project image ${currentImageIndex + 1}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <h1 className="mb-2 text-4xl font-bold">Nome obra 01</h1>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/40"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/40"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {projectImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-3 w-3 rounded-full ${
              index === currentImageIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
