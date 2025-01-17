'use client'

import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { deleteData, getData } from 'pages/api/supabse/database'
import { useToast } from '~/hooks/use-toast'

export default function RemoveVideo() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null)
  const [error, setError] = useState<boolean | null>(false);
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await getData('videos', searchTerm)

    if (result.error) {
      console.error('Erro ao buscar vídeos:', result.error.message)
      toast({
        title: 'Erro na busca',
        description: 'Não foi possível encontrar vídeos com o termo fornecido.',
      })
      return
    }

    if (result.data.length === 0) {
      toast({
        title: 'Nenhum vídeo encontrado',
        description: 'Tente outro termo de busca.',
      })
      setSearchResults([])
      return
    }

    setSearchResults(result.data) // Assume que result.data é um array de objetos com informações dos vídeos
  }

  const handleRemove = async () => {
    if (!selectedVideo) {
      toast({
        title: 'Erro',
        description: 'Selecione um vídeo para remover.',
      })
      return
    }
  
    try {
      const { error } = await deleteData('videos', selectedVideo.id) // Certifique-se de que o ID é o campo correto
  
      if (error) {
        console.error('Erro ao remover o vídeo:', error.message)
        toast({
          title: 'Erro ao remover',
          description: error.message,
        })
        return
      }
  
      toast({
        title: 'Vídeo removido com sucesso',
        description: `O vídeo "${selectedVideo.title}" foi removido.`,
      })
  
      // Atualizar lista de resultados após a remoção
      setSearchResults(searchResults.filter((video) => video.id !== selectedVideo.id))
      setSelectedVideo(null)
      setSearchTerm('')

    } catch (err) {
      console.error('Erro inesperado ao remover o vídeo:', err)
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao tentar remover o vídeo. Tente novamente.',
      })
    }
  }
  
  
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

      {/* Lista de resultados */}
      {searchResults.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-medium mb-2">Resultados da pesquisa:</h4>
          <ul className="space-y-2">
            {searchResults.map((video) => (
              <li
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className={`p-2 border rounded cursor-pointer ${
                  selectedVideo?.id === video.id ? 'bg-green-200' : 'hover:bg-gray-100'
                }`}
              >
                {/* Informações detalhadas do vídeo */}
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

      {/* Botão de remover */}
      {selectedVideo && (
        <div className="mt-4">
          <Button onClick={handleRemove} className="bg-red-600 hover:bg-red-700 text-white">
            Remover Vídeo Selecionado
          </Button>
          <p className="text-sm mt-2 text-gray-600">
            Vídeo selecionado: <span className="font-bold">{selectedVideo.title}</span>
          </p>
        </div>
      )}
    </div>
  )
}
