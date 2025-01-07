"use client";
import React from "react";

const PortfolioBanner: React.FC = () => {
  return (
    <div className="relative h-[30vh] bg-[#055634]">
      {/* Trapezoidal detail (inverted) */}


      {/* Title and subtitle */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center">
        <h1 className="text-white text-3xl font-bold">Portfólio</h1>
        <p className="text-white text-sm sm:text-base mt-2">
          Explore nossa variedade de projetos inovadores.
        </p>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-[6vh] bg-[#027A48] clip-trapezoid z-5"
      ></div>
      <style jsx>{`
        .clip-trapezoid {
          clip-path: polygon(15% 100%, 85% 100%, 100% 0, 0 0);
        }
      `}</style>
    </div>
  );
};

export default PortfolioBanner;
