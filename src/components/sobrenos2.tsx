"use client";

import Image from "next/image";
import React from "react";
import Carossel from "~/components/carossel";
import StyledBarAssimetrica from "~/components/homePage/divisorAssimetrico";


export default function Sobrenoscompo2() {
    return (
        <div className="flex min-h-screen flex-col">
        {/* Green header */}
        <div className="h-12 w-full bg-[#0B4D2C]" />

        {/* Main content */}
        <div className="relative flex flex-grow flex-col md:flex-row">
          {/* Background pattern
          <div className="absolute inset-0 overflow-hidden bg-[#3a4558]" /> */}
          {/* Content container */ }
          <div className="relative flex w-full flex-col items-center gap-8  bg-opacity-90 p-8 md:flex-row md:p-16">
            {/* Text content */}
            <div className="flex-1 space-y-6 text-black">
              <p className="text-lg md:text-lg mt-2">
                  A Proeng Geotecnia é uma empresa de engenharia especializada na
                execução de obras de contenções, fundações, drenagem e
                tratamento de solos. Ingressou no mercado em maio de 2006 e já
                realizou mais de 1.500 obras até o presente momento.
              </p>
              <p className="text-lg md:text-lg mt-2">
                  A empresa se preocupa em manter-se atualizada, desenvolvendo
                novos metodologias e aprimorando as técnicas atualmente
                aplicadas nos serviços prestados, além de apoiar pesquisas
                incentivando trabalhos acadêmicos e científicos em nível de
                graduação, dissertações de mestrado e teses de doutorado,
                permitindo sua participação em trabalhos importantes.
              </p>
              <p>

              </p>
              <a
          href="/contato"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 font-semibold hover:underline" style={{ color: '#027A48' }}
        >
          Contato →
        </a>
            </div>
            {/* Image */}
            <div className="max-w-md flex-1">
              <Image
                src="/figurinha.png"
                alt="Engineering equipment"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
        {/* Partners Section */}
        <StyledBarAssimetrica />
        <div className="w-full  p-4">
        {/* <h2 className="text-2xl font-bold text-center text-green-700 mb-4" style={{ color: '#027A48' }}>
          CONGRESSOS
        </h2> */}
          <Carossel />
        </div>
      </div>
  );
}