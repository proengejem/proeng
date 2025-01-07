"use client";
import React from "react";

const StyledBar: React.FC = () => {
  return (

    <div className="relative h-[20vh]">
  {/* Trapezio Verde no Topo */}
  <div
    className="absolute top-1/2 left-1/2 w-[50vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] h-[8vh] bg-[#027A48] clip-trapezoid z-10"
    style={{ transform: "translate(-50%, -50%)" }}
  ></div>

  {/* Título centralizado sobre o trapézio */}
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20">
    <h1 className="text-2xl md:text-4xl font-bold text-white">Serviços</h1>
  </div>

  {/* Retângulo abaixo do trapézio */}
  <div className="absolute top-[50%] left-0 w-full h-[12vh] bg-[#027A48] z-5 flex items-center justify-center">
    <p className="text-white text-sm sm:text-base text-center">
      Explore os serviços de excelência realizados pela PROENG Geotécnica
    </p>
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
