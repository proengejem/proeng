import { Gallery7 } from "~/components/Gallery7"; // Certifique-se de ajustar o caminho se necessário
import Navbar  from "~/components/navbar";
import { Footer1 } from "~/components/ui/footer";
import { obras } from "~/lib/obras";

export default function ServicoPage({ params }: any) {
  const { servico } = params;
  const obra = obras.find((obra) => obra.slug === servico);

  if (!servico) {
    return <div>Serviço não encontrado.</div>;
  }
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />
  
      {/* Conteúdo principal */}
      <main className="container mx-auto px-80 py-10 mb-0"> {/* Reduzindo o espaçamento inferior */}
        <h1 className="text-4xl font-bold mb-10 text-left text-[#027A48]">{servico.title}</h1>
        <p className="mb-20 text-lg text-justify">{servico.description}</p>
        {obra ? (
          <>
            <img
              src={obra.image}
              // width={90}
              // height={90}
              alt={obra.title}
              className="mb-3 w-full h-auto rounded-md shadow-md"
            />
            <p className="text-lg font-bold text-left">
              | Publicado por Proeng Geotécnia
            </p>
          </>
        ) : (
          <div>Obra não encontrada.</div>
        )}
  
        {/* Galeria */}
        <Gallery7
          heading="Galeria de Obras"
          description=""
          images={servico.gallery}
          headingClassName="text-lg font-semibold mb-4 text-center" // Tamanho menor e centralizado
        />
      </main>
  
      {/* Footer */}
      <Footer1 />
    </div>
  );
};