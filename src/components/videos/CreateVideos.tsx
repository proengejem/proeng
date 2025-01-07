'use client'

import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export default function CreateVideo() {
  const [link, setLink] = useState('')
  const [service, setService] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log('Creando um vídeo:', { link, service })
    // Reset form
    setLink('')
    setService('')
  }

  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-xl font-semibold mb-4 text-[#027A48]">Criar um Novo Vídeo</h3>
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
          Criar Vídeo
        </Button>
      </form>
    </div>
  )
}