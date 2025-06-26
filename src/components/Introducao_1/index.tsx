import React from "react";
import BlurFade from "../../components/ui/blur-fade";
import Link from "next/link";

const HeroSectionWithVideo: React.FC = () => {
  return (
    <section className="relative h-screen z-10 overflow-hidden">
      {/* Vídeo de Fundo (YouTube embed) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <iframe
          className="w-full h-full absolute top-0 left-0 object-cover"
          src="https://www.youtube.com/embed/KTESI3SxVv0?autoplay=1&mute=1&loop=1&playlist=KTESI3SxVv0&controls=0&showinfo=0&modestbranding=1"
          title="YouTube video background"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>

      {/* Conteúdo do texto */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <div className="max-w-2xl">
          <BlurFade delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight" style={{ color: "#027A48" }}>
              PROENG GEOTECNIA E FUNDAÇÃO{" "}
            </h1>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Construindo qualidade e confiança desde{" "}
              <span style={{ color: "#027A48" }}>2006</span>
            </h1>
          </BlurFade>
          <BlurFade delay={0.3}>
            <p className="mt-2 text-base md:text-lg">
              A PROENG Geotecnia e Fundação possui uma trajetória sólida no mercado de engenharia,
              oferecemos soluções inovadoras e confiáveis. Nossa missão é
              garantir a satisfação em cada projeto.
            </p>
          </BlurFade>
          <BlurFade delay={0.3}>
            <div className="mt-6 flex space-x-4 justify-center">
              <Link href="/sobrenos">
                <button className="px-6 py-3 bg-[#027A48] text-white rounded-lg font-semibold hover:bg-green-500 transition">
                  Sobre nós
                </button>
              </Link>
              <Link href="/contato">
                <button
                  className="px-6 py-3 bg-white text-green-500 rounded-lg font-semibold hover:bg-gray-200 transition"
                  style={{ color: "#027A48" }}
                >
                  Contato
                </button>
              </Link>
            </div>
          </BlurFade>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-6 bg-gradient-to-b from-transparent to-black z-10"></div>
    </section>
  );
};

export default HeroSectionWithVideo;

