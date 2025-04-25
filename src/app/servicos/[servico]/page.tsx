'client'

import { Gallery7 } from "~/components/Gallery7";
import Navbar from "~/components/navbar";
import { Footer1 } from "~/components/ui/footer";
import { obras } from "~/lib/obras";
import { Obra, obrasCards } from "~/components/ObrasCards"; 
import Image from "next/image";
import Link from "next/link";
import WhatsAppIcon from "~/components/whatsapp";
import type { Metadata } from 'next';
import { Suspense } from "react";
import { notFound } from "next/navigation";

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

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-16 h-16 border-t-4 border-[#027A48] border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Carregando conteúdo...</p>
    </div>
  );
}

// Component for when dynamic obras can't be loaded
function DynamicObrasFallback() {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-[#027A48]">Últimas Obras</h2>
      <p className="text-gray-600 mb-4">Não foi possível carregar as obras mais recentes. Por favor, tente novamente mais tarde.</p>
      <Link href="/portifolio" className="text-[#027A48] font-medium hover:underline">
        Ver todas as obras →
      </Link>
    </div>
  );
}

async function ServicoContent({ servicoSlug }: { servicoSlug: string }) {
  // Encontra a obra correspondente no array local
  const obra = obras.find((obra) => obra.slug === servicoSlug);

  if (!obra) {
    return notFound();
  }

  // Tenta carregar as obras dinâmicas, mas com tratamento de erro
  let obrasDinamicasFiltradas : any = [];
  let loadError = false;
  
  try {
    // Busca as obras dinamicamente utilizando obrasCards
    const todasObrasDinamicas = await obrasCards();

    // Filtra apenas as obras que correspondem ao serviço atual
    obrasDinamicasFiltradas = todasObrasDinamicas
      .filter((obraDinamica) => obraDinamica.service === obra.slug)
      .slice(-3) // Pega apenas as 3 últimas obras adicionadas
      .reverse(); // Coloca a obra mais recente como a primeira
  } catch (error) {
    console.error("Erro ao carregar obras dinâmicas:", error);
    loadError = true;
  }

  return (
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
          width={700} 
          height={300} 
          className="h-[60vh] object-cover rounded-lg shadow-lg"
          priority
        />
        <p className="mt-2 text-sm text-gray-500">| Publicado por Proeng Geotécnia</p>
      </div>

      {/* Renderização dinâmica das 3 últimas obras */}
      {loadError ? (
        <DynamicObrasFallback />
      ) : obrasDinamicasFiltradas.length > 0 ? (
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
              {obrasDinamicasFiltradas.slice(1).map((obraDinamica : Obra) => (
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
      ) : null}

      {/* Outros serviços */}
      <section className="w-full mt-16">
        <h2 className="text-2xl font-semibold mb-4">Outros Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {obras
            .filter((o) => o.slug !== servicoSlug)
            .map((outraObra) => (
              <div
                key={outraObra.slug}
                className="border rounded-lg p-4 shadow-lg rounded-lg bg-white overflow-hidden border transform transition-transform duration-300 hover:scale-105"
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
  );
}

// Breadcrumb component to avoid params access issues
function ServicoBreadcrumb({ servicoSlug }: { servicoSlug: string }) {
  const obraTitle = obras.find(o => o.slug === servicoSlug)?.title || "Carregando...";
  
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <p className="text-sm text-gray-500">
          <Link href="/servicos">
            Serviços
          </Link> &gt;{" "}
          <span className="font-semibold text-gray-700">
            {obraTitle}
          </span>
        </p>
      </div>
    </header>
  );
}

export default async function ServicoPage({ params }: {params : Promise<{ servico : string}>}) {
  // Extract servico slug safely
  const { servico: servicoSlug } = await params;
  
  // Check if servicoSlug is valid
  if (!servicoSlug) {
    return notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb with extracted param */}
      <ServicoBreadcrumb servicoSlug={servicoSlug} />

      <Suspense fallback={<LoadingFallback />}>
        <ServicoContent servicoSlug={servicoSlug} />
      </Suspense>

      <WhatsAppIcon />
      <Footer1 />
    </div>
  );
}