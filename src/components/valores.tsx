import React from "react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkUrl?: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, linkText, linkUrl }) => {
  return (
    <div className="flex items-start space-x-4 w-full">
      <div className="text-green-600 text-3xl">{icon}</div>
      <div className="w-full">
        <h3 className="text-lg font-semibold" style={{ color: '#027A48' }}>{title}</h3>
        <p className="text-black text-sm mb-2">{description}</p>
        {linkUrl && (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 font-semibold hover:underline"
          >
            {linkText} →
          </a>
        )}
      </div>
    </div>
  );
};

const Valores: React.FC = () => {
  const texto = {
    title: "Valores",
    description:
    "Nossa equipe também conta com a expertise de profissionais capacitados e bem treinados, procurando sempre atualizar seus padrões de excelência, com qualidade e seriedade nos trabalhos executados, oferecendo atendimento personalizado, competitividade e transparência nos negociações, mantendo-nos tecnicamente e eticamente constantes fazem da Proeng uma empresa diferenciada no mercado."  };

  const features = [
    {
      icon: <span> 🏆</span>,
      title: "Excelência",
      description:
        "A Proeng Geotécnica é uma empresa de engenharia especializada em contenções, fundações, drenagem e tratamento de solos.",
      linkText: "Saiba Mais",
    },
    {
      icon: <span> 🛡️</span>,
      title: "Seriedade",
      description:
        "Atualizações, treinamentos e investimentos constantes fazem da Proeng uma empresa diferenciada no mercado.",
      linkText: "Saiba Mais",
    },
    {
      icon: <span>  🤝</span>,
      title: "Atendimento personalizado",
      description:
        "Atualizações, treinamentos e investimentos constantes fazem da Proeng uma empresa diferenciada no mercado.",
      linkText: "Saiba Mais",
    },
    {
      icon: <span>  🔍</span>,
      title: "Transparência",
      description:
        "Atualizações, treinamentos e investimentos constantes fazem da Proeng uma empresa diferenciada no mercado.",
      linkText: "Saiba Mais",
    },
  ];

  return (
    <section className="relative z-50 py-12 h-[80vh] flex items-center overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center space-y-6 md:space-x-12">
        <div className="w-full md:w-1/2">
        <h2 className="mb-6 text-2xl font-bold">{texto.title}</h2>
        <p className="mb-12 max-w-3xl text-gray-600">{texto.description}</p>
        </div>


        <div className="w-full md:w-1/2 space-y-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              linkText={feature.linkText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Valores;


