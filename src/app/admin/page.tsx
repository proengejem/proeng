'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { motion } from "framer-motion"
import 'react-toastify/dist/ReactToastify.css'
import { AuthAPI } from 'pages/api/firebase//auth-api'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { FaGoogle } from 'react-icons/fa'
import { useRouter } from 'next/navigation'; // Importe o useRouter
import { useToast } from '../../hooks/use-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the email/password login
    console.log('Logging in with:', { email, password })
  }

  const handleGoogleLogin = () => {
    // Here you would typically handle the Google login
    console.log('Logging in with Google')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-[#027A48] text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">Bem-vindo</CardTitle>
          <CardDescription className="text-green-100 text-center">
            Por favor, faça o log in com a sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#027A48] hover:bg-green-500 text-white">
              Log In
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500">
            Ou
          </div>
          <Button
            onClick={handleGoogleLogin}
            className="w-full mt-4 bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
          >
            <FaGoogle className="mr-2" />
            Log in com Google
          </Button>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          Não possui uma conta? <a href="#" className="text-[#027A48] hover:underline">Registre-se</a>
        </CardFooter>
      </Card>
    </div>
  )
}

