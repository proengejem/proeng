'use client';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useState } from 'react';
import { useToast } from '~/hooks/use-toast';
import { insertData } from 'pages/api/supabse/database';

interface VideoInterface {
  name: string
  url: string;
  service: string;
}

export default function CreateVideo() {
  const { toast } = useToast();
  const [name, setName] = useState('')
  const [link, setLink] = useState('');
  const [service, setService] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: VideoInterface = {
      name: name,
      url: link,
      service: service,
    };

    try {
      const { error } = await insertData('videos', formData);

      if (error) {
        console.error('Erro ao criar um vídeo:', error.message);
        toast({
          title: 'Erro ao criar um vídeo',
          description: error.message,
        });
        return;
      }

      toast({
        title: 'Vídeo criado com sucesso',
        description: 'Seu vídeo foi criado com sucesso!',
      });

      // Resetar o formulário
      setName('')
      setLink('');
      setService('');
    } catch (error) {
      console.error('Erro ao criar um vídeo:', error);
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao criar o vídeo. Por favor, tente novamente.',
      });
    }
  };

  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-xl font-semibold mb-4 text-[#027A48]">Criar um Novo Vídeo</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
      <Input
          type="text"
          placeholder="Nome"
          name = 'name'
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
        <Input
          type="text"
          name="service"
          placeholder="Serviço/Categoria"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />
        <Button type="submit" className="bg-[#027A48] hover:bg-green-500 text-white">
          Criar Vídeo
        </Button>
      </form>
    </div>
  );
}
