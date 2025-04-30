"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Obra } from "~/components/ObrasCards";

// Component to display a single obra card with error handling
function ObraCard({ obra }: { obra: Obra }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  // Check if obra has valid images
  const hasValidImages = obra.images && obra.images.length > 0;
  
  useEffect(() => {
    if (hasValidImages) {
      // For debugging, log the first image URL
      console.log(`Image URL for obra ${obra.name}:`, obra.images[0]);
      setImageUrl(obra.images[0] ?? null);
    }
  }, [obra, hasValidImages]);

  // Function to handle image loading
  const handleImageLoad = () => {
    console.log(`Image loaded successfully for ${obra.name}`);
    setImageLoading(false);
  };

  // Function to handle image error
  const handleImageError = () => {
    console.error(`Failed to load image for ${obra.name}`);
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <Link
      href={`/portifolio/${obra.service}/${obra.id}`}
      className="relative group overflow-hidden rounded-lg shadow-xl border p-4 transform transition-transform duration-300 hover:scale-105"
    >
      <div className="relative w-full h-60 mb-2 bg-gray-100">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-t-2 border-green-500 rounded-full animate-spin"></div>
          </div>
        )}
        
        {hasValidImages && !imageError ? (
          <img
            src={imageUrl ?? "https://xaljbeozaieyoecnxvum.supabase.co/storage/v1/object/public/Obras/Almo-Sto-Andre/0ab36d02-cd33-4ec8-a141-34adb960fa40-Almo3-jpg"}
            alt={obra.name}
            className="w-full h-full object-cover rounded"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
            <p className="text-gray-500 text-sm text-center px-2">
              {imageError ? 'Erro ao carregar a imagem' : 'Imagem não disponível'}
            </p>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold mt-2">{obra.name}</h3>
      <span className="text-[#027A48] font-semibold hover:underline mt-1 block">
        Ver obra →
      </span>
      
      {/* Image URL debug info - only visible in development
      {process.env.NODE_ENV === 'development' && imageUrl && (
        <div className="mt-2 p-1 bg-gray-100 rounded text-xs break-all opacity-50 hover:opacity-100">
          <div className="font-bold">Debug URL:</div>
          <div>{imageUrl.substring(0, 50)}...</div>
        </div>
      )} */}
    </Link>
  );
}

// Debug component to show image URLs if needed
export function DebugImageInfo({ obra }: { obra: Obra }) {
  if (!obra.images || obra.images.length === 0) {
    return <div className="text-red-500 p-2 bg-red-50 mb-4 rounded">No images available for this obra</div>;
  }
  
  return (
    <div className="text-xs bg-gray-50 p-2 mb-4 overflow-auto max-h-40 rounded">
      <p className="font-bold">Images found: {obra.images.length}</p>
      <ul className="list-disc pl-4">
        {obra.images.map((image, idx) => (
          <li key={idx} className="truncate">
            <span className="font-medium">{idx}:</span> {image}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Main component to render a grid of obra cards
export default function ObraCardList({ obras }: { obras: Obra[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {obras.map((obra) => (
        <ObraCard key={obra.id} obra={obra} />
      ))}
    </div>
  );
}