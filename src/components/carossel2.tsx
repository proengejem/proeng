"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { X } from "lucide-react";
import Image from "next/image";

interface ProjectCarouselProps {
  project: {
    id: number;
    title: string;
    images: string[];
  };
  onClose: () => void;
}

export function ProjectCarousel({ project, onClose }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="h-[90vh] w-full max-w-7xl p-0">
        <div className="relative h-full">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <Carousel className="h-full w-full">
            <CarouselContent className="h-full">
              {project.images.map((image, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="relative h-full">
                  <Image
  src={image}
  alt={`${project.title} - Image ${index + 1}`}
  width={800} // Defina a largura
  height={600} // Defina a altura
  className="h-full w-full object-cover"
/>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                      <h2 className="text-2xl font-bold">{project.title}</h2>
                      <p className="text-sm">
                        Image {currentIndex + 1} of {project.images.length}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
}
