import Image from 'next/image';
interface Obra {name: string; link: string;}
//interface Service {slug: string; title: string; description: string; image: string; credit: string; obras: Obra[];}

const getServicesData = () => {
  return [
    {
      slug: 'solo-grampeado',
      title: 'Solo Grampeado',
      description: '...',
      image: '/SoloGrampeado.png',
      credit: 'Publicado por Proeng Geotecnia',
      obras: [
        { name: 'Nome da Obra 01', link: '#' },
        { name: 'Nome da Obra 02', link: '#' },
        { name: 'Nome da Obra 03', link: '#' },
      ],
    },
    {
        slug: 'concreto-projetado',
        title: 'Concreto Projetado',
        description: '...',
        image: '/ConcretoProj.png',
        credit: 'Publicado por Proeng Geotecnia',
        obras: [
          { name: 'Nome da Obra A', link: '#' },
          { name: 'Nome da Obra B', link: '#' },
        ],
      },
    {
      slug: 'helice-continua-monitorada',
      title: 'Hélice Contínua Monitorada',
      description: '...',
      image: '/HéliceContM.png',
      credit: 'Publicado por Proeng Geotecnia',
      obras: [
        { name: 'Nome da Obra A', link: '#' },
        { name: 'Nome da Obra B', link: '#' },
      ],
    },
      {
        slug: 'cestaca-tipo-raiz',
        title: 'Estaca Tipo Raiz',
        description: '...',
        image: '/EstacaTpRaiz.png',
        credit: 'Publicado por Proeng Geotecnia',
        obras: [
          { name: 'Nome da Obra A', link: '#' },
          { name: 'Nome da Obra B', link: '#' },
        ],
      },
      {
        slug: 'micro-estacas-injetadas',
        title: 'Micro Estacas Injetadas',
        description: '...',
        image: '/MicroEstacasInj.png',
        credit: 'Publicado por Proeng Geotecnia',
        obras: [
          { name: 'Nome da Obra A', link: '#' },
          { name: 'Nome da Obra B', link: '#' },
        ],
      },
      {
        slug: 'injecoes-de-consolidacao',
        title: 'Injeções De Consolidação',
        description: '...',
        image: '/InjeçõesConsolid.png',
        credit: 'Publicado por Proeng Geotecnia',
        obras: [
          { name: 'Nome da Obra A', link: '#' },
          { name: 'Nome da Obra B', link: '#' },
        ],
      },
      {
        slug: 'd-h-p',
        title: 'Dreno Sub-Horizontal Profundo',
        description: '...',
        image: '/DHP.png',
        credit: 'Publicado por Proeng Geotecnia',
        obras: [
          { name: 'Nome da Obra A', link: '#' },
          { name: 'Nome da Obra B', link: '#' },
        ],
      },
      {
        slug: 'tirante',
        title: 'Tirante',
        description: '...',
        image: '/Tirante.png',
        credit: 'Publicado por Proeng Geotecnia',
        obras: [
          { name: 'Nome da Obra A', link: '#' },
          { name: 'Nome da Obra B', link: '#' },
        ],
      },
  ];
};

// export default function ServicoPage({ service }: { service: Service }) {
// if (!service) {
// return <p>Serviço não encontrado.</p>;
// }
// return (
// <div className="container">
// <nav>
// <a href="/servicos">Serviços</a> &gt; {service.title}
// </nav>
// <h1>{service.title}</h1>
// <p>{service.description}</p>
// <Image src={service.image} alt={service.title} width={800} height={400} />
// <p>* {service.credit}</p>
// <h2>Obras de {service.title}</h2>
// <div className="grid">
// {(service.obras || []).map((obra: Obra, index: number) => (
// <div className="card" key={index}>
// <p>{obra.name}</p>
// <a href={obra.link}>Saiba mais &gt;</a>
// </div>
// ))}
// </div>
// <style jsx>{`
// .container {
// padding: 2rem;
// }
// nav {
// font-size: 0.9rem;
// color: #555;
// margin-bottom: 1rem;
// }
// h1 {
// font-size: 2rem;
// margin-bottom: 1rem;
// }
// .grid {
// display: grid;
// grid-template-columns: repeat(3, 1fr);
// gap: 20px;
// margin-top: 20px;
// }
// .card {
// background: #333;
// color: #fff;
// padding: 1rem;
// border-radius: 8px;
// }
// `}</style>
// </div>
// );
// }

// export async function getStaticPaths() {
// const services = getServicesData();
// const paths = services.map((service) => ({
// params: { slug: service.slug },
// }));

// return {
// paths,
// fallback: false, 
// };
// }

// export async function getStaticProps({ params }: { params: { slug: string } }) {
// const services = getServicesData();
// const service = services.find((s) => s.slug === params.slug);

// if (!service) {
// return {
// notFound: true,
// };
// }
// return {
// props: {
// service,
// },
// };
// }
// `generateStaticParams` substitui `getStaticPaths`
export async function generateStaticParams() {
  const services = getServicesData();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicoPage({ params }: any) { // Ajuste para 'any'
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
