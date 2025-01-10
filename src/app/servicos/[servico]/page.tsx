import { Gallery7 } from "~/components/Gallery7"; // Certifique-se de ajustar o caminho se necessário
import Navbar  from "~/components/navbar";
import { Footer1 } from "~/components/ui/footer";
import { obras } from "~/lib/obras";
import Image from "next/image";


// Define os tipos para `params` e `servico`

interface Servico {
  title: string;
  description: string;
  gallery: { url: string; alt: string }[];
  image: string;  // Ajuste conforme o formato da galeria
}

export default function ServicoPage({ params }: { params: { servico: string } }) {
  const obra = obras.find((obra) => obra.slug === params.servico) as Servico | undefined;

  if (!obra) {
    return <div>Serviço não encontrado.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
  
      {/* Conteúdo principal */}
      <main className="container mx-auto px-40 py-10 mb-0"> {/* Reduzindo o espaçamento inferior */}
        <h1 className="text-4xl font-bold mb-10 text-left text-[#027A48]">{obra.title}</h1>
        <p className="mb-20 text-lg text-justify">{obra.description}</p>
        <Image
          src={obra.image}
          alt={obra.title}
          width={800}
          height={600}
          className="mb-3 w-full h-auto rounded-md shadow-md"
        />
        <p className="text-lg font-bold text-left">| Publicado por Proeng Geotécnia</p>

        <Gallery7
          heading="Galeria de Obras"
          description=""
          images={obra.gallery}
          headingClassName="text-lg font-semibold mb-4 text-center"
        />
      </main>

      <Footer1 />
    </div>
  );
}