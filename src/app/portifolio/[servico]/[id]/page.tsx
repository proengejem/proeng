"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import Navbar from "~/components/navbar";
import { Footer1 } from "~/components/ui/footer";
import WhatsAppIcon from "~/components/whatsapp";
import { createClient } from "@supabase/supabase-js";

// Configuração do Supabase
const supabase = createClient(
  "https://xaljbeozaieyoecnxvum.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhbGpiZW96YWlleW9lY254dnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDUwNDIsImV4cCI6MjA1MjUyMTA0Mn0.4GCZtQ2tGMkHSlvZgzCP2s7QlT7hlOOdzz5jLvCYyT8"
);

interface Obra {
  id: number;
  name: string;
  description: string;
  service: string;
  images: string[];
}

async function fetchObra(id: string): Promise<Obra | null> {
  try {
    const { data, error } = await supabase
      .from("obras")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;

    const folderName = data.name;
    const { data: files } = await supabase.storage
      .from("Obras")
      .list(folderName, { limit: 100 });

    const imageUrls =
      files?.map(
        (file) =>
          supabase.storage
            .from("Obras")
            .getPublicUrl(`${folderName}/${file.name}`).data.publicUrl
      ) || [];

    return { ...data, images: imageUrls };
  } catch (error) {
    console.error("Erro inesperado:", error);
    return null;
  }
}

const ObraPage = () => {
  const params = useParams();
  const [obra, setObra] = useState<Obra | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allObras, setAllObras] = useState<Obra[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadObra = async () => {
        if (!params?.id) {
          notFound();
          return;
        }

        const fetchedObra = await fetchObra(params.id as string);
        if (!fetchedObra) {
          notFound();
        } else {
          setObra(fetchedObra);
        }
        setIsLoading(false);
      };

      loadObra();
    }
  }, [params?.id]);

  useEffect(() => {
    const fetchAllObras = async () => {
      try {
        const { data, error } = await supabase
          .from("obras")
          .select("id, name, description, service, created_at")
          .order("created_at", { ascending: false });

        if (!error && data && obra) {
          const obrasDoMesmoServico = data.filter(
            (obraItem) => obraItem.service === obra.service
          );

          let filteredObras = obrasDoMesmoServico.slice(0, 3);

          // Se a obra atual estiver entre as 3 mais recentes, incluir a 4ª mais recente
          if (filteredObras.some((obraItem) => obraItem.id === obra.id)) {
            filteredObras = obrasDoMesmoServico.slice(0, 4);
          }

          filteredObras = filteredObras.filter(
            (obraItem) => obraItem.id !== obra.id
          ).slice(0, 3); // Garantir que apenas 3 sejam exibidas

          const obrasComImagens = await Promise.all(
            filteredObras.map(async (obraItem) => {
              const { data: files } = await supabase.storage
                .from("Obras")
                .list(obraItem.name, { limit: 1 });

              const imageUrl =
                files && files.length > 0
                  ? supabase.storage
                      .from("Obras")
                      .getPublicUrl(`${obraItem.name}/${files[0].name}`).data
                      .publicUrl
                  : null;

              return { ...obraItem, image: imageUrl };
            })
          );

          setAllObras(obrasComImagens);
        }
      } catch (err) {
        console.error("Erro ao buscar todas as obras:", err);
      }
    };

    if (obra) fetchAllObras();
  }, [obra]);
  
  

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!obra) {
    return null;
  }

  return <ObraDetails obra={obra} setObra={setObra} allObras={allObras} />;
};

const ObraDetails = ({
  obra,
  setObra,
  allObras,
}: {
  obra: Obra;
  setObra: React.Dispatch<React.SetStateAction<Obra | null>>;
  allObras: Obra[];
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? obra.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === obra.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleCardClick = async (id: number) => {
    const fetchedObra = await fetchObra(id.toString());
    if (fetchedObra) {
      setObra(fetchedObra);
      setCurrentImageIndex(0);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="relative">
        {obra.images.length > 0 ? (
          <div className="relative">
            <Image
              src={obra.images[currentImageIndex] || ""}
              alt={obra.name}
              className="w-full h-[85vh] object-cover"
              // className="w-full h-[85vh] object-contain"
               width={800} height={600}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow hover:scale-110 transition-transform"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow hover:scale-110 transition-transform"
            >
              ›
            </button>
            

            {/* Indicadores de navegação em forma de círculos */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {obra.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentImageIndex
                      ? "bg-white scale-125"
                      : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
            <div className="absolute bottom-4 left-6 text-white z-10">
              <h1 className="text-3xl font-bold">{obra.name}</h1>
              <p className="text-lg mt-2">{obra.description}</p>
            </div>
          </div>
        ) : (
          <div className="h-[70vh] bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Imagem não disponível</p>
          </div>
        )}
      </main>

      <section className="p-10">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Outras obras</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {allObras
    .filter((obraItem) => obraItem.id !== obra.id)
    .map((obraItem) => (
      <div
        key={obraItem.id}
        className="cursor-pointer bg-white shadow-2xl rounded-lg overflow-hidden border transform transition-transform duration-300 hover:scale-105"
        onClick={() => handleCardClick(obraItem.id)}
      >
        {obraItem.image ? (
          <img
            src={obraItem.image}
            alt={obraItem.name}
            className="h-60 w-full object-cover"
          />
        ) : (
          <div className="h-60 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Imagem não disponível</p>
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-bold">{obraItem.name}</h3>
        </div>
      </div>
    ))}
</div>
      </section>
      <WhatsAppIcon />
      <Footer1 />
    </div>
  );
};

export default ObraPage;

