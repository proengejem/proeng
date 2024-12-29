'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '~/components/ui/button'
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import { formSchema, FormData } from '~/schemas/form_schema'
import { v4 as uuidV4 } from "uuid";
import { FirestoreRepository } from '~/api/firebase/firebase-repository'


interface IntefaceForm {
  name: string;
  email: string;
  message: string;
}

export default function FirebaseForm() {
  const [submitMessage, setSubmitMessage] = useState('')
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      const idData = uuidV4();
      const collectionName = 'Products';
      const baseFirestorm = new FirestoreRepository<IntefaceForm>();

      // Add additional logic to send data if necessary
      const formData: IntefaceForm = {
        name: data.name,
        email: data.email,
        message: data.message,
      };

      await baseFirestorm.create(collectionName, idData, formData);
      reset()
      setSubmitMessage('Form submitted successfully!')
    } catch (error) {
      console.error("Error adding document: ", error)
      setSubmitMessage('Error submitting form. Please try again.')
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Contact Form</CardTitle>
        <CardDescription>Submit your message to Firebase Firestore</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register('name')}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Input
              id="message"
              {...register('message')}
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
          </div>
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </CardContent>
      <CardFooter>
        {submitMessage && <p className="text-sm text-center w-full">{submitMessage}</p>}
      </CardFooter>
    </Card>
  )
}

