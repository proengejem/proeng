"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

// Configuração do Supabase
const supabase = createClient(
  "https://xaljbeozaieyoecnxvum.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhbGpiZW96YWlleW9lY254dnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDUwNDIsImV4cCI6MjA1MjUyMTA0Mn0.4GCZtQ2tGMkHSlvZgzCP2s7QlT7hlOOdzz5jLvCYyT8"
);

interface VideoData {
  service: string;
  created_at: string;
  idUrl: string;
  description?: string;
}

// Interface para as props do componente de cartão de vídeo
interface VideoCardProps {
  videoUrl: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

// Componente de cartão de vídeo
const VideoCard: React.FC<VideoCardProps> = ({
  videoUrl,
  title,
  description,
  linkText,
  linkUrl,
}) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden border">
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={videoUrl}
        title={title}
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 font-semibold hover:underline"
        style={{ color: "#027A48" }}
      >
        {linkText} →
      </a>
    </div>
  </div>
);

// Componente principal para exibir os vídeos
const SolutionsSectionVideos: React.FC = () => {
  const [videos, setVideos] = useState<VideoCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .from("videos")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Erro ao buscar vídeos:", error);
          return;
        }

        if (!data || data.length === 0) {
          console.warn("Nenhum vídeo encontrado.");
          return;
        }

        // Mapear os serviços para os títulos correspondentes
        const serviceTitles: Record<string, string> = {
          "solo-grampeado": "Solo Grampeado",
          "estaca-tipo-raiz": "Estaca Raiz",
          "helice-continua-monitorada": "Estaca Hélice",
        };

        // Tipar explicitamente os dados recebidos
        const typedData = data as VideoData[];

        // Filtrar o vídeo mais recente de cada serviço
        const latestVideos = Object.values(
          typedData.reduce<Record<string, VideoData>>((acc, video) => {
            if (video.created_at && (acc[video.service] ?? (acc[video.service] && new Date(video.created_at) > new Date(acc[video.service]?.created_at ?? 0)))) {
              acc[video.service] = video;
            }
            return acc;
          }, {})
        );

        // Formatar os vídeos
        const formattedVideos = latestVideos
          .filter((video) => serviceTitles[video.service])
          .map((video) => ({
            videoUrl: `https://www.youtube.com/embed/${video.idUrl}`,
            title: serviceTitles[video.service] ?? "Título Desconhecido",
            description: video.description ?? "Confira este vídeo no nosso canal.",
            linkText: "Ver vídeo",
            linkUrl: `https://www.youtube.com/watch?v=${video.idUrl}`,
          }));

        setVideos(formattedVideos);
      } catch (err) {
        console.error("Erro ao buscar vídeos:", err);
      } finally {
        setLoading(false);
      }
    };

    void fetchVideos();
  }, []);

  if (loading) {
    return <p className="text-center">Carregando vídeos...</p>;
  }

  if (videos.length === 0) {
    return <p className="text-center">Nenhum vídeo encontrado.</p>;
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
          Explore nossos vídeos e conheça nosso trabalho
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="https://www.youtube.com/@proeng.geotecnia">
            <button
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
              style={{ backgroundColor: "#027A48" }}
            >
              Ver mais
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SolutionsSectionVideos;
