import { createClient } from '@supabase/supabase-js';

// Create a more resilient Supabase client with retry logic
const supabase = createClient(
  'https://xaljbeozaieyoecnxvum.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhbGpiZW96YWlleW9lY254dnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDUwNDIsImV4cCI6MjA1MjUyMTA0Mn0.4GCZtQ2tGMkHSlvZgzCP2s7QlT7hlOOdzz5jLvCYyT8',
  {
    auth: {
      persistSession: false, // Don't persist session to avoid stale tokens
      autoRefreshToken: true, // Auto refresh token
    },
    global: {
      fetch: (...args) => fetch(...args), // Use the native fetch with default settings
    },
  }
);

// Define TypeScript interface for obras
export interface Obra {
  id: number;
  name: string;
  description: string;
  service: string;
  images: string[];
}

// Function to fetch obras data with retries
// Implementação da função fetchWithRetry
const fetchWithRetry = async (fetchFn : any, maxRetries = 3, delay = 1000) => {
  let lastError = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Executa a função de fetch
      const result = await fetchFn();
      
      // Se chegou aqui, significa que a operação foi bem-sucedida
      return { data: result.data, error: null };
    } catch (error) {
      console.warn(`Tentativa ${attempt + 1} falhou:`, (error as Error).message);
      lastError = error;
      
      // Aguarda antes de tentar novamente (exceto na última tentativa)
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  // Se chegou aqui, todas as tentativas falharam
  return { data: null, error: lastError };
};

export async function obrasCards(): Promise<Obra[]> {
  try {
    // Default obras to display if all else fails
    const fallbackObras: Obra[] = [
      {
        id: 1,
        name: "Obra de Exemplo",
        description: "Esta é uma obra de exemplo para quando a conexão ao servidor falha.",
        service: "solo-grampeado",
        images: []
      },
      {
        id: 2,
        name: "Projeto de Contenção",
        description: "Projeto de exemplo para quando a conexão falha.",
        service: "estaca-tipo-raiz",
        images: []
      },
      {
        id: 3,
        name: "Projeto de Fundação",
        description: "Fundação exemplo para quando o servidor não responde.",
        service: "helice-continua-monitorada",
        images: []
      }
    ];

    // Try to fetch data with retries
    const { data, error } = await fetchWithRetry(() => 
      (async () => await supabase.from('obras').select('*'))(), 2);

    if (error) {
      console.error('Erro ao buscar obras:', (error as Error).message);
      // Return fallback data
      return fallbackObras;
    }

    if (!data || data.length === 0) {
      console.warn('Nenhuma obra encontrada na base de dados');
      return fallbackObras;
    }

    try {
      // For each obra, try to get images but handle failures gracefully
      const obrasWithImages = await Promise.all(
        data.map(async (obra : Obra) => {
          try {
            const folderName = obra.name;
            // Try to list files but don't throw if it fails
            const { data: files, error: listError } = await supabase.storage
              .from('Obras')
              .list(folderName, { limit: 100 })
              .catch(() => ({ data: null, error: { message: 'Failed to list files' } }));

            if (listError || !files) {
              console.warn(`Erro ao buscar imagens para ${obra.name}:`, listError?.message || 'Unknown error');
              return { ...obra, images: [] };
            }

            // Try to get public URLs
            const imageUrls = files.map((file) => {
              try {
                return supabase.storage
                  .from('Obras')
                  .getPublicUrl(`${folderName}/${file.name}`).data.publicUrl;
              } catch (e) {
                console.warn(`Failed to get URL for ${file.name}:`, e);
                return '';
              }
            }).filter(url => url); // Remove empty URLs

            return { ...obra, images: imageUrls };
          } catch (err) {
            console.warn(`Erro ao processar imagens para ${obra.name}:`, err);
            return { ...obra, images: [] };
          }
        })
      );

      return obrasWithImages;
    } catch (err) {
      console.error('Erro ao processar imagens das obras:', err);
      // Return obras without images
      return data.map((obra: Obra): Obra => ({ ...obra, images: [] }));
    }
  } catch (err) {
    console.error('Erro inesperado:', err);
    return []; // Empty array for absolute failure
  }
}