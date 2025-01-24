

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xaljbeozaieyoecnxvum.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhbGpiZW96YWlleW9lY254dnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDUwNDIsImV4cCI6MjA1MjUyMTA0Mn0.4GCZtQ2tGMkHSlvZgzCP2s7QlT7hlOOdzz5jLvCYyT8'
);

export interface Obra {
  id: number;
  name: string;
  description: string;
  service: string;
  images: string[];
}

export async function obrasCards(): Promise<Obra[]> {
  try {
    // Buscar dados das obras
    const { data, error } = await supabase.from('obras').select('*');

    if (error) {
      console.error('Erro ao buscar obras:', error.message);
      throw new Error('Erro ao buscar obras');
    }

    if (data) {
      // Para cada obra, buscar as imagens na storage do Supabase
      const obrasWithImages = await Promise.all(
        data.map(async (obra) => {
          const folderName = obra.name;
          const { data: files, error: listError } = await supabase.storage
            .from('Obras')
            .list(folderName, { limit: 100 });

          if (listError) {
            console.error(`Erro ao buscar imagens para a obra ${obra.name}:`, listError.message);
            return { ...obra, images: [] };
          }

          // Gerar URLs públicas para as imagens
          const imageUrls = files?.map((file) =>
            supabase.storage.from('Obras').getPublicUrl(`${folderName}/${file.name}`).data.publicUrl
          );

          return { ...obra, images: imageUrls || [] };
        })
      );

      return obrasWithImages;
    }

    return [];
  } catch (err) {
    console.error('Erro inesperado:', err);
    throw new Error('Erro ao carregar os dados das obras.');
  }
}




