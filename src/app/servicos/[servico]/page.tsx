import { Gallery7 } from "~/components/Gallery7";
import Navbar from "~/components/navbar";
import { Footer1 } from "~/components/ui/footer";
import { obras } from "~/lib/obras";
import Image from "next/image";
import { notFound } from "next/navigation";
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
        <p className="mb-6 text-lg text-gray-700 text-justify">
          {obra.description}
        </p>

        {/* Imagem principal */}
        <div className="w-full mb-6 flex flex-col items-center">
        <img
            src={obra.image}
            alt={obra.title}
            className=" h-[50vh] object-cover rounded-lg shadow-lg"
          />
          <p className="mt-2 text-sm text-gray-500">
            | Publicado por Proeng Geotécnia
          </p>
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
      </main>

      {/* Footer */}
      <Footer1 />
    </div>
  );
}

