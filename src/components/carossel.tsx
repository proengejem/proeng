"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel"; // Corrigido para caminho relativo
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface ConferenceCard {
  name: string;
  location: string;
  flag: string;
  logo: string;
}

const conferences: ConferenceCard[] = [
  {
    name: "COBRAE",
    location: "Brasil",
    flag: "/brasil.jpg",
    logo: "/cobramseg.png",
  },
  {
    name: "PANAM",
    location: "Buenos Aires",
    flag: "/bandeira argentina.webp",
    logo: "/panam.png",
    // logo: "/Panam.png",
  },
  {
    name: "18 CNG",
    location: "Portugal",
    flag: "/bandeira de portugal.webp",
    logo: "/18CNG.png",
    // logo: "/18CNG.png",
  },
  {
    name: "GEOMEAST",
    location: "Cairo",
    flag: "/cairo.webp",
    logo: "/geomeast.png",
    // logo: "/GEOMEAST.jpg",
  },
  {
    name: "GEOSUL",
    location: "Brasil",
    flag: "/brasil.jpg",
    logo: "/geosul.jpg",
    // logo: "/geosul.png",
  },
];

export default function ConferenceCarousel() {
  const plugin = useRef(Autoplay({ delay: 1750, stopOnInteraction: false }));

  return (
    <section className="w-full  py-8">
      <Carousel
        plugins={[plugin.current]}
        className="mx-auto w-full max-w-6xl"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {conferences.map((conference, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <div className="h-full">
                <div className="relative mx-2 h-full overflow-hidden rounded-lg">
                  <div className="flex h-full flex-col items-center justify-center bg-[#006241] p-4">
                    <div className="relative mb-4 h-32 w-32">
                      <Image
                        src={conference.logo}
                        alt={`${conference.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {conference.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-white">{conference.location}</span>
                      <div className="relative h-4 w-6">
                        <Image
                          src={conference.flag}
                          alt={`${conference.location} flag`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
