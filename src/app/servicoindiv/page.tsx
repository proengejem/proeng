//import { Metadata } from 'next';
//import { GetStaticPropsContext } from 'next';
import Image from 'next/image';

export default async function ServicoIndivPage() {
  //console.log('Slug recebido:', params.slug);

  const service = {
    title: 'Carregando...',
    description: 'Carregando...',
    image: '/images/loading.png',
    credit: 'Carregando...',
    obras: [{
      name: 'Carregando...',
      link: '#',
    }],
  }

  return (
    <div>
      <nav>
        <a href="/servicos">Serviços</a> &gt; {service.title}
      </nav>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <Image src={service.image} alt={service.title} width={800} height={400} />
      <p>* {service.credit}</p>
      <h2>Obras de {service.title}</h2>
      <div className="grid">
        {service.obras.map((obra, index) => (
          <div className="card" key={index}>
            <p>{obra.name}</p>
            <a href={obra.link}>Saiba mais &gt;</a>
          </div>
        ))}
      </div>
    </div>
  );
}