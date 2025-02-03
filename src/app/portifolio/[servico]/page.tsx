import { Gallery7 } from "~/components/Gallery7";
import Navbar from "~/components/navbar";
import { Footer1 } from "~/components/ui/footer";
import { obras } from "~/lib/obras";
import { obrasCards } from "~/components/ObrasCards"; // Importando o novo array
import Image from "next/image";
import BlurFade from "~/components/ui/blur-fade"; 
import WhatsAppIcon from "~/components/whatsapp";
import { TypewriterEffectSmooth } from "~/components/ui/typewriter-effect";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfólio - ProEng',
  description: 'Veja nosso portfólio de projetos e obras concluídas com excelência.',
  keywords: ['portfólio', 'obras', 'projetos', 'engenharia', ],
  
};

interface ServicoPageProps {
  params: Promise<{ servico: string }>;
}

// Gera parâmetros estáticos
export async function generateStaticParams() {
  return obras.map((obra) => ({
    servico: obra.slug,
  }));
}



export default async function ServicoPage({ params }: ServicoPageProps) {
  const { servico } = await params;

  // Encontra a obra correspondente
  const obra = obras.find((obra) => obra.slug === servico);

  if (!obra) {
    return <div>Serviço não encontrado.</div>;
  }

  // Busca as obras dinamicamente utilizando obrasCards
  const todasObrasDinamicas = await obrasCards();

  // Filtra apenas as obras que correspondem ao serviço atual
  const obrasDinamicasFiltradas = todasObrasDinamicas
    .filter((obraDinamica) => obraDinamica.service === obra.slug)
    // .slice(-3) // Pega apenas as 3 últimas obras adicionadas
    .reverse(); // Coloca a obra mais recente como a primeira

    const words = [
      {
        text: obra.title,
      },
    ];

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <BlurFade delay={0.3}> 
        <TypewriterEffectSmooth words={words} className="flex justify-center font-bold mb-6" />
       
        {/* COMENTÁRIO JSX <h1 className="text-4xl font-bold mb-4 text-center text-[#027A48]">{obra.title}</h1>*/}
        <h2 className="text-xl font-medium mb-10 text-center text-gray-700">Veja as obras de quem tem experiência no mercado!</h2>
        </BlurFade>
        <BlurFade delay={0.5}>        
        <section className="w-full mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {obrasDinamicasFiltradas.slice(0).map((obraDinamica) => (
            <a
      key={obraDinamica.id}     href={`/portifolio/${obraDinamica.service}/${obraDinamica.id}`}
      className="relative group overflow-hidden rounded-lg shadow-2xl border-2 transform transition-transform duration-300 hover:scale-105">
                  <img
                    src={obraDinamica.images[0] || "/placeholder.jpg"}
                    alt={obraDinamica.name}
                    width={300}
                    height={200}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mt-2">{obraDinamica.name}</h3>
                    <a href={`/portifolio/${obraDinamica.service}/${obraDinamica.id}`}
                      className="text-[#027A48] font-semibold hover:underline"
                    > Ver obra →  </a>
                  </div>
              </a>
              ))}
          </div>
        </section>
        </BlurFade>

      </main>
      <WhatsAppIcon />

      <Footer1 />
    </div>
  );
}







