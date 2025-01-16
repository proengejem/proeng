'use client'

import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { motion } from "framer-motion"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form';
import { FirestoreRepository } from 'pages/api/firebase/firebase-repository';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidV4 } from "uuid";
import { ref, uploadBytes } from 'firebase/storage';
import { bucket } from 'pages/api/firebase/firebase';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import {
  CloudUpload,
  Paperclip
} from "lucide-react";

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from "~/components/extension/file-uploader";


interface ObraMenu {
  obraName: string;
  obraDescription: string;
  obraCategory: string;
  // obraImagens: string;
}

const formSchema = z.object({
  obraName: z.string().min(1, "Obra Name is required"),
  obraDescription: z.string().min(1, "Obra Description is required"),
  obraCategory: z.string().nonempty("Category is required"),
  obraImages: z.array(z.any()).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function RegisterProduct() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')
  const [files, setFiles] = useState<File[]>([]);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })

  const onSubmit = async (data: FormSchema) => {
    setFormStatus('submitting');
    const idObra = uuidV4();
    console.log("Iniciando o registro de obra...");
  
    try {
      // Upload Files to Storage
      console.log("Arquivos para upload:", files);
      await Promise.all(
        files.map(async (file) => {
          const storageRef = ref(bucket, `${idObra}/${uuidV4()}`);
          console.log("Subindo arquivo:", file.name);
          await uploadBytes(storageRef, file);
          console.log("Arquivo subido:", file.name);
        })
      );
  
      const collectionName = 'obras';
      const baseFirestorm = new FirestoreRepository<ObraMenu>();
  
      const obraData: ObraMenu = {
        obraName: data.obraName,
        obraDescription: data.obraDescription,
        obraCategory: data.obraCategory,
      };
  
      console.log("Enviando dados para o Firestore:", obraData);
      await baseFirestorm.create(collectionName, idObra, obraData);
  
      setFormStatus('submitted');
      toast.success("Obra enviada com sucesso!");
      console.log("Obra enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar obra...", error);
      toast.error("Erro ao enviar obra. Consulte o console para detalhes.");
      setFormStatus('error');
    }
  };
  



  return (
    <div className="border p-4 rounded-md">
       <motion.h3 className="text-xl font-semibold mb-4 text-[#027A48]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}>
        Criar uma Nova Obra</motion.h3>
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
      <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                        control={form.control}
                        name="obraName"
                        render={({ field }) => (
                            <FormItem className='space-y-2'>
                                <FormLabel className='text-sm font-medium text-blue-900 dark:text-blue-100'>Nome da Obra</FormLabel>
                                <FormControl>
                                    <Input {...field} defaultValue={''} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                      />
                       <FormField
                      control={form.control}
                      name="obraDescription"
                      render={({ field }) => (
                        <FormItem className='space-y-2'>
                          <FormLabel  className='text-sm font-medium text-blue-900 dark:text-blue-100'>Descrição da Obra</FormLabel>
                          <FormControl>
                            <Input 
                            defaultValue={''}
                            // className='bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100'
                            type="text"
                            {...field} />
                          </FormControl>
                          <FormDescription>This is your public display name.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="obraCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel  className='text-sm font-medium text-blue-900 dark:text-blue-100'>Categoria/Serviço da Obra</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} >
                            <FormControl>
                              <SelectTrigger className='bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100'>
                                <SelectValue placeholder="" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="solo-grampeado">Solo Grampeado</SelectItem>
                              <SelectItem value="concreto-projetado">Concreto Projetado</SelectItem>
                              <SelectItem value="helice-continua-monitorada">Hélice Contínua Monitorada</SelectItem>
                              <SelectItem value="estaca-tipo-raiz">Estaca Tipo Raiz</SelectItem>
                              <SelectItem value="micro-estacas-injetadas">Micro Estacas Injetadas</SelectItem>
                              <SelectItem value="injecoes-de-consolidacao">Injeções de Consolidação</SelectItem>
                              <SelectItem value="d-h-p">Dreno Sub-Horizontal Profundo</SelectItem>
                              <SelectItem value="tirantes">Tirantes</SelectItem>

                            </SelectContent>
                          </Select>
                            <FormDescription>You can manage email addresses in your email settings.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                 <FormField
                          control={form.control}
                          name="obraImages"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel  className='text-sm font-medium text-blue-900 dark:text-blue-100'>Selecione o arquivo</FormLabel>
                              <FormControl>
                                <FileUploader
                                  value={files}
                                  onValueChange={(newFiles) => setFiles(newFiles || [])}
                                  dropzoneOptions={dropZoneConfig}
                                  className="relative bg-background rounded-lg p-2"
                                >   
                                  <FileInput
                                    id="fileInput"
                                    className="outline-dashed outline-1 outline-slate-500"
                                  >
                                    <div className="flex items-center justify-center flex-col p-8 w-full ">
                                      <CloudUpload className='text-gray-500 w-10 h-10' />
                                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Clique para fazer o upload</span>
                                        &nbsp; or drag and drop
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG or GIF
                                      </p>
                                    </div>
                                  </FileInput>
                                  <FileUploaderContent>
                                    {files &&
                                      files.length > 0 &&
                                      files.map((file, i) => (
                                        <FileUploaderItem key={i} index={i}>
                                          <Paperclip className="h-4 w-4 stroke-current" />
                                          <span>{file.name}</span>
                                        </FileUploaderItem>
                                      ))}
                                  </FileUploaderContent>
                                </FileUploader>
                              </FormControl>
                              <FormDescription>Selecione o arquivo para o upload.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

        <Button type="submit" className="bg-[#027A48] hover:bg-green-500 text-white"
        disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'submitting' ? 'Registering...' : 'Register Product'}
                    </Button>
      
      </form>
      </Form>
      </motion.div>
    </div>
  )
}