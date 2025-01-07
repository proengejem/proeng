"use client";
import React from "react";

const StyledBarCongresso: React.FC = () => {
//   return (
//     <div className="relative h-[20vh]">
//       {/* Trapezio Verde no Topo, alinhado à direita */}
//       <div className="absolute top-0 right-0 w-[50vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] h-[10vh] bg-[#027A48] clip-trapezoid" style={{ backgroundColor: '#027A48' }}></div>
//       {/* Retângulo abaixo do trapezio */}
//       <div className="absolute top-[10vh] left-0 w-full h-[10vh] bg-[#027A48]" ></div>
//       <style jsx>{`
//         .clip-trapezoid {
//           clip-path: polygon(0% 100%, 100% 100%, 85% 0%, 15% 0%);
//         }
//       `}</style>
//     </div>
//   );
// };

// const StyledBar: React.FC = () => {
  return (
    <div className="relative h-[20vh]">
      {/* Trapezio Verde no Topo, alinhado ao centro */}
      <div
        className="absolute top-1/2 left-1/2 w-[50vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] h-[5vh] bg-[#027A48] clip-trapezoid z-10"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>

     {/* Título centralizado sobre o trapézio */}
     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20">

      </div>
      {/* Retângulo abaixo do trapézio */}
      <div className="absolute top-[50%] left-0 w-full h-[10vh] bg-[#027A48] z-5 flex items-center justify-center">
        {/* Centralizando o texto dentro do retângulo */}
        <h1 className= "text-2xl font-bold text-white mb-2">
          CONGRESSOS
        </h1>
      </div>
     

      <style jsx>{`
        .clip-trapezoid {
          clip-path: polygon(0% 100%, 100% 100%, 85% 0%, 15% 0%);
        }
      `}</style>
    </div>
  );
};


export default StyledBarCongresso;







