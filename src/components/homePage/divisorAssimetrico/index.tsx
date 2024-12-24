"use client";
import React from "react";

const StyledBar: React.FC = () => {
  return (
    <div className="relative h-[20vh]">
      {/* Trapezio Verde no Topo, alinhado à direita */}
      <div className="absolute top-0 right-0 w-[50vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] h-[10vh] bg-green-700 clip-trapezoid"></div>
      {/* Retângulo abaixo do trapezio */}
      <div className="absolute top-[10vh] left-0 w-full h-[10vh] bg-green-700"></div>
      <style jsx>{`
        .clip-trapezoid {
          clip-path: polygon(0% 100%, 100% 100%, 85% 0%, 15% 0%);
        }
      `}</style>
    </div>
  );
};

export default StyledBar;







