"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { useState } from "react";
import ProengLogo from "public/ProengLogo.png";
import SoloGrampeado from "public/Solo Grampeado.jpeg";

type MediaType = "photo" | "video";

export default function Portfolio() {
  const [mediaType, setMediaType] = useState<MediaType>("photo");

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */} 
       <nav className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-shrink-0">
              <Image
                src="/ProengLogo.png"
                alt="Proeng Geotecnia"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <div className="hidden space-x-8 md:flex">
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link
                href="/empresa"
                className="text-gray-700 hover:text-gray-900"
              >
                Empresa
              </Link>
              <Link
                href="/servicos"
                className="text-gray-700 hover:text-gray-900"
              >
                Serviços
              </Link>
              <Link
                href="/obras-executadas"
                className="text-gray-700 hover:text-gray-900"
              >
                Obras Executadas
              </Link>
              <Link
                href="/videos"
                className="text-gray-700 hover:text-gray-900"
              >
                Vídeos
              </Link>
              <Link
                href="/contato"
                className="text-gray-700 hover:text-gray-900"
              >
                Contato
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <Image
          src="/headerportifolio.jpg?height=200&width=1920"
          alt="Portfolio header"
          width={1920}
          height={200}
          className="w-full object-cover"
        />
        {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="mb-2 text-4xl font-bold">.</h1>
          <p className="text-lg"></p>
        </div> */}
      </div>

      {/* Decorative diagonal line */}
      {/* <div className="absolute right-0 h-12 w-1/3 -skew-y-6 transform bg-white">
        .
      </div> */}

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
                  src="/Solo Grampeado.jpeg"
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