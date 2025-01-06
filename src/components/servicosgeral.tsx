"use client";
import Image from 'next/image';
import Link from "next/link";

export default function Servicos() {
    const services = [
        { servico: "solo-grampeado", title: 'Solo Grampeado', description: "Lorem ipsum dolor sit amet...", image: '/SoloGrampeado.png', link: '/servicos/solo-grampeado' },
        { servico:"concreto-projetado",title: 'Concreto Projetado', description: "Lorem ipsum dolor sit amet...", image: '/ConcretoProj.png', link: '/servicos/concreto-projetado' },
        { servico:"hélice-contínua-monitorada",title: 'Hélice Contínua Monitorada', description: "Lorem ipsum dolor sit amet...", image: '/HéliceContM.png', link: '/servicos/helice-continua-monitorada' },
        { servico:"estaca-raiz",title: 'Estaca Tipo Raiz', description: "Lorem ipsum dolor sit amet...", image: '/EstacasTpRaiz.png', link: '/servicos/estaca-tipo-raiz' },
        { servico:"micro-estacas-injetadas", title: 'Micro Estacas Injetadas', description: "Lorem ipsum dolor sit amet...", image: '/MicroEstacasInj.png', link: '/servicos/micro-estacas-injetadas' },
        { servico:"injeções-consolidação", title: 'Injeções de Consolidação', description: "Lorem ipsum dolor sit amet...", image: '/InjeçõesConsolid.png', link: '/servicos/injecoes-de-consolidacao' },
        { servico:"dreno-sub-horizontal-profundo", title: 'Dreno Sub-Horizontal Profundo', description: "Lorem ipsum dolor sit amet...", image: '/DHP.png', link: '/servicos/d-h-p' },
        { servico:"tirantes", title: 'Tirantes', description: "Lorem ipsum dolor sit amet...", image: '/Tirante.png', link: '/servicos/tirante' },
    ];    

    return (
        <div>
            <div className="hero">
                <div className="green-detail"></div>
                <Image src="/IntroServiços.png" alt="Hero" width={1520} height={500} />
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
                    margin-buttom: 0.5rem
                }
                .hero img {
                    position: relative;
                    z-index: 0; /* Garante que a imagem fique atrás do detalhe verde */
                }
                .green-detail { /* Detalhe verde sobreposto */
                    position: absolute;
                    bottom: 0; /* Alinha o detalhe na parte inferior da imagem */
                    left: 0; /* Alinha na borda esquerda */
                    width: 100%;
                    height: 60px; /* Ajuste para corresponder à altura do detalhe */
                    background-color: #055634; /* Cor verde escura */
                    clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 0); /* Ajuste fino do formato */
                    z-index: 1; /* Garante que o detalhe fique acima da imagem */
                }
               .container {
    padding: 5rem 2rem; /* Padrão */
}

@media (max-width: 768px) {
    .container {
        padding: 2rem 1rem; /* Telas menores */
    }
}

                h1 {
                    text-align: center;
                    font-size: 3rem;
                    margin-top: 0;
                }
                    
                p {
                    text-align: center;
                    margin-top: 0.5rem;
                    color: #555;
                }
              .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Adapta o número de colunas */
    gap: 20px;
    margin-top: 90px;
}
                .card {
                    border: 1px solid #c3e6cb;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s ease-in-out;
                }
                .card:hover {
                    transform: scale(1.03);
                }
               .image-container {
    height: auto;
    aspect-ratio: 16 / 9; /* Mantém a proporção 16:9 */
}
                .card-content {
                    padding: 1rem;
                }
                .card h2 {
                    font-size: 1.2rem;
                    margin-bottom: 0.5rem;
                }
                .card p {
                    color: #555;
                    margin-bottom: 1rem;
                }
                .link {
                    color: #28a745;
                    text-decoration: none;
                    font-weight: bold;
                    transition: color 0.3s ease;
                }
                .link:hover {
                    color: #1e7e34;
                }
                    @media (max-width: 768px) {
    h1 {
        font-size: 2rem;
    }
}

@media (max-width: 768px) {
    .card h2 {
        font-size: 1.2rem;
    }
}
            `}</style>
        </div>
    );
}

