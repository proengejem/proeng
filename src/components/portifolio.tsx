"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { useState } from "react";
import ProengLogo from "public/ProengLogo.png";
import SoloGrampeado from "public/Solo Grampeado.jpeg";
import PortifolioHeader from "public/portifolio header.png";

type MediaType = "photo" | "video";

export default function Portfolio() {
  const [mediaType, setMediaType] = useState<MediaType>("photo");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <Image
          src="/portifolio header.png?height=200&width=1920"
          alt="Portfolio header"
          width={1920}
          height={200}
          className="w-full object-cover"
        />
      </div>
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
              {/* <button
                onClick={() => setMediaType("photo")}
                className={`rounded border px-6 py-2 transition-colors ${
                  mediaType === "photo"
                    ? "border-emerald-800 bg-emerald-800 text-white"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                Fotos
              </button> */}

                <Link href={{
      pathname: "/portifolioindiv", // Nome da página do segundo código
      query: { title: "Solo Grampeado" }, // Passa o título como parâmetro
    }}>
            <button className="px-6 py-3 bg-[#027A48] text-white rounded-lg font-semibold hover:bg-green-500 transition">
              Fotos
            </button>
            </Link>
              {/* <button
                onClick={() => setMediaType("video")}
                className={`rounded border px-6 py-2 transition-colors ${
                  mediaType === "video"
                    ? "border-emerald-800 bg-emerald-800 text-white"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                Vídeos
              </button> */}
              
          <a href="https://www.youtube.com/playlist?list=PLnLPCcEY60IAok3QEttHV3Mkxj87koWqk">
            <button className="rounded border px-6 py-3 bg-white text-green-500 rounded-lg font-semibold hover:bg-gray-200 transition" style={{ color: '#027A48' }}>
              Vídeos
            </button>
            </a>

              
            </div>
          </div>

          {/* Right Column - Image/Video Section */}
          <div className="relative">
            {mediaType === "photo" ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl">
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
    </div>
  );
}