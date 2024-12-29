import Image from 'next/image';

interface Obra {
  name: string;
  link: string;
}

interface Service {
  slug: string;
  title: string;
  description: string;
  image: string;
  credit: string;
  obras: Obra[];
}

// Simulação de dados de serviços
const getServicesData = (): Service[] => [
  {
    slug: 'solo-grampeado',
    title: 'Solo Grampeado',
    description: 'Descrição do serviço Solo Grampeado.',
    image: '/SoloGrampeado.png',
    credit: 'Publicado por Proeng Geotecnia',
    obras: [
      { name: 'Obra 1', link: '#' },
      { name: 'Obra 2', link: '#' },
    ],
  },
  {
    slug: 'concreto-projetado',
    title: 'Concreto Projetado',
    description: 'Descrição do serviço Concreto Projetado.',
    image: '/ConcretoProj.png',
    credit: 'Publicado por Proeng Geotecnia',
    obras: [
      { name: 'Obra A', link: '#' },
      { name: 'Obra B', link: '#' },
    ],
  },
];

export async function generateStaticParams() {
  const services = getServicesData();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicoPage({ params }: { params: { slug: string } }) {
  const services = getServicesData();
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return <p>Serviço não encontrado.</p>;
  }

  return (
    <div className="container">
      <nav>
        <a href="/servicos">Serviços</a> &gt; {service.title}
      </nav>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <Image src={service.image} alt={service.title} width={800} height={400} />
      <p>* {service.credit}</p>
      <h2>Obras de {service.title}</h2>
      <div className="grid">
        {(service.obras || []).map((obra, index) => (
          <div className="card" key={index}>
            <p>{obra.name}</p>
            <a href={obra.link}>Saiba mais &gt;</a>
          </div>
        ))}
      </div>
    </div>
  );
}
