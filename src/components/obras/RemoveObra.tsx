'use client'

import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
export default function RemoveObra() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send a request to search for the obra
    console.log('Procurando por uma obra:', searchTerm);
    // Simulating a search result
    setSearchResult(`Obra found: ${searchTerm}`);
  };

  const handleRemove = () => {
    if (searchResult) {
      // Here you would typically send a request to remove the obra
      console.log('Removendo obra:', searchTerm);
      setSearchTerm('');
      setSearchResult(null);
    }
  };

  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-xl font-semibold mb-4 text-[#027A48]">Remover Obra</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Procurando por uma obra"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <Button type="submit" className="bg-[#027A48] hover:bg-green-700 text-white">
            Pesquisar
          </Button>
        </div>
        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
          Remover Obra
        </Button>
      </form>
      {searchResult && (
        <p className="mt-2 text-sm text-gray-600">{searchResult}</p>
      )}
    </div>
  )
}
