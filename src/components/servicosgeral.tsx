"use client";
import Image from 'next/image';
import Link from "next/link";
import HeroCarousel from "~/components/carosselServicos";

export default function Servicos() {
    const services = [
        { servico: "solo-grampeado", title: 'Solo Grampeado', description: "O solo grampeado é uma técnica de reforço dos solos amplamente utilizada ...", image: '/SoloGrampeado.png', link: '/servicos/solo-grampeado' },
        { servico:"concreto-projetado",title: 'Concreto Projetado', description: "É um processo de aplicação de concreto sem a necessidade de utilização de formas ...", image: '/ConcretoProj.png', link: '/servicos/concreto-projetado' },
        { servico:"hélice-contínua-monitorada",title: 'Hélice Contínua Monitorada', description: "A estaca tipo hélice segmentada monitorada está presente no mercado brasileiro desde 2001 ...", image: '/HéliceContM.png', link: '/servicos/helice-continua-monitorada' },
        { servico:"estaca-raiz",title: 'Estaca Tipo Raiz', description: "Considerada de pequeno diâmetro e de elevada capacidade de carga, a estaca raiz é ...", image: '/EstacasTpRaiz.png', link: '/servicos/estaca-tipo-raiz' },
        { servico:"micro-estacas-injetadas", title: 'Micro Estacas Injetadas', description: "As micro estacas geralmente possuem diâmetros inferiores a 160 mm, e são injetadas ...", image: '/MicroEstacasInj.png', link: '/servicos/micro-estacas-injetadas' },
        { servico:"injeções-consolidação", title: 'Injeções de Consolidação', description: "Os principais objetivos da injeção de consolidação é promover a melhoria das condições ...", image: '/InjeçõesConsolid.png', link: '/servicos/injecoes-de-consolidacao' },
        { servico:"dreno-sub-horizontal-profundo", title: 'Dreno Sub-Horizontal Profundo', description: "O dreno sub-horizontal profundo, mais conhecido por DHP  são elementos ...", image: '/DHP.png', link: '/servicos/d-h-p' },
        { servico:"tirantes", title: 'Tirantes', description: "Os tirantes são basicamente constituídos por um ou mais elementos de aço ...", image: '/Tirante.png', link: '/servicos/tirante' },
    ];    

    return (
        <div>
            {/* <div className="hero">
                <div className="green-detail"></div>
                <Image src="/IntroServiços.png" alt="Hero" width={1520} height={500} />
            </div> */}

            <div className="relative">
            <HeroCarousel />
            <div className="green-detail"></div>
            </div>

            <div className="container">
                <h1 className="mb-4 text-3xl font-bold"  style={{ color: '#027A48' }}>Nossos Serviços</h1>
                <p>Explore nossa variedade de serviços</p>
                <div className="grid">
                    {services.map((service, index) => (
                        <div className="card" key={index}>
                            <div className="image-container">
                                <Image src={service.image} alt={service.title} layout="responsive" width={300} height={20} />
                            </div>
                            <div className="card-content">
                                <h2>{service.title}</h2>
                                <p>{service.description}</p>
                                <Link href={`/servicos/${service.servico}`} style={{ color: '#027A48' }} className="link">
                                Ver projeto →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
         .hero {
          position: relative;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        .hero img {
          position: relative;
          z-index: 0;
        }
        .green-detail {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60px;
          background-color: #055634;
          clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 0);
          z-index: 1;
        }
        .container {
          padding: 4rem 10rem 10rem;
        }
        h1 {
          text-align: center;
          font-size: 3rem;
          margin: 1rem 0 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p {
          text-align: center;
          margin-top: 0.5rem;
          color: #555;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px 60px;
          margin-top: 2rem;
        }
        .card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid #c3e6cb;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 5px 10px 8px rgba(10, 70, 28, 0.5);
          transition: transform 0.2s ease-in-out;
          aspect-ratio: 1;
          padding: 1rem;
          background-color: #fff;
        }
        .card:hover {
          transform: scale(1.03);
        }
        .image-container {
          width: 100%;
          height: 250px;
          overflow: hidden;
        }
        .card-content {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
          overflow: hidden;
        }
        .card h2 {
          font-size: 1.5rem; /* Aumenta o tamanho do título */
          margin-bottom: 0.5rem;
          text-align: center; 
          font-weight: bold; /* Destaca o título */
          color: #333; /* Define uma cor mais forte para o texto */
        }
        .card p {
          color: #555;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .link {
          color: #28a745;
          text-align: center;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s ease;
          /* align-self: flex-start; */
          margin-top: auto;
          font-size: 1.2rem; /* Aumenta o tamanho do texto */
        }
        .link:hover {
          color: #1e7e34;
        }
        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem;
          }
          .container {
            padding: 2rem;
          }
          .grid {
            grid-template-columns: 1fr;
          }
        }
          .hero {
  position: relative; /* Garante que os dots respeitem o espaço do carrossel */
}

.slick-dots {
  position: absolute;
  bottom: 10px; /* Ajuste para posicionar acima da faixa */
  z-index: 10; /* Garante que os dots fiquem acima da faixa */
}

.green-detail {
  width: 100%;
  height: 10px; /* Ajuste a altura da faixa verde */
  background-color: #027A48; /* Cor verde */
  position: relative; /* Fica abaixo do carrossel */
  z-index: 5; /* Está abaixo dos dots */
}
      `}</style>
    </div>
  );
}