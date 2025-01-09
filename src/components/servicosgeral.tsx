"use client";

import Image from "next/image";
import Link from "next/link";
import HeroCarousel from "~/components/carosselServicos";

export default function Servicos() {
  const services = [
    { slug: "solo-grampeado", title: "Solo Grampeado", description: "O solo grampeado é uma técnica de reforço dos solos amplamente utilizada no Brasil. Pode-se definí-la como o resultado da introdução de reforços, geralmente barras de aço, em um maciço de solo. Este processo é aliado, normalmente, a um revestimento da face (concreto projetado, tela ou grama) e a um sistema de drenagem. O grande interesse dos profissionais pela utilização da técnica do solo grampeado justifica-se pela sua praticidade, rapidez de execução, versatilidade e economia quando comparada a outras soluções técnicas utilizadas para estabilização de cortes e taludes naturais.", image: "/SoloGrampeado.png" },
    { slug: "concreto-projetado", title: "Concreto Projetado", description: "É um processo de aplicação de concreto sem a necessidade de utilização de formas, bastando apenas uma superfície para o seu lançamento. O não emprego de formas pode ser por opção, ou quando, pelas características da concretagem, seu emprego torna-se difícil ou impossível. Esse sistema é muito utilizado em concretagens de túneis, paredes de contenção, piscinas e em recuperação e reforço estrutural de lajes, vigas, pilares e paredes de concreto armado.", image: "/ConcretoProj.png" },
    { slug: "helice-continua-monitorada", title: "Hélice Contínua Monitorada", description: "A estaca tipo hélice segmentada monitorada está presente no mercado brasileiro desde 2001. Trata-se de uma perfuratriz de dimensões e peso reduzidos (mini – hélice contínua) podendo executar estacas com diâmetros de 25, 30, 35, 40 e 50 cm e atingir profundidades de até 16 m. Sua principal característica é a possibilidade de execução em locais de espaço reduzido, com destaque ao afastamento de 40 cm do eixo da estaca até a divisa. As perfuratrizes da Proeng Geotecnia são dotadas de monitoramento eletrônico, igual aos das perfuratrizes hélice contínua convencionais.", image: "/HéliceContM.png" },
    { slug: "estaca-tipo-raiz", title: "Estaca Tipo Raiz", description: "Considerada de pequeno diâmetro e de elevada capacidade de carga, a estaca raiz é uma estaca moldada in loco com diâmetros que variam de 100 a 500 mm, executada com equipamentos de pequeno e médio porte, que permite sua execução em locais com limitação de pé direito e em áreas de trabalho de espaço limitado. O processo executivo desta estaca não causa vibrações, o que permite empregá-la em qualquer situação de obra industrial. Caracteriza-se principalmente por ser uma estaca executada com emprego de revestimentos metálicos recuperáveis, que permite atingir grande profundidade, podendo-se atravessar matacões, blocos de concreto ou embuti-las em rocha, neste caso a perfuração é completada com o uso de martelo hidráulico, até atingir a profundidade desejada.", image: "/EstacasTpRaiz.png" },
    { slug: "micro-estacas-injetadas", title: "Micro Estacas Injetadas", description: "As micro estacas geralmente possuem diâmetros inferiores a 160 mm, e são injetadas com calda de cimento, através de tubo manchete (tubo preparado com válvulas espaçadas ao longo de seu comprimento, que permitem apenas a passagem da calda de cimento em uma única direção). As injeções têm como ﬁnalidade aumentar a resistência do atrito lateral. Este tipo de estaca comporta duas variantes em relação à armadura: na primeira delas introduz-se um tubo metálico com função estrutural, dotado de manchetes para a injeção e na segunda, a armadura é constituída por barras (ou gaiola) e a injeção é feita através de tubos de polietileno em fases setorizadas de injeção.", image: "/MicroEstacasInj.png" },
    { slug: "injecoes-de-consolidacao", title: "Injeções de Consolidação", description: "Os principais objetivos da injeção de consolidação é promover a melhoria das condições de estabilidade, capacidade de carga e redução de permeabilidade dos diversos tipos de solo. O tratamento é feito pela injeção de um determinado volume de material a uma determinada pressão, podendo ser calda de cimento, argamassa, solo-cimento ou compostos químicos.", image: "/InjeçõesConsolid.png" },
    { slug: "d-h-p", title: "Dreno Sub-Horizontal Profundo", description: "O dreno sub-horizontal profundo, mais conhecido por DHP, são elementos que captam as águas distantes da face do talude antes que nela aﬂorem, conduzindo a água para fora do maciço no sentido de rebaixar o nível do lençol freático, reduzindo as pressões neutras. É construído por meio de uma perfuração sub-horizontal, geralmente com diâmetro de 50 a 100 mm, executada com uma inclinação de 5° a 10º para cima, de forma a propiciar a saída da água por gravidade. Nessa perfuração, é introduzida uma tubulação de PVC, geralmente de 38 a 50 mm de diâmetro, constituída por um trecho ﬁltrante através de furos ou ranhuras no tubo. O trecho ﬁltrante pode ser ou não envolvido por geotêxtil ou tela de nylon.", image: "/DHP.png" },
    { slug: "tirantes", title: "Tirantes", description: "Os tirantes são basicamente constituídos por um ou mais elementos de aço protegidos contra a corrosão (barras, ﬁos ou cordoalhas) capaz de suportar esforços de tração e transmiti-los ao solo através de interação com o bulbo de ancoragem. Os tirantes são utilizados para sustentação de paredes para escavações profundas, contenção de taludes e ancoragem de lajes para combater supressões de água. Podem suportar elevadas cargas de tração, possuem simplicidade construtiva, são funcionais pois trabalham ativamente devido a protensão, isto signiﬁca que podem suportar esforços com um mínimo de deslocamentos da estrutura, em oposição a outras soluções convencionais que necessitam de uma movimentação para a contenção começar a funcionar, além de todos os tirantes serem ensaiados individualmente (ensaios de recebimento), o que representa uma garantia de qualidade 100% dos elementos construídos em relação à capacidade de carga.", image: "/Tirante.png" },
  ];

  return (
    <div>
      <div className="hero">
        <div className="green-detail"></div>
        <Image src="/IntroServiços.png" alt="Hero" width={1520} height={500} />
      </div>
      <div className="container">
      <h1 className="text-4xl font-bold mb-10 text-left text-[#027A48]">Nossos Serviços</h1>
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
                <Link key={service.slug} style={{ color: '#027A48' }} className="text-green-600 font-semibold hover:underline"
href={`/servicos/${service.slug}`}>
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
margin-bottom: 0.2rem;        }
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
padding: 4rem 10rem 5rem;  
  margin-top: 0;
  padding-top: 0;      }
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