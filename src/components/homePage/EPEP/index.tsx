import React from "react";
import Image from "next/image";

interface FeatureProps {
  icon: React.ReactNode;
  title: string | undefined;
  description: string | undefined;
  linkText: string | undefined;
  //linkUrl: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start space-x-4 w-full">
      <div className="text-green-600 text-3xl">{icon}</div>
      <div className="w-full">
        <h3 className="text-lg font-semibold text-green-800" style={{ color: '#027A48' }}>{title}</h3>
        <p className="text-black text-sm mb-2">{description}</p>
        {/*<h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
         <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 font-semibold hover:underline"
        >
          {linkText} →
        </a> */}
      </div>
    </div>
  );
};

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <span>📦</span>,
      title: "Empresa",
      description:
        "A Proeng Geotécnica é uma empresa de engenharia especializada em contenções, fundações, drenagem e tratamento de solos. Desde 2006, já realizou mais de 1.500 obras.",
      linkText: "Saiba Mais",
      // linkUrl: "/empresa",
    },
    {
      icon: <span>⚙️</span>,
      title: "Processos",
      description:
        "Atualizações, treinamentos e investimentos constantes fazem da Proeng uma empresa diferenciada no mercado.",
      linkText: "Saiba Mais",
      // linkUrl: "/processos",
    },
    {
      icon: <span>🔧</span>,
      title: "Equipamentos",
      description:
        "Equipamentos de pequeno e médio porte, que permitem execuções em áreas de trabalho de espaço limitado.",
      linkText: "Saiba Mais",
      // linkUrl: "/equipamentos",
    },
    {
      icon: <span>👷</span>,
      title: "Equipe",
      description:
        "Expertise de profissionais capacitados e bem treinados, procurando sempre alcançar altos padrões de excelência.",
      linkText: "Saiba Mais",
      // linkUrl: "/equipe",
    },
  ];

  return (
    <section className="relative z-50 py-5 flex items-center overflow-hidden">
  <div className="container mx-auto px-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
    {/* Image Section */}
    <div className="w-full md:w-1/2 order-last md:order-first flex justify-center">
      <div className="rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl overflow-hidden">
        <Image
          src="/image.png"
          alt="Sobre a Proeng"
          width={1300}
          height={900}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>

    {/* Features Section */}
    <div className="w-full md:w-1/2 space-y-4">
      {/* Grupo de Empresa e Processos na mesma linha */}
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-4">
        <Feature
          icon={features[0]?.icon}
          title={features[0]?.title ?? ''}
          description={features[0]?.description}
          linkText={features[0]?.linkText}
        />
        <Feature
          icon={features[1]?.icon}
          title={features[1]?.title ?? ''}
          description={features[1]?.description}
          linkText={features[1]?.linkText}
        />
      </div>

      {/* Equipamentos e Equipe abaixo */}
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-4">
        <Feature
          icon={features[2]?.icon}
          title={features[2]?.title ?? ''}
          description={features[2]?.description}
          linkText={features[2]?.linkText}
        />
        <Feature
          icon={features[3]?.icon}
          title={features[3]?.title ?? ''}
          description={features[3]?.description}
          linkText={features[3]?.linkText}
        />
      </div>
    </div>
  </div>
</section>);};
export default AboutSection;
