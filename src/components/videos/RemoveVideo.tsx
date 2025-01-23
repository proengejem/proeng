'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { deleteData, getData } from 'pages/api/supabse/database';
import { useToast } from '~/hooks/use-toast';

// Interface para representar um vídeo
interface VideoInterface {
  id: string; // Presumido que cada vídeo tenha um 'id' único
  name: string;
  url: string;
  service: string;
}

export default function RemoveVideo() {
  const [searchTerm, setSearchTerm] = useState<string>(''); // Tipado como string
  const [searchResults, setSearchResults] = useState<VideoInterface[]>([]); // Tipado como VideoInterface[]
  const [selectedVideo, setSelectedVideo] = useState<VideoInterface | null>(null); // Tipado como VideoInterface ou null
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await getData('videos', searchTerm); 

      if (result.error || !result.data || result.data.length === 0) {
        toast({
          title: 'Nenhum vídeo encontrado',
          description: `Não foi possível encontrar vídeos para "${searchTerm}".`,
        });
        setSearchResults([]); // Limpar resultados da pesquisa
        return;
      }

      setSearchResults(result.data); // Tipado adequadamente
      toast({
        title: 'Vídeos encontrados',
        description: `Foram encontrados ${result.data.length} vídeos.`,
      });
    } catch (err) {
      console.error('Erro ao buscar vídeos:', err);
      toast({
        title: 'Erro ao buscar vídeos',
        description: 'Ocorreu um erro ao buscar vídeos. Tente novamente.',
      });
    }
  };

  const handleRemove = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedVideo) {
      toast({
        title: 'Erro ao remover',
        description: 'Selecione um vídeo antes de removê-lo.',
      });
      return;
    }

    try {
      const { error } = await deleteData('videos', selectedVideo.name); // Remover usando 'id' como chave

      if (error) {
        console.error('Erro ao remover o vídeo:', error.message);
        toast({
          title: 'Erro ao remover vídeo',
          description: error.message,
        });
        return;
      }

      toast({
        title: 'Vídeo removido com sucesso',
        description: `O vídeo "${selectedVideo.name}" foi removido com sucesso.`,
      });

      // Atualiza os resultados de pesquisa, removendo o vídeo
      setSearchResults(searchResults.filter((video) => video.name !== selectedVideo.name));
      setSelectedVideo(null); // Limpar seleção de vídeo
      setSearchTerm(''); // Limpar termo de pesquisa
    } catch (err) {
      console.error('Erro inesperado ao remover o vídeo:', err);
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao tentar remover o vídeo.',
      });
    }
  };

  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-xl font-semibold mb-4 text-[#027A48]">Remover Vídeo</h3>
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Procurando por um vídeo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <Button type="submit" className="bg-[#027A48] hover:bg-green-500 text-white">
            Pesquisar
          </Button>
        </div>
      </form>

      {searchResults.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-medium mb-2">Resultados da pesquisa:</h4>
          <ul className="space-y-2">
            {searchResults.map((video) => (
              <li
                key={video.id}
                onClick={() => setSelectedVideo(video)} // Selecionar vídeo ao clicar
                className={`p-2 border rounded cursor-pointer ${
                  selectedVideo?.id === video.id ? 'bg-green-200' : 'hover:bg-gray-100'
                }`}
              >
                <div>
                  <p className="font-bold">Título: {video.name}</p>
                  <p>Link: {video.url || 'Sem link'}</p>
                  <p>Serviço: {video.service || 'Sem serviço'}</p>
                  <p>ID: {video.id}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedVideo && (
        <div className="mt-4">
          <Button onClick={handleRemove} className="bg-red-600 hover:bg-red-700 text-white">
            Remover Vídeo Selecionado
          </Button>
        </div>
      )}
    </div>
  );
}
