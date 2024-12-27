"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import EstacaRaiz from "public/Estaca Raiz.jpeg";

type MediaType = "photo" | "video";

export default function PortfolioPage() {
  const [mediaType, setMediaType] = useState<MediaType>("photo");

  return (
    <>
      {/* Hero Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="mb-2 text-4xl font-bold">Portifólio</h1>
        <p className="text-lg">
          Explore nossa variedade de projetos inovadores.
        </p>
      </div>

      {/* Decorative diagonal line */}
      <div className="absolute right-0 h-12 w-1/3 -skew-y-6 transform bg-white"></div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid items-start gap-12 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-3xl font-bold">Solo Grampeado</h2>
              <p className="mb-6 text-gray-600">
                Nossos serviços são projetados para atender às suas necessidades
                específicas. Experimente a eficiência e a qualidade que
                oferecemos.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="mb-2 font-bold">Qualidade Garantida</h3>
                <p className="text-sm text-gray-600">
                  Entregamos resultados excepcionais em todos os projetos que
                  realizamos.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="mb-2 font-bold">Soluções Personalizadas</h3>
                <p className="text-sm text-gray-600">
                  Adaptamos nossos serviços para se adequar às sua projeto
                  único.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setMediaType("photo")}
                className={`rounded border px-6 py-2 transition-colors ${
                  mediaType === "photo"
                    ? "border-emerald-800 bg-emerald-800 text-white"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                Fotos
              </button>
              <button
                onClick={() => setMediaType("video")}
                className={`rounded border px-6 py-2 transition-colors ${
                  mediaType === "video"
                    ? "border-emerald-800 bg-emerald-800 text-white"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                Vídeos
              </button>
            </div>
          </div>

          {/* Right Column - Image/Video Section */}
          <div className="relative">
            {mediaType === "photo" ? (
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/Estaca Raiz.jpeg"
                  alt="Solo Grampeado Project Photo"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-900">
                <Image
                  src="/placeholder.svg"
                  alt="Solo Grampeado Project Video"
                  fill
                  className="object-cover opacity-90"
                />
                <button className="group absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40">
                  <Play className="h-16 w-16 text-white opacity-80 group-hover:opacity-100" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
