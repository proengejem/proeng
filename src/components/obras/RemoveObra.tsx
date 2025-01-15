'use client'

import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { deleteData, getData } from 'pages/api/supabse/database'
import { useToast } from '~/hooks/use-toast'
export default function RemoveObra() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [error, setError] = useState<boolean | null>(false);
  const { toast } = useToast()

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Here you would typically send a request to search for the obra
  //   console.log('Procurando por uma obra:', searchTerm);
  //   // Simulating a search result
  //   setSearchResult(`Obra found: ${searchTerm}`);
  // };

   const handleRemove = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await getData('obras', searchTerm);

    if (result.error) {
      console.error('Erro ao buscar uma obra:', result.error.message);
      return;
    }

    else {

      setSearchResult(`Obra encontrada: ${searchTerm}`);
      const { error } = await deleteData('obras', searchTerm);

      if (error) {
        console.error('Erro ao remover uma obra:', error.message);
        toast({
          title: 'Erro ao remover uma obra',
          description: error.message,
        });
        setError(true);
        return;
      }

      else {
        //alert('Obra removida com sucesso!');
        toast({
          title: 'Obra removida com sucesso',
          description: `A obra ${searchTerm} foi removida com sucesso`,
        });
        setError(false);
        setSearchTerm('');
        setSearchResult(null);
      }
    }
  };

  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-xl font-semibold mb-4 text-[#027A48]">Remover Obra</h3>
      <form onSubmit={handleRemove} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Procurando por uma obra"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
          Remover Obra
          </Button>
        </div>
        {error && (
          <p className="text-red-600">A obra ${searchTerm} não foi encontrada</p>
        )}
      </form>
    </div>
  )
}
