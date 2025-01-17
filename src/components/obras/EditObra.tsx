'use client';

import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { useToast } from '~/hooks/use-toast';
import { updateData, getData } from 'pages/api/supabse/database';

interface ObraInterface {
  name: string;
  description: string;
  service: string;
  images?: File[];
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

      if (error) {
        console.error('Erro ao buscar obra:', error.message);
        toast({
          title: 'Erro ao buscar obra',
          description: error.message,
        });
        return;
      }

      if (data && data.length > 0) {
        const obra = data[0];
        setName(obra.name);
        setDescription(obra.description);
        setService(obra.service);
        setExistingImages(obra.images || []);
        setSearchResult(`Obra encontrada: ${obra.name}`);
        toast({
          title: 'Obra encontrada',
          description: `A obra "${obra.name}" foi carregada para edição.`,
        });
      } else {
        setSearchResult(null);
        toast({
          title: 'Obra não encontrada',
          description: 'Nenhuma obra corresponde ao termo de busca.',
        });
      }
    } catch (err) {
      console.error(err);
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
      const { error } = await updateData('obras', searchTerm, formData);

      if (error) {
        console.error('Erro ao editar obra:', error.message);
        toast({
          title: 'Erro ao editar obra',
          description: error.message,
        });
        return;
      }

      toast({
        title: 'Obra atualizada com sucesso',
        description: 'As informações da obra foram atualizadas.',
      });

      // Resetar o formulário após a atualização
      setName('');
      setDescription('');
      setService('');
      setImages([]);
      setExistingImages([]);
      setSearchResult(null);
      setSearchTerm('');
    } catch (err) {
      console.error(err);
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao atualizar a obra.',
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
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

  const removeExistingImage = (index: number) => {
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => images.forEach((image) => URL.revokeObjectURL(image.preview));
  }, [images]);

  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-xl font-semibold mb-4 text-[#027A48]">Editar Obra</h3>

      {/* Formulário de busca */}
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

      {/* Formulário de edição */}
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
          <Input
            type="text"
            placeholder="Serviço/Categoria"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          />

          {/* Imagens existentes */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Imagens Existentes</label>
            <div className="grid grid-cols-3 gap-2">
              {existingImages.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`Existing ${index}`} className="w-full h-24 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
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
                    <img src={image.preview} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded" />
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
