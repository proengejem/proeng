import Navbar from "~/components/navbar";
import { Footer1 } from "~/components/ui/footer";
import { obras } from "~/lib/obras";
import { Obra, obrasCards } from "~/components/ObrasCards"; 
import Link from "next/link";
import WhatsAppIcon from "~/components/whatsapp";
import { notFound } from "next/navigation";


// Generate static params at build time
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
      <h2 className="text-2xl font-semibold mb-4 text-[#027A48]">Obras Relacionadas</h2>
      <p className="text-gray-600 mb-4">Não foi possível carregar as obras relacionadas. Por favor, tente novamente mais tarde.</p>
      <Link href="/portifolio" className="text-[#027A48] font-medium hover:underline">
        Ver todas as obras →
      </Link>
    </div>
  );
}

// Main page component
export default async function Page({ params }: {params : Promise<{ servico : string}>}) {
  // Get the slug from params in a typesafe way
  const { servico: slug } = await params;
  
  // Find the obra in our static data
  const obra = obras.find(o => o.slug === slug);
  
  // Return 404 if obra not found
  if (!obra) {
    return notFound();
  }
  
  // Try to load dynamic obras data
  let dynamicObras: Obra[] | null = [];
  let hasError : boolean = false;
  
  try {
    // Load all obras from database
    const allObras = await obrasCards();
    
    // Filter to just this service
    dynamicObras = allObras
      .filter(o => o.service === slug)
      .reverse();
  } catch (error) {
    console.error("Error loading obras:", error);
    hasError = true;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Título */}
        <h1 className="text-4xl font-bold mb-10 text-center text-[#027A48]">{obra.title}</h1>
        
        {hasError ? (
          <DynamicObrasFallback />
        ) : dynamicObras.length > 0 ? (
          <section className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {dynamicObras.map((obraDinamica : Obra) => (
                <a
                  key={obraDinamica?.id}     
                  href={`/portifolio/${obraDinamica?.service}/${obraDinamica?.id}`}
                  className="relative group overflow-hidden rounded-lg shadow-2xl rounded-lg border rounded p-4 overflow-hidden border transform transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={obraDinamica.images[0] || "/placeholder.jpg"}
                    alt={obraDinamica.name}
                    width={300}
                    height={200}
                    className="w-full h-60 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold mt-2">{obraDinamica?.name}</h3>
                  <span className="text-[#027A48] font-semibold hover:underline">
                    Ver obra →
                  </span>
                </a>
              ))}
            </div>
          </section>
        ) : (
          <p className="text-center text-gray-500">Nenhuma obra encontrada para este serviço.</p>
        )}
      </main>
      
      <WhatsAppIcon />
      <Footer1 />
    </div>
  );
}