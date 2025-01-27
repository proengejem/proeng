import { Gallery7 } from "~/components/Gallery7";
import Navbar from "~/components/navbar";
import { Footer1 } from "~/components/ui/footer";
import { obras } from "~/lib/obras";
import { obrasCards } from "~/components/ObrasCards"; // Importando o novo array
import Image from "next/image";
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Serviços - ProEng',
  description: 'Conheça nossos serviços especializados em engenharia.',
  keywords: ['serviços', 'engenharia', 'ProEng', 'geotecnia', 'fundação'],
};


interface ServicoPageProps {
  params: { servico: string };
}

// Gera parâmetros estáticos
export async function generateStaticParams() {
  return obras.map((obra) => ({
    servico: obra.slug,
  }));
}

export default async function ServicoPage({ params }: ServicoPageProps) {
  // Obtem o parâmetro "servico"
  const { servico } = params;

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
    .slice(-3) // Pega apenas as 3 últimas obras adicionadas
    .reverse(); // Coloca a obra mais recente como a primeira

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Cabeçalho com Breadcrumb */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm text-gray-500">
            Serviços &gt;{" "}
            <span className="font-semibold text-gray-700">{obra.title}</span>
          </p>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 lg:px-24 py-10 flex flex-col items-start">
        {/* Título */}
        <h1 className="text-4xl font-bold mb-4 text-left text-[#027A48]">
          {obra.title}
        </h1>

        {/* Descrição */}
        <p className="mb-6 text-lg text-gray-700 text-justify">{obra.description}</p>

        {/* Imagem principal */}
        <div className="w-full mb-6 flex flex-col items-center">
          <Image
            src={obra.image}
            alt={obra.title}
            width={500} // Set the width (in pixels or appropriate size)
            height={300} 
            className="h-[50vh] object-cover rounded-lg shadow-lg"
          />
          <p className="mt-2 text-sm text-gray-500">| Publicado por Proeng Geotécnia</p>
        </div>

        {/* Renderização dinâmica das 3 últimas obras */}
        <section className="w-full mt-10">
          <h2 className="text-2xl font-semibold mb-4">Últimas Obras</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  {/* Obra mais recente (destaque principal) */}
  {obrasDinamicasFiltradas[0] && (
  <a href={`/servicos/${obrasDinamicasFiltradas[0].service}/${obrasDinamicasFiltradas[0].id}`} className="lg:col-span-2 relative group overflow-hidden rounded-lg shadow-lg">

    <img
      src={obrasDinamicasFiltradas[0].images[0] || "/placeholder.jpg"}
      alt={obrasDinamicasFiltradas[0].name}
      className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-300"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
    <div className="absolute bottom-4 left-4 text-white p-4">
      <h3 className="text-lg font-bold">{obrasDinamicasFiltradas[0].name}</h3>
    </div>
  </a>
)}

  {/* Outras duas obras */}
  <div className="flex flex-col gap-6">
  {obrasDinamicasFiltradas.slice(1).map((obraDinamica) => (
    <a
      key={obraDinamica.id}
      
      href={`/servicos/${obraDinamica.service}/${obraDinamica.id}`}
      className="relative group overflow-hidden rounded-lg shadow-lg h-[190px]"
    >
      <img
        src={obraDinamica.images[0] || "/placeholder.jpg"}
        alt={obraDinamica.name}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 text-white p-3">
        <h3 className="text-sm font-bold">{obraDinamica.name}</h3>
      </div>
    </a>
  ))}
</div>
</div>

        </section>

        {/* Outros serviços */}
        <section className="w-full mt-16">
          <h2 className="text-2xl font-semibold mb-4">Outros Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {obras
              .filter((o) => o.slug !== servico)
              .map((outraObra) => (
                <div
                  key={outraObra.slug}
                  className="border rounded-lg p-4 shadow-lg bg-white"
                >
                  <img
                    src={outraObra.image}
                    alt={outraObra.title}
                    className="h-48 w-full object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold text-[#027A48] mb-2">
                    {outraObra.title}
                  </h3>
                  
                  <a
                    href={`/servicos/${outraObra.slug}`}
                    className="text-[#027A48] font-medium hover:underline"
                  >
                    Ver mais
                  </a>
                </div>
              ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer1 />
    </div>
  );
}





