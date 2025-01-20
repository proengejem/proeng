'use client';

import React, { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { useToast } from '~/hooks/use-toast';
import { updateData, getData } from 'pages/api/supabse/database';
import { uploadNewFilesToStorage } from 'pages/api/supabse/storage';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://xaljbeozaieyoecnxvum.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhbGpiZW96YWlleW9lY254dnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDUwNDIsImV4cCI6MjA1MjUyMTA0Mn0.4GCZtQ2tGMkHSlvZgzCP2s7QlT7hlOOdzz5jLvCYyT8');

interface VideoInterface {
  name: string
  url: string;
  service: string;
}

export default function EditObra() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<any[] | null>(null);
  const [name, setName] = useState('')
  const [link, setLink] = useState('');
  const [service, setService] = useState('');
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await getData('videos', searchTerm); // Busca os dados do vídeo
  
      if (result.error || !result.data || result.data.length === 0) {
        toast({
          title: 'Nenhum vídeo encontrado',
          description: `Não foi possível encontrar vídeos para "${searchTerm}".`,
        });
        setSearchResult(null);
        return;
      }
  
      const video = result.data[0]; // Pega o primeiro vídeo encontrado (ajuste conforme sua lógica)
      setName(video.name || ''); // Preenche o campo "Nome"
      setLink(video.url || ''); // Preenche o campo "Link do Vídeo"
      setService(video.service || ''); // Preenche o campo "Serviço/Categoria"
  
      setSearchResult(result.data); // Atualiza o estado com os resultados da busca
      toast({
        title: 'Vídeo encontrado',
        description: `O vídeo "${video.name}" foi carregado para edição.`,
      });
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
      name: name,
      url: link,
      service: service,
    };

    try {
      const { error } = await updateData('videos', searchTerm, formData);

      if (error) {
        console.error('Erro ao editar vídeo:', error.message);
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

      // Reset form
      setName('');
      setLink('');
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
          type="url"
          placeholder="Link do Vídeo"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
          {/* <Input
            type="text"
            placeholder="Serviço/Categoria"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          /> */}
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