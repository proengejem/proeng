import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xaljbeozaieyoecnxvum.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhbGpiZW96YWlleW9lY254dnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDUwNDIsImV4cCI6MjA1MjUyMTA0Mn0.4GCZtQ2tGMkHSlvZgzCP2s7QlT7hlOOdzz5jLvCYyT8"
);

export interface Obra {
  id: number;
  name: string;
  description: string;
  service: string;
  images: string[];
}

interface SupabaseFile {
  name: string;
}

export async function obrasCards(): Promise<Obra[]> {
  try {
    // Buscar dados das obras
    const { data, error } = await supabase.from("obras").select("*");

    if (error || !data) {
      console.error("Erro ao buscar obras:", error?.message);
      return [];
    }

    // Para cada obra, buscar as imagens no storage do Supabase
    const obrasWithImages = await Promise.all(
      data.map(async (obra): Promise<Obra> => {
        const folderName = obra.name || ""; // Garantindo que é uma string válida

        // Buscar imagens no storage
        const { data: files, error: listError } = await supabase.storage
          .from("Obras")
          .list(folderName, { limit: 100 });

        if (listError || !files) {
          console.error(`Erro ao buscar imagens para a obra ${obra.name}:`, listError?.message);
          return { ...obra, images: [] };
        }

        // Criar URLs públicas para as imagens
        const imageUrls: string[] = files.map((file: SupabaseFile) =>
          supabase.storage.from("Obras").getPublicUrl(`${folderName}/${file.name}`).data.publicUrl
        );

        return { ...obra, images: imageUrls };
      })
    );

    return obrasWithImages;
  } catch (err) {
    console.error("Erro inesperado:", err);
    return [];
  }
}
