"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import BlurFade from "./ui/blur-fade";

const Rodapecontato: React.FC = () => {
   const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]; // Obtém o primeiro elemento observado
          if (entry?.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.8 } // Ativado quando 80% do elemento estiver visível
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

      {/* Conteúdo com imagem e texto */}
      <div className="relative h-full">
        {/* Imagem */}
        <Image
          src="/rodapecontato.png" 
          alt="Projetos de Engenharia"
          width={1920}
          height={486}
          className="w-full h-full object-cover"
        />

        {/* Texto sobreposto */}
        <div className="absolute inset-0 flex  items-center justify-center h-full text-center px-8 md:px-16">
          <div className="text-white max-w-lg text-center">
          {isVisible && (
              <>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight"  >
            <BlurFade delay={0.14}>Engenharia de Inovação e</BlurFade>
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight"   >
            <BlurFade delay={0.14}>Excelência</BlurFade>        
            </h1>
            <BlurFade delay={0.16}><p className="mt-2 text-base md:text-lg">
            Empresa com preocupação em manter-se sempre atualizada, desenvolvendo novas metodologias 
            e aprimorando as técnicas 
            </p></BlurFade>
            </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rodapecontato;