'use client';

import React, { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useToast } from '~/hooks/use-toast';
import { updateData, getData } from 'pages/api/supabse/database';


// Interface for representing a video
interface VideoInterface {
  name: string;
  idUrl: string;
  service: string;
}

// Define the expected structure of `getData`'s return value
import type { PostgrestError } from '@supabase/supabase-js';

interface GetDataResult {
  data: VideoInterface[] | null;
  error: PostgrestError | null;
}

export default function EditVideo() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<VideoInterface[] | null>(null);
  const [name, setName] = useState<string>('');
  const [idUrl, setidUrl] = useState<string>('');
  const [service, setService] = useState<string>('');
  const { toast } = useToast();

  const isVideoInterface = (obj: unknown): obj is VideoInterface => {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof (obj as VideoInterface).name === 'string' &&
      typeof (obj as VideoInterface).idUrl === 'string' &&
      typeof (obj as VideoInterface).service === 'string'
    );
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result: GetDataResult = await getData('videos', searchTerm);

      if (result.error ?? !result.data ?? result.data.length === 0) {
        toast({
          title: 'Nenhum vídeo encontrado',
          description: `Não foi possível encontrar vídeos para "${searchTerm}".`,
        });
        setSearchResult(null);
        return;
      }

      const video = result.data[0]; // Assume only the first video for simplicity

      if (isVideoInterface(video)) {
        setName(video.name);
        setidUrl(video.idUrl);
        setService(video.service);
        setSearchResult(result.data);

        toast({
          title: 'Vídeo encontrado',
          description: `O vídeo "${video.name}" foi carregado para edição.`,
        });
      } else {
        toast({
          title: 'Erro de tipo',
          description: 'Os dados recebidos não correspondem à estrutura esperada.',
        });
      }
    } catch (err) {
      console.error('Erro ao buscar vídeos:', err);
      toast({
        title: 'Erro ao buscar vídeos',
        description: 'Ocorreu um erro ao buscar vídeos. Tente novamente.',
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: VideoInterface = {
      name,
      idUrl: idUrl,
      service,
    };

    try {
      const { error } = await updateData('videos', searchTerm, formData);

      if (error) {
        console.error('Erro ao editar vídeo:', error);
        toast({
          title: 'Erro ao editar vídeo',
          description: error.message,
        });
        return;
      }

      toast({
        title: 'Vídeo atualizado com sucesso',
        description: 'As informações de vídeo foram atualizadas.',
      });

      setName('');
      setidUrl('');
      setService('');
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

  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-xl font-semibold mb-4 text-[#027A48]">Editar Vídeo</h3>

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
          <Input
            type="text"
            placeholder="Link do Vídeo"
            value={idUrl}
            onChange={(e) => setidUrl(e.target.value)}
            required
          />
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
            <option value="helice-continua-monitorada">Hélice Contínua Monitorada</option>
            <option value="estaca-tipo-raiz">Estaca Tipo Raiz</option>
          </select>

          <Button type="submit" className="bg-[#027A48] hover:bg-green-500 text-white">
            Editar Vídeo
          </Button>
        </form>
      )}
    </div>
  );
}
