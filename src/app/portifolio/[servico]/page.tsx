// Server component for Portfolio page
import Navbar from "~/components/navbar";
import { Footer1 } from "~/components/ui/footer";
import { obras } from "~/lib/obras";
import { Obra, obrasCards } from "~/components/ObrasCards"; 
import Link from "next/link";
import WhatsAppIcon from "~/components/whatsapp";
import { notFound } from "next/navigation";
import ObraCardList from "~/components/obras/ObraCardList";

// Generate static params at build time
export async function generateStaticParams() {
  return obras.map((obra) => ({
    servico: obra.slug,
  }));
}

// Main page component
export default async function Page({ params }: {params : Promise<{ servico : string}>}) {
  // Get the slug from params
  const { servico: slug } = await params;
  
  // Find the obra in our static data
  const obra = obras.find(o => o.slug === slug);
  
  // Return 404 if obra not found
  if (!obra) {
    return notFound();
  }
  
  // Try to load dynamic obras data
  let dynamicObras: Obra[] | null = [];
  let hasError = false;
  let errorMessage = "";
  
  try {
    // Load all obras from database
    const allObras = await obrasCards();
    
    // Log for debugging purposes
    console.log(`Found ${allObras.length} total obras`);
    
    // Filter to just this service
    dynamicObras = allObras
      .filter(o => o.service === slug)
      .reverse();
      
    console.log(`Found ${dynamicObras.length} obras matching service: ${slug}`);
  } catch (error) {
    console.error("Error loading obras:", error);
    hasError = true;
    errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Título */}
        <h1 className="text-4xl font-bold mb-6 text-center text-[#027A48]">{obra.title}</h1>
        <p className="text-center mb-10">Conheça nossas obras de {obra.title}</p>
        
        {hasError ? (
          <div className="bg-gray-50 rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#027A48]">Obras Relacionadas</h2>
            <p className="text-gray-600 mb-4">Não foi possível carregar as obras relacionadas. Por favor, tente novamente mais tarde.</p>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">Erro: {errorMessage}</p>
            )}
            <Link href="/portifolio" className="text-[#027A48] font-medium hover:underline">
              Ver todas as obras →
            </Link>
          </div>
        ) : dynamicObras.length > 0 ? (
          <section className="w-full">
            <ObraCardList obras={dynamicObras} />
          </section>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">Nenhuma obra encontrada para este serviço.</p>
            <Link href="/portifolio" className="text-[#027A48] font-medium hover:underline">
              Ver todas as obras →
            </Link>
          </div>
        )}
      </main>
      
      <WhatsAppIcon />
      <Footer1 />
    </div>
  );
}