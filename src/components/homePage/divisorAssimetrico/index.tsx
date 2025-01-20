"use client";
import React, { useEffect, useRef, useState } from "react";
import TypingAnimation from "~/components/ui/typing-animation";

const StyledBarAssimetrica: React.FC = () => {
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
    <div ref={sectionRef} className="relative h-[20vh]">
      {/* Trapezio Verde no Topo, alinhado ao centro */}
      <div
        style={{ backgroundColor: "#027A48" }}
        className="absolute top-0 right-0 w-[50vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] h-[10vh] bg-green-700 clip-trapezoid"
      ></div>
      {/* Retângulo abaixo do trapezio */}
      <div
        style={{ backgroundColor: "#027A48" }}
        className="absolute top-[10vh] left-0 w-full h-[10vh] bg-green-700"
      ></div>

      {/* Título centralizado sobre o trapézio */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20"></div>

      {/* Retângulo abaixo do trapézio */}
      <div className="absolute top-[50%] left-0 w-full h-[10vh] bg-[#027A48] z-5 flex items-center justify-center">
        {/* Centralizando o texto dentro do retângulo */}
        <h3 className="font-bold text-white mb-2">
          {isVisible && <TypingAnimation>CONGRESSOS</TypingAnimation>}
        </h3>
      </div>

      <style jsx>{`
        .clip-trapezoid {
          clip-path: polygon(0% 100%, 100% 100%, 85% 0%, 15% 0%);
        }
      `}</style>
    </div>
  );
};

export default StyledBarAssimetrica;
