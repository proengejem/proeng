"use client";

import React, { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Navbar from "~/components/navbar";
import { Footer1 } from "~/components/ui/footer";
import { createClient } from "@supabase/supabase-js";

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
  }, [params?.id]);

  useEffect(() => {
    const fetchAllObras = async () => {
      try {
        const { data, error } = await supabase
          .from("obras")
          .select("id, name, description, service");

        if (!error && data && obra) {
          const filteredObras = data.filter(
            (obraItem) => obraItem.service === obra.service
          );
          setAllObras(filteredObras);
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
    return null; // notFound já lidará com isso
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

  const handleCardClick = async (id: number) => {
    const fetchedObra = await fetchObra(id.toString());
    if (fetchedObra) {
      setObra(fetchedObra);
      setCurrentImageIndex(0); // Resetar índice ao mudar obra
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="relative">
        {obra.images.length > 0 ? (
          <div className="relative">
            <img
              src={obra.images[currentImageIndex]}
              alt={obra.name}
              className="w-full h-[70vh] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gradient-to-r from-gray-600 to-gray-800 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <span className="text-xl">‹</span>
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gradient-to-r from-gray-800 to-gray-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <span className="text-xl">›</span>
            </button>

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

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {allObras
    .filter(
      (obraItem) => 
        obraItem.service === obra.service && obraItem.id !== obra.id // Filtro por service e exclusão da obra atual
    )
    .map((obraItem) => (
      <div
        key={obraItem.id}
        className="cursor-pointer bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
        onClick={() => handleCardClick(obraItem.id)}
      >
        <h2 className="text-xl font-bold mb-2">{obraItem.name}</h2>
        <p className="text-gray-600">{obraItem.description}</p>
      </div>
    ))}
</section>

    </div>
  );
};

export default ObraPage;






