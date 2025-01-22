'use client'

import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { deleteData, getData } from 'pages/api/supabse/database'
import { useToast } from '~/hooks/use-toast'
import { deleteFolderFromStorage } from 'pages/api/supabse/storage'

export default function RemoveObra() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedObra, setSelectedObra] = useState<any | null>(null)
  const { toast } = useToast()

  // Função para buscar obras
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await getData('obras', searchTerm) // Altere conforme sua API

      if (result.error || !result.data || result.data.length === 0) {
        toast({
          title: 'Nenhuma obra encontrada',
          description: `Não foi possível encontrar obras para "${searchTerm}".`,
        })
        setSearchResults([])
        return
      }

      setSearchResults(result.data)
      toast({
        title: 'Obras encontradas',
        description: `Foram encontradas ${result.data.length} obras.`,
      })
    } catch (err) {
      console.error('Erro ao buscar obras:', err)
      toast({
        title: 'Erro ao buscar obras',
        description: 'Ocorreu um erro ao buscar obras. Tente novamente.',
      })
    }
  }

  // Função para remover obra
  const handleRemove = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!selectedObra) {
      toast({
        title: 'Erro ao remover',
        description: 'Selecione uma obra antes de removê-la.',
      })
      return
    }
  
    try {
      // Remover do banco de dados
      const { error } = await deleteData('obras', selectedObra.name)
  
      if (error) {
        console.error('Erro ao remover a obra:', error.message)
        toast({
          title: 'Erro ao remover obra',
          description: error.message,
        })
        return
      }
  
      // Remover o folder correspondente do storage
      await deleteFolderFromStorage('Obras', selectedObra.name)
  
      toast({
        title: 'Obra removida com sucesso',
        description: `A obra "${selectedObra.title}" foi removida com sucesso.`,
      })
  
      // Atualizar lista de resultados após remoção
      setSearchResults(searchResults.filter((obra) => obra.name !== selectedObra.name))
      setSelectedObra(null)
      setSearchTerm('')
    } catch (err) {
      console.error('Erro inesperado ao remover a obra:', err)
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro ao tentar remover a obra.',
      })
    }
  }

  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-xl font-semibold mb-4 text-[#027A48]">Remover Obra</h3>

      {/* Formulário de busca */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Procurando por uma obra"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <Button type="submit" className="bg-[#027A48] hover:bg-green-500 text-white">
            Pesquisar
          </Button>
        </div>
      </form>

      {/* Exibição dos resultados */}
      {searchResults.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Resultados da Busca:</h4>
          <ul className="space-y-2">
            {searchResults.map((obra) => (
              <li
                key={obra.id}
                onClick={() => setSelectedObra(obra)}
                className={`p-2 border rounded-md cursor-pointer ${
                  selectedObra?.id === obra.id ? 'bg-green-100 border-green-400' : 'bg-white'
                }`}
              >
                <p className="font-medium">{obra.name}</p>
                <p className="text-sm text-gray-600">{obra.description}</p>
                <p>Serviço: {obra.service || 'Sem serviço'}</p>
                <p>Criado em: {obra.created_at || '?!'}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botão de remoção */}
      {selectedObra && (
        <div className="mt-4">
          <Button
            onClick={handleRemove}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Remover Obra
          </Button>
        </div>
      )}
    </div>
  )
}
