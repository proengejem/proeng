"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import TypingAnimation from "~/components/ui/typing-animation";
import BlurFade from "~/components/ui/blur-fade";

const Rodape: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]; // Obtém o primeiro elemento observado
        if (entry?.isIntersecting) { // Usando optional chaining
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // Ativado quando 50% do elemento estiver visível
    );
  
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
  
    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  

  return (
    <section ref={sectionRef} className="relative h-[70vh]">
      {/* Faixa verde */}
      <div
        className="bg-green-700 h-12 w-full"
        style={{ backgroundColor: "#027A48" }}
      ></div>

      {/* Conteúdo com imagem e texto */}
      <div className="relative h-full">

        {/* Imagem */}
        <Image
          src="/RodapéHome.png" // Substitua pelo caminho correto da imagem
          alt="Projetos de Engenharia"
          width={1920}
          height={486}
          className="w-full h-full object-cover"
        />

        {/* Texto sobreposto */}
        <div className="absolute inset-0 flex items-center justify-end px-8 md:px-16">
          <div className="text-white max-w-lg text-right">
            {isVisible && (
              <>
                <h1 className="text-2xl md:text-4xl font-bold">
                  <TypingAnimation>
                    Serviços de Engenharia
                  </TypingAnimation>
                </h1>
                <BlurFade delay={0.4}>
                  <p className="text-sm md:text-lg mt-2">
                    Descubra como nossos serviços transformam ideias em soluções
                    inovadoras e eficientes para o mercado.
                  </p>
                </BlurFade>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rodape;

