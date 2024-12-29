import React from "react";
import Image from "next/image";

const Rodapecontato: React.FC = () => {
  return (
    <section className="relative h-[70vh]">

      {/* Conteúdo com imagem e texto */}
      <div className="relative h-full">
        {/* Imagem */}
        <Image
          src="/rodapecontato.png" // Substitua pelo caminho correto da imagem
          alt="Projetos de Engenharia"
          width={1920}
          height={486}
          className="w-full h-full object-cover"
        />
              {/* <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Construindo qualidade e confiança desde{" "}
            <span  style={{ color: '#027A48' }} >2006</span>
          </h1>
          <p className="mt-2 text-base md:text-lg">
            Com uma trajetória sólida no mercado de engenharia, oferecemos
            soluções inovadoras e confiáveis. Nossa missão é garantir a
            satisfação em cada projeto.
          </p> */}

        {/* Texto sobreposto */}
        <div className="absolute inset-0 flex  items-center justify-center h-full text-center px-8 md:px-16">
          <div className="text-white max-w-lg text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight"  >
              Engenharia de Inovação e
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight"   >
                Excelência           
             </h1>
            <p className="mt-2 text-base md:text-lg">
            Empresa com preocupação em manter-se sempre atualizada, desenvolvendo novas metodologias 
            e aprimorando as técnicas 
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rodapecontato;
