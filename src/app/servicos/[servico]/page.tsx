

import { Gallery7 } from "~/components/Gallery7";
import Navbar from "~/components/navbar";
import { Footer1 } from "~/components/ui/footer";
import { obras } from "~/lib/obras";
import Image from "next/image";
import { notFound } from "next/navigation";
import ObrasCards from "~/components/ObrasCards"; // Importando o componente ObrasCards

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

  // Filtra obras que não estão na galeria "Gallery7"
  const outrasObras = obras.filter((o) => o.slug !== servico);

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
      <main className="container mx-auto px-24 py-10 flex flex-col items-start">
        {/* Título */}
        <h1 className="text-4xl font-bold mb-4 text-left text-[#027A48]">
          {obra.title}
        </h1>

        {/* Descrição */}
        <p className="mb-6 text-lg text-gray-700 text-justify">{obra.description}</p>

        {/* Imagem principal */}
        <div className="w-full mb-6">
          <img
            src={obra.image}
            alt={obra.title}
            className="h-[50vh] object-cover rounded-lg shadow-lg"
          />
          <p className="mt-2 text-sm text-gray-500">| Publicado por Proeng Geotécnia</p>
        </div>

        {/* Galeria de obras */}
        <section className="w-full mt-10">
          <h2 className="text-2xl font-semibold mb-4">Obras de {obra.title}</h2>
          <Gallery7
            heading=""
            description=""
            images={obra.gallery}
            headingClassName="hidden" // Oculta o heading padrão
          />
        </section>

        {/* Obras Disponíveis */}
        <section className="w-full mt-16">
          <h2 className="text-2xl font-semibold mb-4">Obras Disponíveis</h2>
          <ObrasCards /> {/* Componente adicionado aqui */}
        </section>

        {/* Outras obras */}
        <section className="w-full mt-16">
          <h2 className="text-2xl font-semibold mb-4">Outras Obras</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outrasObras.map((outraObra) => (
              <div key={outraObra.slug} className="border rounded-lg p-4 shadow-lg bg-white">
                <img
                  src={outraObra.image}
                  alt={outraObra.title}
                  className="h-48 w-full object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-[#027A48] mb-2">
                  {outraObra.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {outraObra.description}
                </p>
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
