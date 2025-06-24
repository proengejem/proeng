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
    <div className="flex items-start space-x-4 w-full transform transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-white p-4 rounded-lg">
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
    title: <h1>Valores</h1>,
    description:
      "Nossa equipe também conta com a expertise de profissionais capacitados e bem treinados, procurando sempre atualizar seus padrões de excelência, com qualidade e seriedade nos trabalhos executados, oferecendo atendimento personalizado, competitividade e transparência nos negociações, mantendo-nos tecnicamente e eticamente constantes fazem da Proeng uma empresa diferenciada no mercado."
  };

  const imagens = [
    "/ImagemValores1.jpeg",
    "/ImagemValores2.jpeg",
    "/ImagemValores3.jpeg",
  ];

  return (
    <section className="relative z-50 py-12 overflow-hidden">
      <div className="container mx-auto px-6 md:px-20 flex flex-col items-center text-center">
        {/* Texto */}
        <div className="w-full md:w-3/4">
          <h1 className="mb-6 text-4xl font-bold text-green-600">{texto.title}</h1>
          <p className="mb-10 text-left text-xl font-medium text-gray-600">{texto.description}</p>
        </div>

        {/* Imagens abaixo do texto */}
        <div className="flex flex-wrap justify-center gap-6">
          {imagens.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Imagem ${index + 1}`}
              className="w-45 h-40 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Valores;




