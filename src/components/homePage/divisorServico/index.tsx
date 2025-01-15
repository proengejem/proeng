"use client";
import React, { useState, useEffect, useRef } from "react";
import TypingAnimation from "~/components/ui/typing-animation";
import BlurFade from "~/components/ui/blur-fade";

const StyledBar: React.FC = () => {
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
      { threshold: 1 } // Ativado quando 100% do elemento estiver visível
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
    <div ref={sectionRef} className="relative h-[20vh]">
      {/* Trapezio Verde no Topo, alinhado ao centro */}
      <div
        className="absolute top-1/2 left-1/2 w-[50vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] h-[8vh] bg-[#027A48] clip-trapezoid z-10"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>

      {/* Título centralizado sobre o trapézio */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20">
        {isVisible && (
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            <TypingAnimation>Serviços</TypingAnimation>
          </h1>
        )}
      </div>

      {/* Retângulo abaixo do trapézio */}
      <div className="absolute top-[50%] left-0 w-full h-[10vh] bg-[#027A48] z-5 flex items-center justify-center">
        {isVisible && (
          <BlurFade delay={0.4}>
            <p className="text-white text-sm sm:text-base text-center">
              Explore os serviços de excelência realizados pela PROENG Geotécnica
            </p>
          </BlurFade>
        )}
      </div>

      <style jsx>{`
        .clip-trapezoid {
          clip-path: polygon(0% 100%, 100% 100%, 85% 0%, 15% 0%);
        }
      `}</style>
    </div>
  );
};

export default StyledBar;

