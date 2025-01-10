import { Gallery7 } from "~/components/Gallery7";
import Navbar from "~/components/navbar";
import { Footer1 } from "~/components/ui/footer";
import { obras } from "~/lib/obras";
import Image from "next/image"; // Componente otimizado para imagens

// Define o tipo da Obra (Servico)
interface Obra {
  slug: string;
  title: string;
  description: string;
  gallery: { url: string; alt: string }[];
  image: string;
}

// Rota dinâmica recebe `params`
interface ServicoPageProps {
  params: {
    servico: string;
  };
}

// Componente principal da página
export default function ServicoPage({ params }: ServicoPageProps) {
  const { servico } = params;
  const obra = obras.find((obra) => obra.slug === servico); // Busca a obra correspondente

  // Se a obra não for encontrada
  if (!obra) {
    return <div>Serviço não encontrado.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Conteúdo principal */}
      <main className="container mx-auto px-40 py-10 mb-0">
        <h1 className="text-4xl font-bold mb-10 text-left text-[#027A48]">{obra.title}</h1>
        <p className="mb-20 text-lg text-justify">{obra.description}</p>

        {/* Imagem principal */}
        <div className="mb-3 w-full h-auto rounded-md shadow-md">
          <Image
            src={obra.image}
            alt={obra.title}
            width={800}
            height={600}
            className="rounded-md"
            priority
          />
        </div>
        <p className="text-lg font-bold text-left">| Publicado por Proeng Geotécnia</p>

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

// Configuração para tornar a rota estática
export async function generateStaticParams() {
  return obras.map((obra) => ({
    servico: obra.slug,
  }));
}
