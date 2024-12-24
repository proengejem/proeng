import React from "react";

const HeroSectionWithVideo: React.FC = () => {
  return (
    <section className="relative h-screen z-10 overflow-hidden">
      {/* Vídeo de Fundo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/intro.mp4" type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>

      {/* Sobreposição para texto */}
      <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"></div>

      {/* Conteúdo do texto */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <div className="max-w-2xl">
          {/* Título */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Construindo qualidade e confiança desde{" "}
            <span className="text-green-500">2006</span>
          </h1>
          {/* Descrição */}
          <p className="mt-2 text-base md:text-lg">
            Com uma trajetória sólida no mercado de engenharia, oferecemos
            soluções inovadoras e confiáveis. Nossa missão é garantir a
            satisfação em cada projeto.
          </p>
          {/* Botões */}
          <div className="mt-6 flex space-x-4 justify-center">
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
              Sobre nós
            </button>
            <button className="px-6 py-3 bg-white text-green-500 rounded-lg font-semibold hover:bg-gray-200 transition">
              Contato
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionWithVideo;


