"use client";


import Numero from "~/components/numeros";
import React from "react";


export default function Sobrenoscompo3() {
    return (
<div className="relative flex min-h-[400px] w-full items-center bg-[#027A48]">
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
    NÚMEROS
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