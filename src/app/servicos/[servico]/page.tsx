import { Gallery7 } from "~/components/Gallery7";
import Navbar from "~/components/navbar";
import { Footer1 } from "~/components/ui/footer";
import { obras } from "~/lib/obras";

// Gera parâmetros estáticos
export async function generateStaticParams() {
  return obras.map((obra) => ({
    servico: obra.slug,
  }));
}

export default async function ServicoPage({ params }: any) {
  // Obtem o parâmetro "servico"
  const { servico } = await params;

  // Encontra a obra correspondente
  const obra = obras.find((obra) => obra.slug === servico);

  if (!obra) {
    return <div>Serviço não encontrado.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-10 text-left text-[#027A48]">
          {obra.title}
        </h1>
        <p className="mb-20 text-lg text-justify">{obra.description}</p>
        <img
          src={obra.image}
          alt={obra.title}
          className="mb-3 w-full h-auto rounded-md shadow-md"
        />
        <p className="text-lg font-bold text-left">
          | Publicado por Proeng Geotécnia
        </p>

        {/* Galeria */}
        <Gallery7
          heading="Galeria de Obras"
          description=""
          images={obra.gallery}
          headingClassName="text-lg font-semibold mb-4 text-center"
        />
      </main>

      {/* Footer */}
      <Footer1 />
    </div>
  );
}
