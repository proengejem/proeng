import Image from "next/image";

export default function Servicos() {
  const services = [
    { title: "Solo Grampeado", description: "Lorem ipsum dolor sit amet...", image: "/SoloGrampeado.png", link: "/servicosindiv/solo-grampeado" },
    { title: "Concreto Projetado", description: "Lorem ipsum dolor sit amet...", image: "/ConcretoProj.png", link: "/servicos/concreto-projetado" },
    { title: "Hélice Contínua Monitorada", description: "Lorem ipsum dolor sit amet...", image: "/HéliceContM.png", link: "/servicos/helice-continua-monitorada" },
    { title: "Estaca Tipo Raiz", description: "Lorem ipsum dolor sit amet...", image: "/EstacasTpRaiz.png", link: "/servicos/estaca-tipo-raiz" },
    { title: "Micro Estacas Injetadas", description: "Lorem ipsum dolor sit amet...", image: "/MicroEstacasInj.png", link: "/servicos/micro-estacas-injetadas" },
    { title: "Injeções de Consolidação", description: "Lorem ipsum dolor sit amet...", image: "/InjeçõesConsolid.png", link: "/servicos/injecoes-de-consolidacao" },
    { title: "Dreno Sub-Horizontal Profundo", description: "Lorem ipsum dolor sit amet...", image: "/DHP.png", link: "/servicos/d-h-p" },
    { title: "Tirantes", description: "Lorem ipsum dolor sit amet...", image: "/Tirante.png", link: "/servicos/tirante" },
  ];

  return (
    <div>
      <div className="hero">
        <div className="green-detail"></div>
        <Image src="/IntroServiços.png" alt="Hero" width={1520} height={500} />
      </div>
      <div className="container">
        <h1>Nossos Serviços</h1>
        <p>Explore nossa variedade de serviços</p>
        <div className="grid">
          {services.map((service, index) => (
            <div className="card" key={index}>
              <div className="image-container">
                <Image src={service.image} alt={service.title} layout="responsive" width={300} height={200} />
              </div>
              <div className="card-content">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <a href={service.link} className="link">
                  Ver projeto
                </a>
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
      `}</style>
    </div>
  );
}

