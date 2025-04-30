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

/**
 * Fetch all obras from Supabase and include their image URLs
 */
export async function obrasCards(): Promise<Obra[]> {
  try {
    // Fetch data from obras table
    const { data, error } = await supabase.from('obras').select('*');

    if (error) {
      console.error('Error fetching obras:', error.message);
      throw new Error('Error fetching obras: ' + error.message);
    }

    if (!data || data.length === 0) {
      console.log('No obras found in database');
      return [];
    }

    console.log(`Found ${data.length} obras in database`);

    // For each obra, fetch its images from storage
    const obrasWithImages = await Promise.all(
      data.map(async (obra) => {
        // Make sure the folder name is sanitized and valid
        const folderName = obra.name?.trim();
        
        if (!folderName) {
          console.warn(`Obra ID ${obra.id} has no name, skipping images`);
          return { ...obra, images: [] };
        }

        try {
          // List files in the obra's folder
          console.log(`Listing files for obra: ${folderName}`);
          const { data: files, error: listError } = await supabase.storage
            .from('Obras')
            .list(folderName, { sortBy: { column: 'name', order: 'asc' } });

          if (listError) {
            console.warn(`Error listing images for obra ${folderName}:`, listError.message);
            return { ...obra, images: [] };
          }

          if (!files || files.length === 0) {
            console.warn(`No images found for obra ${folderName}`);
            return { ...obra, images: [] };
          }

          console.log(`Found ${files.length} files for obra ${folderName}:`, 
            files.map(f => f.name).join(', '));

          // Generate direct URL for each file (not public URL)
          const imageUrls = files.map((file) => {
            // Get signed URL that will work even with private buckets
            const fileUrl = supabase.storage
              .from('Obras')
              .getPublicUrl(`${folderName}/${file.name}`);
              
            // Log the generated URL for debugging
            console.log(`Generated URL for ${file.name}:`, fileUrl.data.publicUrl);
            
            return fileUrl.data.publicUrl;
          });

          console.log(`Generated ${imageUrls.length} image URLs for obra ${folderName}`);
          
          // Return obra with images
          return { ...obra, images: imageUrls };
        } catch (imageError) {
          console.error(`Error processing images for obra ${folderName}:`, imageError);
          return { ...obra, images: [] };
        }
      })
    );

    return obrasWithImages;
  } catch (err) {
    console.error('Error in obrasCards function:', err);
    throw err;
  }
}