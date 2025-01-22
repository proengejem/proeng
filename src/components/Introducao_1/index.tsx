import React from "react";
import BlurFade from "~/components/ui/blur-fade"; // Ajuste o caminho, se necessário.
import Link from "next/link";


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
          <BlurFade delay={0.3}>
            <h1
              className="text-4xl md:text-6xl font-bold leading-tight"
              style={{ color: "#027A48" }}
            >
              PROENG GEOTECNIA{" "}
            </h1>
          </BlurFade>
          <BlurFade delay={0.3}>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Construindo qualidade e confiança desde{" "}
              <span style={{ color: "#027A48" }}>2006</span>
            </h1>
          </BlurFade>
          {/* Descrição */}
          <BlurFade delay={0.5}>
            <p className="mt-2 text-base md:text-lg">
              A PROENG possui uma trajetória sólida no mercado de engenharia,
              oferecemos soluções inovadoras e confiáveis. Nossa missão é
              garantir a satisfação em cada projeto.
            </p>
          </BlurFade>
          {/* Botões */}
          <BlurFade delay={0.6}>
            <div className="mt-6 flex space-x-4 justify-center">
              <Link href="/sobrenos">
                <button className="px-6 py-3 bg-[#027A48] text-white rounded-lg font-semibold hover:bg-green-500 transition">
                  Sobre nós
                </button>
                </Link >
              <a href="/servicos">
                <button
                  className="px-6 py-3 bg-white text-green-500 rounded-lg font-semibold hover:bg-gray-200 transition"
                  style={{ color: "#027A48" }}
                >
                  Contato
                </button>
              </a>
            </div>
          </BlurFade>
        </div>
      </div>

      {/* Adiciona espaçamento extra abaixo */}
      <div className="absolute bottom-0 w-full h-6 bg-gradient-to-b from-transparent to-black"></div>
    </section>
  );
};

export default HeroSectionWithVideo;
