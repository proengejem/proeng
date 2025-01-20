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
  const { toast } = useToast()

  // Função para buscar obras
  const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    const result = await getData('videos', searchTerm) // Altere conforme sua API

    if (result.error || !result.data || result.data.length === 0) {
      toast({
        title: 'Nenhum vídeo encontrada',
        description: `Não foi possível encontrar vídeos para "${searchTerm}".`,
      })
      setSearchResults([])
      return
    }

    setSearchResults(result.data)
    toast({
      title: 'Vídeos encontrados',
      description: `Foram encontrados ${result.data ? result.data.length : 0} vídeos.`,
    })
  } catch (err) {
    console.error('Erro ao buscar vídeos:', err)
    toast({
      title: 'Erro ao buscar vídeos',
      description: 'Ocorreu um erro ao buscar vídeos. Tente novamente.',
    })
  }
}

// Função para remover obra
const handleRemove = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!selectedVideo) {
    toast({
      title: 'Erro ao remover',
      description: 'Selecione um vídeo antes de removê-lo.',
    })
    return
  }

  try {
    // Remover do banco de dados
    const { error } = await deleteData('videos', selectedVideo.name)

    if (error) {
      console.error('Erro ao remover o vídeo:', error.message)
      toast({
        title: 'Erro ao remover vídeo',
        description: error.message,
      })
      return
    }


    toast({
      title: 'Vídeo removido com sucesso',
      description: `O vídeo "${selectedVideo.name}" foi removido com sucesso.`,
    })

    // Atualizar lista de resultados após remoção
    setSearchResults(searchResults.filter((video) => video.name !== selectedVideo.name))
    setSelectedVideo(null)
    setSearchTerm('')
  } catch (err) {
    console.error('Erro inesperado ao remover o vídeo:', err)
    toast({
      title: 'Erro inesperado',
      description: 'Ocorreu um erro ao tentar remover o vídeo.',
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
        </div>
      )}
    </div>
  )
}
