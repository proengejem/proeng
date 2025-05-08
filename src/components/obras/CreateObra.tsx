'use client'

import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { insertData } from 'pages/api/supabse/database'
import { useToast } from '~/hooks/use-toast'
import { uploadFilesToStorage } from 'pages/api/supabse/storage'
import Image from 'next/image'


interface ObraInterface {
  name: string
  description: string
  service: string
  images?: File[]
}

export default function CreateObra() {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [service, setService] = useState('')
  const [images, setImages] = useState<{ file: File; preview: string }[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    //const form = e.target as HTMLFormElement;
      const formData: ObraInterface = {
        name: name,
        description: description,
        service: service,
      };

      

    try {
      
      const { error } = await insertData('obras', formData)
          
      if (error) {
        console.error('Erro ao criar uma obra:', error.message)
        toast({
          title: 'Erro ao criar uma obra',
          description: error.message,
        })
        return
      }

    } catch (error) {
      console.error('Erro ao criar uma obra:', error)
      return
    
    } finally {
      
      setName('')
      setDescription('')
      setService('')
      setImages([])
    }


    const sanitizeFilename = (filename: string) => {
      return filename
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "") // remove acentos
        .replace(/[^a-zA-Z0-9.\-_]/g, '-') // substitui caracteres inválidos por hífen
    }

    const sanitizedFiles = images.map(image => {
      const newFileName = sanitizeFilename(image.file.name)
      return new File([image.file], newFileName, { type: image.file.type })
    })

    // Upload images to storage
    const imagePaths = await uploadFilesToStorage('Obras', sanitizedFiles, formData.name)
    console.log('imagePaths:', imagePaths)
    // Create the obra

    if(imagePaths.uploadedFiles.length > 0) {
      console.log('Criando uma obra:', { name, description, service, images: images.map(img => img.file) })
      toast
      ({
        title: 'Obra criada com sucesso',
        description: 'Sua obra foi criada com sucesso!',
      })
      
    }   
  }

  useEffect(() => {
    return () => images.forEach(image => URL.revokeObjectURL(image.preview))
  }, [images])

  return (
    <div className="border p-4 rounded-md">
      <h3 className="text-xl font-semibold mb-4 text-[#027A48]">Criar uma Nova Obra</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Nome"
          name = 'name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Textarea
          placeholder="Descrição"
          name = 'description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {/* <Input
          type="text"
          name = 'service'
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
  <option value="concreto-projetado">Concreto Projetado</option>
  <option value="helice-continua-monitorada">Hélice Contínua Monitorada</option>
  <option value="estaca-tipo-raiz">Estaca Tipo Raiz</option>
  <option value="micro-estacas-injetadas">Micro Estacas Injetadas</option>
  <option value="injecoes-de-consolidacao">Injeções de Consolidação</option>
  <option value="d-h-p">Dreno Sub-Horizontal Profundo</option>
  <option value="tirantes">Tirantes</option>

</select>
 
        <div className="space-y-2">
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files ?? [])
              setImages(prevImages => [
                ...prevImages,
                ...files.map(file => ({
                  file,
                  preview: URL.createObjectURL(file)
                }))
              ])
            }}
          />
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
  src={image.preview}
  alt={`Preview ${index}`}
  width={800} // Defina a largura adequada
  height={96} // Defina a altura adequada
  className="w-full h-24 object-cover rounded"
/>
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
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
          Criar Obra
        </Button>
      </form>
    </div>
  )
}