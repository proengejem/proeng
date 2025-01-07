'use client'

import { useState, useEffect } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'

export default function EditObra() {
  const [searchTerm, setSearchTerm] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [service, setService] = useState('')
  const [images, setImages] = useState<{ file: File; preview: string }[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically fetch the obra data based on the search term
    console.log('Procurando por uma obra:', searchTerm)
    // For this example, we'll just set some dummy data
    setName('Sample Obra')
    setDescription('This is a sample obra description')
    setService('Sample Service')
    setExistingImages(['https://example.com/image1.jpg', 'https://example.com/image2.jpg'])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated data to your backend
    console.log('Editando obra:', { 
      name, 
      description, 
      service, 
      newImages: images.map(img => img.file),
      existingImages 
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages(prevImages => [
      ...prevImages,
      ...files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }))
    ])
  }

  const removeNewImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  const removeExistingImage = (index: number) => {
    setExistingImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  useEffect(() => {
    return () => images.forEach(image => URL.revokeObjectURL(image.preview))
  }, [images])

  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-xl font-semibold mb-4 text-[#027A48]">Editar Obra</h3>
      <form onSubmit={handleSearch} className="mb-4">
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Serviço/Categoria"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Imagens Existentes</label>
          <div className="grid grid-cols-3 gap-2">
            {existingImages.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt={`Existing ${index}`} className="w-full h-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Adicionar Nova Imagem</label>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image.preview} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <Button type="submit" className="bg-[#027A48] hover:bg-green-500 text-white">
          Editar Obra
        </Button>
      </form>
    </div>
  )
}

