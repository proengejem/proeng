"use client";
import Image from 'next/image';

export default function Servicos() {
    const services = [
      { title: 'Solo Grampeado', description: "descrição do serviço", image: '/SoloGrampeado.png', link: '/servicos/solo-grampeado' },
      //{ title: 'Concreto Projetado', description: "descrição do serviço", image: '/ConcretoProj.png', link: "/servicoindiv" },
      { title: 'Concreto Projetado', description: "descrição do serviço", image: '/ConcretoProj.png', link: "#" },
      { title: 'Hélice Contínua Monitorada', description: "descrição do serviço", image: '/HéliceContM.png', link: '#' },
      { title: 'Estaca Tipo Raiz', description: "descrição do serviço", image: '/EstacasTpRaiz.png', link: '#' },
      { title: 'Micro Estacas Injetadas', description: "descrição do serviço", image: '/MicroEstacasInj.png', link: '#' },
      { title: 'Injeções de Consolidação', description: "descrição do serviço", image: '/InjeçõesConsolid.png', link: '#' },
      { title: 'Dreno Sub-Horizontal Profundo', description: "descrição do serviço", image: '/DHP.png', link: '#' },
      { title: 'Tirantes', description: "descrição do serviço", image: '/Tirante.png', link: '#' },
    ];

  return (
    <div>
      <div className="hero">
        <Image src="/IntroServiços.png" alt="Hero" width={1500} height={500} />
      </div>
      <div className="container">
        <h1>Nossos Serviços</h1>
        <p>Explore nossa variedade de serviços</p>
        <div className="grid">
          {services.map((service, index) => (
            <div className="card" key={index}>
              <Image src={service.image} alt={service.title} width={300} height={200} />
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <a href={service.link}>Ver projeto &gt;</a>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
        }
        .container {
          padding: 2rem;
        }
        h1 {
          text-align: center;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 20px;
        }
        .card {
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .card h2 {
          font-size: 1.2rem;
        }
        .card p {
          color: #555;
        }
        .card a {
          color: green;
          text-decoration: none;
          font-weight: bold;
        }
      `}</style>
    </div>
  );

}
