import React from "react";
import Image from 'next/image';


interface VideoCardProps {
  image: string;
  title: string;
  alt: string;
  description: string;
  linkText: string;
  linkUrl: string;
}


    const VideoCard: React.FC<VideoCardProps> = ({ image, title, alt, description, linkText, linkUrl }) => {
      return (
        <div
          className="bg-white shadow-lg rounded-lg overflow-hidden border transform transition-transform duration-300 hover:scale-105"
        >
          <div className="aspect-w-16 aspect-h-9">
            <Image 
              src={image}
              alt={alt}
              title={title}
              layout="responsive"
              width={100}
              height={10}
              className="w-full h-full"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-semibold hover:underline"
              style={{ color: '#027A48' }}
            >
              {linkText} →
            </a>
          </div>
        </div>
      );
    };
    

const SolutionsSection: React.FC = () => {
  const videos = [
    {
      image: "/EstacasTpRaiz.png",
      alt:"Estaca Tipo Raíz",
      title: "Estaca Raiz",
      description:
        "Considerada de pequeno diâmetro e de elevada capacidade ...",
      linkText: "Ver projeto",
      linkUrl: "/projetos/estaca-raiz",
    },
    {
      image: "/SoloGrampeado.png",
      alt:"Solo Grampeado",
      title: "Solo Grampeado",
      description:
        "O solo grampeado é uma técnica de reforço dos solos amplamente utilizada ...",
      linkText: "Ver projeto",
      linkUrl: "/projetos/solo-grampeado",
    },
    {
      image: "/HéliceContM.png",
      alt:"Estaca Hélice",
      title: "Estaca Hélice",
      description:
        "A estaca tipo hélice segmentada monitorada está presente ...",
      linkText: "Ver projeto",
      linkUrl: "/projetos/estaca-helice",
    },
    {
      image: "/MicroEstacasInj.png",
      alt:"Micro Estacas Injetadas",
      title: "Micro Estacas Injetadas",
      description:
        "As micro estacas geralmente possuem diâmetros inferiores ...",
      linkText: "Ver projeto",
      linkUrl: "/projetos/estaca-helice",
    },    {
      image: "/InjeçõesConsolid.png",      
      alt:"Injeções de Consolidação",
      title: "Injeções de Consolidação",
      description:
        "Os principais objetivos da injeção de consolidação é promover ...",
      linkText: "Ver projeto",
      linkUrl: "/projetos/estaca-helice",
    },    {
      image: "/DHP.png",
      alt:"Dreno Sub-Horizontal Profundo",
      title: "Dreno Sub-Horizontal Profundo",
      description:
        "O dreno sub-horizontal profundo, mais conhecido por DHP  são elementos ...",
      linkText: "Ver projeto",
      linkUrl: "/projetos/estaca-helice",
    },
  ];

  return (
    <div className="py-12 ">
      <div className="container mx-auto px-4">
        {/* <h2 className="text-2xl font-bold text-center text-green-700 mb-4" style={{ color: '#027A48' }}>
          Serviços
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Explore os serviços  de excelência realizados pela PROENG Geotécnica
        </p> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>
        <div className="text-center mt-8">
        <a href="/servicos">
          <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700"   style={{ backgroundColor: '#027A48' }}>
            Ver mais
          </button>
        </a>
        </div>
      </div>
    </div>
  );
};

export default SolutionsSection;