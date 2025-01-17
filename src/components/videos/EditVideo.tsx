'use client'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useState, useEffect } from 'react';
import { Textarea } from '~/components/ui/textarea';
import { useToast } from '~/hooks/use-toast';
import { updateData, getData } from 'pages/api/supabse/database';

interface VideoInterface {
  url: string;
  service: string;
  name: string;
}

export default function EditVideo() {
    const [searchTerm, setSearchTerm] = useState('');
    const [link, setLink] = useState('');
    const [service, setService] = useState('');
    const [name, setName] = useState('');
    const [searchResult, setSearchResult] = useState<string | null>(null);
    const { toast } = useToast();

    const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault();
    
      try {
        const { data, error } = await getData('videos', searchTerm);
    
        if (error) {
          console.error('Erro ao buscar vídeo:', error.message);
          toast({
            title: 'Erro ao buscar vídeo',
            description: error.message,
          });
          return;
        }
    
        if (data && data.length > 0) {
          const video = data[0];
          setName(video.name || ''); // Certifique-se de usar valores padrão
          setLink(video.url || ''); // Corrigido para preencher o link
          setService(video.service || '');
          setSearchResult(`Vídeo encontrado: ${video.name}`);
          toast({
            title: 'Vídeo encontrado',
            description: `O vídeo "${video.name}" foi carregado para edição.`,
          });
        } else {
          setSearchResult(null);
          toast({
            title: 'Vídeo não encontrado',
            description: 'Nenhum vídeo corresponde ao termo de busca.',
          });
        }
      } catch (err) {
        console.error(err);
        toast({
          title: 'Erro inesperado',
          description: 'Ocorreu um erro ao buscar vídeo.',
        });
      }
    };
    

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: VideoInterface = {
      name,
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
        title: 'Vídeo atualizada com sucesso',
        description: 'As informações do vídeo foram atualizadas.',
      });

      // Resetar o formulário após a atualização
      setName('');
      setLink('');
      setService('');
      setSearchResult(null);
      setSearchTerm('');
    } catch (err) {
      console.error(err);
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao atualizar vídeo.',
      });
    }
  };
  //   console.log('Procurando por um vídeo:', searchTerm)
  //   // For this example, we'll just set some dummy data
  //   setLink('https://example.com/sample-video')
  //   setService('Sample Service')
  // }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   // Here you would typically send the updated data to your backend
  //   console.log('Editando video:', { link, service })
  // }

  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-xl font-semibold mb-4 [#027A48]">Editar Vídeo</h3>
      <form onSubmit={handleSearch} className="mb-4">
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
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Serviço/Categoria"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />
        <Button type="submit" className="bg-[#027A48] hover:bg-green-500 text-white">
          Editar Vídeo
        </Button>
      </form>
    </div>
  )
}