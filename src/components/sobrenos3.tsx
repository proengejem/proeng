"use client";
import React, { useState, useEffect, useRef } from "react";
import Numero from "~/components/numeros";
import TypingAnimation from "~/components/ui/typing-animation";

export default function Sobrenoscompo3() {
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
    <div
      ref={sectionRef}
      className="relative flex min-h-[400px] w-full items-center bg-[#027A48]"
    >
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('/placeholder.svg')`,
          backgroundBlendMode: "multiply",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <h2 className="mb-16 text-center text-4xl font-bold text-white">
          {isVisible && (
            <TypingAnimation>NÚMEROS</TypingAnimation>
          )}
        </h2>
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-6xl font-bold text-white">
              <Numero n={1500} />
            </div>
            <div className="text-xl uppercase text-white">
              Obras Realizadas
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-6xl font-bold text-white">
              <Numero n={13} />
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
