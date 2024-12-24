"use client";
import Image from "next/image";
import Link from "next/link";
import Numero from "~/components/numeros";
import React from "react";
import Carossel from "~/components/carossel";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Navbar  from "~/components/navbar";
import { Footer1 }  from "~/components/ui/footer";
import { Navbar1 }  from "~/components/ui/navbar";


export default function Sobrenos() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar1 />
      <Navbar />

      <div className="flex min-h-screen flex-col">
        {/* Green header */}
        <div className="h-12 w-full bg-[#0B4D2C]" />
        <div
          className="relative flex flex-1 items-center justify-end text-right"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1)), url('/fundosobrenos.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto px-4 py-20">
            <div className="ml-auto max-w-2xl">
              <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                Desde{" "}
                <span className="text-5xl text-[#006241] md:text-6xl">
                  2006
                </span>
              </h1>
              <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                Construindo qualidade e confiança
                <br />
                No mercado da engenharia
              </h1>
            </div>
          </div>
        </div>
        {/* Main content */}
        <div className="relative flex flex-grow flex-col md:flex-row">
          {/* Background pattern */}
          <div className="absolute inset-0 overflow-hidden bg-[#3a4558]" />
          {/* Content container */}
          <div className="relative flex w-full flex-col items-center gap-8 bg-[#2A3444] bg-opacity-90 p-8 md:flex-row md:p-16">
            {/* Text content */}
            <div className="flex-1 space-y-6 text-white">
              <p className="text-lg leading-relaxed">
                A Proving Geotecnia é uma empresa de engenharia especializada na
                execução de obras de contenções, fundações, drenagem e
                tratamento de solos. Ingressou no mercado em maio de 2006 e já
                realizou mais de 1.500 obras até o presente momento.
              </p>
              <p className="text-lg leading-relaxed">
                A empresa se preocupa em manter-se atualizada, desenvolvendo
                novos metodologias e aprimorando as técnicas atualmente
                aplicadas nos serviços prestados, além de apoiar pesquisas
                incentivando trabalhos acadêmicos e científicos em nível de
                graduação, dissertações de mestrado e teses de doutorado,
                permitindo sua participação em trabalhos importantes.
              </p>
            </div>
            {/* Image */}
            <div className="max-w-md flex-1">
              <Image
                src="/trator.png"
                alt="Engineering equipment"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
        {/* Partners Section */}

        <div className="w-full bg-gray-200 p-4">
          <Carossel />
        </div>
      </div>
      {/* Stats Section */}
      <div className="relative flex min-h-[400px] w-full items-center bg-[#004d2e]">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('/placeholder.svg')`,
            backgroundBlendMode: "multiply",
          }}
        />
        {/* Content */}
        <div className="container relative z-10 mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-bold text-white">
            NÚMEROS
          </h2>
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-6xl font-bold text-white">
                <Numero n={1500} />
              </div>
              <div className="text-xl uppercase text-white">
                Obras Realizadas
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-6xl font-bold text-white">
                <Numero n={13} />
              </div>
              <div className="text-xl uppercase text-white">
                Anos de Experiência
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full">
        {/* Additional content omitted for brevity */}
        {/* Values Section */}
        <div className="w-full bg-white px-4 py-12">
          <div className="container mx-auto">
            <h2 className="mb-6 text-2xl font-bold">Valores</h2>
            <p className="mb-12 max-w-3xl text-gray-600">
              Nossa equipe também conta com a expertise de profissionais
              capacitados e bem treinados, procurando sempre atualizar seus
              padrões de excelência, com qualidade e seriedade nos trabalhos
              executados, oferecendo atendimento personalizado, competitividade
              e transparência nos negociações, mantendo-nos tecnicamente e
              eticamente constantes fazem da Proeng uma empresa diferenciada no
              mercado.
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 text-green-700">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-green-700">Excelência</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 text-green-700">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-green-700">Seriedade</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 text-green-700">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-green-700">
                    Atendimento Personalizado
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 text-green-700">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-green-700">
                    Transparência
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
        </div>

        
        <Footer1 />
      </footer>
    </div>
  );
}