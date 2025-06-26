"use client";
import React, { useState, useEffect, useRef } from "react";
import TypingAnimation from "~/components/ui/typing-animation";


const HeadBar: React.FC = () => {
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
    <div className="relative bg-[#027A48] py-16 md:py-24">
      {/* Content Container */}
      <div className="container mx-auto px-4 text-center text-white relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4"><TypingAnimation>Obras Realizadas</TypingAnimation></h1>
        <p className="text-lg md:text-xl text-gray-100">Explore nossa variedade de projetos inovadores.</p>
      </div>

      {/* Angled Shape */}
      <div
        className="absolute bottom-0 right-0 w-1/3 h-12 md:h-16"
        style={{
          background: "linear-gradient(135deg, transparent 50%, white 50%)",
        }}
      />
    </div>
  );
};

export default HeadBar;

