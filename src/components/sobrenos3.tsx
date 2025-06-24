"use client";

import Numero from "~/components/numeros";
import React, { useState, useEffect } from 'react';


export default function Sobrenoscompo3() {
    const [anoInicio] = useState(2006); // Exemplo de ano de nascimento
    const anoAtual = new Date().getFullYear();
    const anosExeperiencia = anoAtual - anoInicio;
  return (
    <div className="relative flex min-h-[400px] w-full items-center bg-[#027A48]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/Estaca Raiz.jpeg')`, // Substitua pelo caminho real da sua imagem
        }}
      ></div>

      {/* Overlay para escurecer a imagem e destacar o texto */}
      <div className="absolute inset-0 bg-[#027A48] opacity-40"></div>
      <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"></div>


      {/* Conteúdo principal */}
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="mb-16 text-center text-5xl font-bold text-white">
          NÚMEROS
        </h2>
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-xl uppercase text-white">
              Mais de 
            </div>
            <div className="text-6xl font-bold text-white">
              <Numero n={1500} />
            </div>
            <div className="text-xl uppercase text-white">
              Obras Realizadas
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-6xl font-bold text-white">
              <Numero n={anosExeperiencia} />
            </div>
            <div className="text-xl uppercase text-white">
              Anos de Experiência
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
