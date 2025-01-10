import { Gallery7 } from "~/components/Gallery7";
import Navbar from "~/components/navbar";
import { Footer1 } from "~/components/ui/footer";
import { obras } from "~/lib/obras";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ServicoPageProps {
  params: { servico: string };
}

export async function generateStaticParams() {
  return obras.map((obra) => ({
    params: { servico: obra.slug },
  }));
}

export default function ServicoPage({ params }: ServicoPageProps) {
  const { servico } = params;

  const obra = obras.find((obra) => obra.slug === servico);

  if (!obra) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto px-40 py-10 mb-0">
        <h1 className="text-4xl font-bold mb-10 text-left text-[#027A48]">
          {obra.title}
        </h1>
        <p className="mb-20 text-lg text-justify">{obra.description}</p>
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