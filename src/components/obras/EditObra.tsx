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
}

const formSchema = z.object({
  obraName: z.string().min(1, "Obra Name is required"),
  obraDescription: z.string().min(1, "Obra Description is required"),
  obraCategory: z.string().nonempty("Category is required"),
  obraImages: z.array(z.any()).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function EditObra() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [files, setFiles] = useState<File[]>([]);
  const [obra, setObra] = useState<ObraMenu | null>(null);
  const [obraId, setObraId] = useState<string>('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [verificationObra, setVerificationProduction] = useState(false);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSearchObra = () => {
    // Get the input value
    const inputValue = (document.getElementById("idInput") as HTMLInputElement).value;
    // Update the query state with the input value
    setObraId(inputValue);
    console.log(inputValue);
};

  useEffect(() => {
    const fetchObra = async () => {
      const obra = await fetchObraById(obraId);
      console.log(obra);

      if (obra) {
        form.setValue("obraName", obra.obraName);
        form.setValue("obraDescription", obra.obraDescription);
        form.setValue("obraCategory", obra.obraCategory);
        setImageUrls(obra.obraImage || []);
        console.log(obra.obraImage); //Fazer o tratamento para exibir as imagens
        
        setObra(obra);
      }
    };

    fetchObra();

    return () => {
      setObra(null);
      setFiles([]);
    };

  }, [obraId]);

  const onSubmit = async (data: FormSchema) => {
    setFormStatus('submitting');
    const idObra = obraId || uuidV4();

    try {
      // Upload dos arquivos para o Storage
      await Promise.all(
        files.map(async (file) => {
          const storageRef = ref(bucket, `${idObra}/${uuidV4()}`);
          await uploadBytes(storageRef, file);
        })
      );

      const collectionName = 'Products';
      const baseFirestorm = new FirestoreRepository<ObraMenu>();

      // Dados do produto a serem enviados
      const obraData: ObraMenu = {
        obraName: data.obraName,
        obraDescription: data.obraDescription,
        obraCategory: data.obraCategory,
        obraImages: data.obraImages || [],
      };

      await baseFirestorm.update(collectionName, idObra, obraData);
    } catch (error) {
      console.error("Error updating product", error);
      setFormStatus('error');
    }
  };

  return (
    <main className="flex-1 w-full">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-blue-900">
        <div className="container px-4 md:px-6">
          <motion.h1 
            className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-blue-900 dark:text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Editar Obra
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="max-w-2xl mx-auto bg-white dark:bg-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-900 dark:text-blue-100">Pesquisar Obra</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className='space-y-2 my-4'>
                    <label className='text-sm font-medium text-blue-900 dark:text-blue-100'>Obra Id</label>
                      <Input 
                        value={obraId}
                        id="idInput"
                        name='idInput'
                        onChange={(e) => setObraId(e.target.value)}
                        className='bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100' 
                      />
                  </div>
                  <Button 
                    onClick={handleSearchObra} 
                    className="w-full bg-blue-800 text-white hover:bg-blue-700 dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300"
                  >
Pesquisar Obra                  </Button>
              </CardContent>
            </Card>
          </motion.div>
          {obra && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="max-w-2xl mx-auto bg-white dark:bg-blue-800 mt-8">
              <CardHeader>
                <CardTitle className="text-blue-900 dark:text-blue-100">Informações da Obra</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="obraName"
                      render={({ field }: { field: any }) => (
                          <FormItem className='space-y-2'>
                              <FormLabel className='text-sm font-medium text-blue-900 dark:text-blue-100'>Nome Obra</FormLabel>
                              <FormControl>
                                  <Input {...field} className='bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100' />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="obraDescription"
                      render={({ field }: { field: any }) => (
                        <FormItem className='space-y-2'>
                          <FormLabel  className='text-sm font-medium text-blue-900 dark:text-blue-100'>Descrição Obra</FormLabel>
                          <FormControl>
                            <Input 
                            className='bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100'
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
                      render={({ field }: { field: any }) => (
                        <FormItem>
                          <FormLabel  className='text-sm font-medium text-blue-900 dark:text-blue-100'>Categoria Obra</FormLabel>
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
                      render={({ field }: { field: any }) => (
                        <FormItem>
                          <FormLabel  className='text-sm font-medium text-blue-900 dark:text-blue-100'>Select File</FormLabel>
                          <FormControl>
                            <FileUploader
                              value={files}
                              onValueChange={(newFiles: File[] | null) => setFiles(newFiles || [])}
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
                                <span className="font-semibold">Click to upload</span>
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
                                files.map((file: File, i: number) => (
                                <FileUploaderItem key={i} index={i}>
                                  <Paperclip className="h-4 w-4 stroke-current" />
                                  <span>{file.name}</span>
                                </FileUploaderItem>
                                ))}
                              </FileUploaderContent>
                            </FileUploader>
                          </FormControl>
                          <FormDescription>Select a file to upload.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-800 text-white hover:bg-blue-700 dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300"
                      disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'submitting' ? 'Updating...' : 'Update Product'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}

function fetchObraById(obraId: string) {
  throw new Error('Function not implemented.')
}
