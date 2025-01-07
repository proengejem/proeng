"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { useState } from "react";
import EstacaHelice from "public/Estaca Helice.jpeg";
type MediaType = "photo" | "video";

export default function Portfolio2() {
  const [mediaType, setMediaType] = useState<MediaType>("photo");

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 lg:p-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
          {/* Left Column - Image/Video Section */}
          <div className="relative">
            {mediaType === "photo" ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src="/Estaca Helice.jpeg"
                  alt="Estaca Raíz Project Photo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src="/Estaca Helice.jpeg"
                  alt="Estaca Raíz Project Video"
                  fill
                  className="object-cover"
                  priority
                />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 transition-colors hover:bg-opacity-30"
                  aria-label="Play video"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-black bg-opacity-50">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <div>
              <h1 className="mb-4 text-3xl font-bold">Estaca Raíz</h1>
              <p className="text-gray-600">
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
              {/* <button
                onClick={() => setMediaType("photo")}
                className={`rounded-lg border px-6 py-2 transition-colors ${
                  mediaType === "photo"
                    ? "border-emerald-800 bg-emerald-800 text-white"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                Fotos
              </button> */}
                <Link href={{
      pathname: "/portifolioindiv", // Nome da página do segundo código
      query: { title: "Estaca Raíz" }, // Passa o título como parâmetro
    }}>
            <button className="px-6 py-3 bg-[#027A48] text-white rounded-lg font-semibold hover:bg-green-500 transition">
              Fotos
            </button>
            </Link>
              {/* <button
                onClick={() => setMediaType("video")}
                className={`rounded-lg border px-6 py-2 transition-colors ${
                  mediaType === "video"
                    ? "border-emerald-800 bg-emerald-800 text-white"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                Vídeos
              </button> */}
                     
          <a href="https://www.youtube.com/playlist?list=PLnLPCcEY60IDsYO4a8NxMUaiRoNdUxbdG">
            <button className="rounded border px-6 py-3 bg-white text-green-500 rounded-lg font-semibold hover:bg-gray-200 transition" style={{ color: '#027A48' }}>
              Vídeos
            </button>
            </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
