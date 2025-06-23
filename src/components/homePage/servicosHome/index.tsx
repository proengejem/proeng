import React from "react"; 
import Image from 'next/image';
import Link from "next/link";

interface Service {
  image: string;
  title: string;
  alt: string;
  description: string;
  slug: string;
}

const services: Service[] = [
  { slug: "solo-grampeado", title: "Solo Grampeado", description: "O solo grampeado é uma técnica de reforço dos solos amplamente utilizada no Brasil...", image: "/SoloGrampeado.png", alt: "Solo Grampeado" },
  { slug: "helice-continua-monitorada", title: "Hélice Contínua Monitorada", description: "A estaca tipo hélice segmentada monitorada está presente no mercado brasileiro desde 2001...", image: "/HéliceContM.png", alt: "Hélice Contínua" },
  { slug: "estaca-tipo-raiz", title: "Estaca Tipo Raiz", description: "Considerada de pequeno diâmetro e de elevada capacidade de carga...", image: "/EstacasTpRaiz.png", alt: "Estaca Tipo Raiz" },
  
];

const ServiceCard: React.FC<Service> = ({ image, title, alt, description, slug }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden border transform transition-transform duration-300 hover:scale-105">
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
      <Link href={`/servicos/${slug}`}
      style={{ color: '#027A48' }} className="text-green-600 font-semibold hover:underline">
            Ver serviço →
        
      </Link>
 
    </div>
  </div>
);

const SolutionsSection: React.FC = () => (
  <div className="py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.slug} {...service} />
        ))}
      </div>
      <div className="text-center mt-8">
      <Link  href="/servicos">
          <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700" style={{ backgroundColor: '#027A48' }}>
            Ver mais
          </button>
        </Link >
      </div>
    </div>
  </div>
);

export default SolutionsSection;
