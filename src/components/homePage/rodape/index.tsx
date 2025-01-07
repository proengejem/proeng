import React from "react";
import Image from "next/image";

const Rodape: React.FC = () => {
  return (
    <section className="relative h-[70vh]">
      {/* Faixa verde */}
      <div className="bg-green-700 h-12 w-full" style={{ backgroundColor: '#027A48' }}></div>

      {/* Conteúdo com imagem e texto */}
      <div className="relative h-full">

        {/* Imagem */}
        <Image
          src="/IntroServiços.png" // Substitua pelo caminho correto da imagem
          alt="Projetos de Engenharia"
          width={1920}
          height={486}
          className="w-full h-full object-cover"
        />

        {/* Texto sobreposto */}
        <div className="absolute inset-0 flex items-center justify-end px-8 md:px-16">
          <div className="text-white max-w-lg text-right">
            <h1 className="text-2xl md:text-4xl font-bold">
              Projetos de Engenharia
            </h1>
            <p className="text-sm md:text-lg mt-2">
              Descubra como nossos projetos transformam ideias em soluções
              inovadoras e eficientes para o mercado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rodape;
