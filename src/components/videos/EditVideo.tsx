'use client'

import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export default function EditVideo() {
  const [searchTerm, setSearchTerm] = useState('')
  const [link, setLink] = useState('')
  const [service, setService] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically fetch the video data based on the search term
    console.log('Procurando por um vídeo:', searchTerm)
    // For this example, we'll just set some dummy data
    setLink('https://example.com/sample-video')
    setService('Sample Service')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated data to your backend
    console.log('Editando video:', { link, service })
  }

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
      <form onSubmit={handleSubmit} className="space-y-4">
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