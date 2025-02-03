'use client';


import React, { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { useToast } from '~/hooks/use-toast';
import { updateData, getData } from 'pages/api/supabse/database';
import { uploadNewFilesToStorage } from 'pages/api/supabse/storage';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';


const supabase = createClient(
  'https://xaljbeozaieyoecnxvum.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhbGpiZW96YWlleW9lY254dnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDUwNDIsImV4cCI6MjA1MjUyMTA0Mn0.4GCZtQ2tGMkHSlvZgzCP2s7QlT7hlOOdzz5jLvCYyT8'
);


interface ObraInterface {
  name: string;
  description: string;
  service: string;
  images?: File[];
}

interface SupabaseError {
    message: string;
    details?: string;
    hint?: string;
    code?:string;
  }
  
interface SupabaseResponse<T> {
      data: T | null;
      error: SupabaseError | null;
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
        const { data, error } = (await getData(
            'obras',
            searchTerm
          )) as SupabaseResponse<ObraInterface[]>;
          
        if (data && data.length > 0) {
          const obra: ObraInterface | undefined = data[0];
          if (!obra) {
            toast({
              title: 'Erro ao buscar obra',
              description: 'Obra não encontrada.',
            });
            return;
          }
        setName(obra.name);
        setDescription(obra.description);
        setService(obra.service);
      }
      
      if (error) {
            toast({
                title: "Error ao buscar obra",
                description: error?.message || "Ocorreu um erro ao buscar obra.",
            });
            return;
        }
      if (data && data.length > 0) {
        const obra = data[0];
        setName(obra?.name ?? '');
        setDescription(obra?.description ?? '');
        setService(obra?.service ?? '');
  
        const folderName = obra?.name;
        const { data: files, error: listError } = await supabase.storage
          .from('Obras')
          .list(folderName, { limit: 100 });
  
        if (listError) {
          console.error('Erro ao listar imagens:', listError.message);
          toast({
            title: 'Erro ao carregar imagens',
            description: listError.message,
          });
          return;
        }
  
        if (files && files.length > 0) {
          const imageUrls = files.map(
            (file) =>
              supabase.storage
                .from('Obras')
                .getPublicUrl(`${folderName}/${file.name}`).data.publicUrl
          );
          setExistingImages(imageUrls);
        }
  
        const imageUrls = files.map(
          (file) =>
            supabase.storage
              .from('Obras')
              .getPublicUrl(`${folderName}/${file.name}`).data.publicUrl
        );
  
        setExistingImages(imageUrls);
        setSearchResult(`Obra encontrada: ${obra?.name}`);
        toast({
          title: 'Obra encontrada',
          description: `A obra "${obra?.name}" foi carregada para edição.`,
        });
      } else {
        setSearchResult(null);
        toast({
          title: 'Obra não encontrada',
          description: 'Nenhuma obra corresponde ao termo de busca.',
        });
      }
    } catch (err) {
      console.error('Erro inesperado ao buscar obra:', err);
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao buscar a obra.',
      });
    }
  };
  
  
 
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();


    const formData: ObraInterface = {
      name,
      description,
      service,
    };


    try {
      const { error } = (await updateData('obras', searchTerm, formData)) as SupabaseResponse<null>;


      if (error) {
        toast({
          title: 'Erro ao editar obra',
          description: error.message,
        });
        return;
      }


      // Upload images to storage
      await uploadNewFilesToStorage(
        'Obras',
        images.map((img) => img.file),
        formData.name
      );


      toast({
        title: 'Obra atualizada com sucesso',
        description: 'As informações da obra foram atualizadas.',
      });


      // Reset form
      setName('');
      setDescription('');
      setService('');
      setImages([]);
      setExistingImages([]);
      setSearchResult(null);
      setSearchTerm('');
    } catch (err) {
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao atualizar a obra.',
      });
    }
  };


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setImages((prevImages) => [
      ...prevImages,
      ...files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);
  };


  const removeNewImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };


  const removeExistingImage = async (index: number) => {
    console.log("Botão de remover clicado!", index);

    const imageToRemove = existingImages[index];

    if (!imageToRemove) {
      toast({
        title: 'Erro inesperado',
        description: 'A imagem a ser removida não foi encontrada.',
      });
      return;
    }

    // Extraindo corretamente o nome da imagem e da pasta
    const urlParts = imageToRemove.split('/');
    let fileName = urlParts[urlParts.length - 1]; // Nome real do arquivo
    let folderName = urlParts[urlParts.length - 2]; // Nome da obra (pasta)

    // Decodifica espaços e caracteres especiais na pasta e no arquivo
    folderName = decodeURIComponent(folderName);
    fileName = decodeURIComponent(fileName);

    const filePath = `${folderName}/${fileName}`;

    console.log("Tentando remover a imagem do storage:", filePath);
    console.log("Imagem para remover:", imageToRemove);
    console.log("Caminho gerado para remoção:", filePath);

    try {
      // Removendo a imagem do Supabase Storage
      const { error: storageError } = await supabase.storage.from('Obras').remove([filePath]);

      if (storageError) {
        console.error('Erro ao remover imagem do storage:', storageError);
        toast({
          title: 'Erro ao remover imagem',
          description: storageError.message,
        });
        return;
      }

      console.log("Imagem removida com sucesso do storage.");

      // Atualizar UI removendo a imagem da lista
      setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));

      toast({
        title: 'Imagem removida',
        description: 'A imagem foi removida com sucesso do storage.',
      });
    } catch (err) {
      console.error('Erro inesperado ao remover imagem:', err);
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao remover a imagem do storage.',
      });
    }
};


    
  
  





  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-xl font-semibold mb-4 text-[#027A48]">Editar Obra</h3>


      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Procurar por uma obra"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <Button type="submit" className="bg-[#027A48] hover:bg-green-500 text-white">
            Pesquisar
          </Button>
        </div>
      </form>


      {searchResult && (
        <form onSubmit={handleUpdate} className="space-y-4">
          <Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {/* Dropdown para selecionar o serviço */}
          <label className="block text-sm font-medium text-gray-700">Serviços/Categoria</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#027A48] focus:border-[#027A48] sm:text-sm"
          >
            <option value="" disabled>
              Selecione um serviço
            </option>
            <option value="solo-grampeado">Solo Grampeado</option>
            <option value="concreto-projetado">Concreto Projetado</option>
            <option value="helice-continua-monitorada">Hélice Contínua Monitorada</option>
            <option value="estaca-tipo-raiz">Estaca Tipo Raiz</option>
            <option value="micro-estacas-injetadas">Micro Estacas Injetadas</option>
            <option value="injecoes-de-consolidacao">Injeções de Consolidação</option>
            <option value="d-h-p">Dreno Sub-Horizontal Profundo</option>
            <option value="tirantes">Tirantes</option>
          </select>


          {/* Imagens existentes */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Imagens Existentes</label>
            <div className="grid grid-cols-3 gap-2">

              {existingImages.map((imageUrl, index) => (
                <div key={index} className="relative">
<Image src={imageUrl} alt={`Existing ${index}`} width={200} height={100} className="object-cover rounded" />
<button type="button"
                    onClick={() => {
                      removeExistingImage(index);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs pointer-events-auto"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>


          {/* Upload de novas imagens */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Adicionar Nova Imagem</label>
            <Input type="file" accept="image/*" multiple onChange={handleImageUpload} />
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <Image  src={image.preview} alt={`Preview ${index}`} width={200} height={100} className="w-full h-24 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>


          <Button type="submit" className="bg-[#027A48] hover:bg-green-500 text-white">
            Editar Obra
          </Button>
        </form>
      )}
    </div>
  );
}