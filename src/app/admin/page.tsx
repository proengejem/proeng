'use client'

import { useState, useEffect } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { motion } from "framer-motion"
// import 'react-toastify/dist/ReactToastify.css'
import { AuthAPI } from 'pages/api/firebase//auth-api'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import { useRouter } from 'next/navigation'; // Importe o useRouter
import { useToast } from '../../hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";


const authAPI = new AuthAPI();

const loginSchema = z.object({
    email: z.string().email({
        message: "Email inválido",
    }),
    password: z
        .string()
        .min(6, {
            message: "Senha deve ter pelo menos 6 caracteres",
        })
        .max(16, {
            message: "Senha deve ter até 16 caracteres",
        }),
});

type LoginSchema = z.infer<typeof loginSchema>;


export default function Admin() {  
  const [isMounted, setIsMounted] = useState(false); // Verificação da montagem
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast();
  const router = useRouter(); // Crie uma instância do useRouter
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const authAPI = new AuthAPI();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
});

useEffect(() => {
  setIsMounted(true); // Componente foi montado
}, []);

async function onSignIn({ email, password }: LoginSchema) {
  setIsLoading(true);
  const user = await authAPI.signInWithEmailAndPassword(email, password, setEmail, setPassword, setIsLoading, router);

  if(user && isMounted) {
      console.log("Seja bem vindo")
      toast({
        title: `Seja bem-vindo, Admin`,
    });
      router.push('/admin/forms'); // Redirecione após o login bem-sucedido
  }
}

// async function onSignInWithGoogle() {
//   const user = await authAPI.signInWithGoogle();

//   if(user && isMounted ){
//       console.log("Seja bem vindo")
//       router.push('/admin/forms'); // Redirecione após o login bem-sucedido
//   }
// }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
              <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md"
        >
      <Card className="w-full max-w-md">
        <CardHeader className="bg-[#027A48] text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">Bem-vindo</CardTitle>
          <CardDescription className="text-green-100 text-center">
            Por favor, faça o log in com a sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSignIn)} className="space-y-4">
          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example@gmail.com"
                                            type="email"
                                            className="bg-white dark:bg-blue-500 text-[#027A48] dark:text-blue-100"
                                            {...field}
                                            defaultValue={''}
                                           
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="******"
                                            type="password"
                                            className='bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100'
                                            {...field}
                                            defaultValue={''}
                                          

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
            <Button type="submit" disabled={isLoading} className="w-full bg-[#027A48] hover:bg-green-500 text-white">
            {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          {/* <div className="mt-4 text-center text-sm text-gray-500">
            Ou
          </div>
          colocar conta google depois <Button
          disabled={isLoading}
            onClick={handleGoogleLogin}
            className="w-full mt-4 bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
          >
            <FaGoogle className="mr-2" />
            Log in com Google
          </Button>  */}
           </Form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          Quer adicionar outra conta no sistema? <a href="https://console.firebase.google.com/u/0/project/proeng-1c603/authentication/users?hl=pt-br" className="text-[#027A48] hover:underline">Registre</a>
        </CardFooter>
      </Card>
      </motion.div>
    </div>
  )
}

