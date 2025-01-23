'use client';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useState } from 'react';
import { useToast } from '~/hooks/use-toast';
import { insertData } from 'pages/api/supabse/database';

interface VideoInterface {
  name: string
  idUrl: string;
  service: string;
}

export default function CreateVideo() {
  const { toast } = useToast();
  const [name, setName] = useState('')
  const [idUrl, setidUrl] = useState('');
  const [service, setService] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: VideoInterface = {
      name: name,
      idUrl: idUrl,
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
      setidUrl('');
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
          type="text"
          placeholder="Link do Vídeo"
          value={idUrl}
          onChange={(e) => setidUrl(e.target.value)}
          required
        />
        {/* <Input
          type="text"
          name="service"
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
          Criar Vídeo
        </Button>
      </form>
    </div>
  );
}
