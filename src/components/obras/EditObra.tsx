import React, { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { useToast } from '~/hooks/use-toast';
import { updateData, getData } from 'pages/api/supabse/database';
import { uploadNewFilesToStorage } from 'pages/api/supabse/storage';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xaljbeozaieyoecnxvum.supabase.co',
  'YOUR_SUPABASE_PUBLIC_ANON_KEY'
);

interface ObraInterface {
  name: string;
  description: string;
  service: string;
  images?: File[];
}

interface GetDataResult<T> {
  data: T[];
  error: { message: string } | null;
}

export default function EditObra() {
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [service, setService] = useState('');
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await getData('obras', searchTerm);

      if (error ?? !data ?? !data.length) {
        toast({
          title: 'Erro ao buscar obra',
          description: error?.message ?? 'Nenhuma obra encontrada.',
        });
        return;
      }

      const obra = data[0];
      setName(obra.name ?? '');
      setDescription(obra.description ?? '');
      setService(obra.service ?? '');

      // Fetch images
      const folderName = obra.name;
      const { data: files, error: listError } = await supabase.storage
        .from('Obras')
        .list(folderName);

      if (listError) {
        console.error('Erro ao listar imagens:', listError.message);
        toast({ title: 'Erro ao carregar imagens', description: listError.message });
        return;
      }

      const imageUrls = files?.map(
        (file) => supabase.storage.from('Obras').getPublicUrl(`${folderName}/${file.name}`).data.publicUrl
      ) ?? [];

      setExistingImages(imageUrls);
      setSearchResult(`Obra encontrada: ${obra.name}`);
      toast({
        title: 'Obra encontrada',
        description: `A obra "${obra.name}" foi carregada para edição.`,
      });
    } catch (err) {
      console.error(err);
      toast({ title: 'Erro inesperado', description: 'Ocorreu um erro ao buscar a obra.' });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: ObraInterface = { name, description, service };

    try {
      const { error } = await updateData('obras', searchTerm, formData);

      if (error) {
        toast({ title: 'Erro ao editar obra', description: error.message });
        return;
      }

      const imagePaths = await uploadNewFilesToStorage(
        'Obras',
        images.map((img) => img.file),
        formData.name
      );

      toast({ title: 'Obra atualizada', description: 'As informações foram salvas com sucesso.' });
      setSearchTerm('');
      setName('');
      setDescription('');
      setService('');
      setImages([]);
      setExistingImages([]);
    } catch (err) {
      console.error(err);
      toast({ title: 'Erro inesperado', description: 'Erro ao atualizar obra.' });
    }
  };

  return (
    <div className="border p-4 rounded-md">
      {/* Rest of the JSX */}
    </div>
  );
}
