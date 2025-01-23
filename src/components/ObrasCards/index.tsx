'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useToast } from '~/hooks/use-toast';
import { Button } from '~/components/ui/button';

const supabase = createClient(
  'https://xaljbeozaieyoecnxvum.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhbGpiZW96YWlleW9lY254dnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDUwNDIsImV4cCI6MjA1MjUyMTA0Mn0.4GCZtQ2tGMkHSlvZgzCP2s7QlT7hlOOdzz5jLvCYyT8'
);

interface Obra {
  id: number;
  name: string;
  description: string;
  service: string;
  images: string[];
}

export default function ObrasCards() {
  const [obras, setObras] = useState<Obra[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const { data, error } = await supabase.from('obras').select('*');

        if (error) {
          console.error('Erro ao buscar obras:', error.message);
          toast({
            title: 'Erro ao buscar obras',
            description: error.message,
          });
          return;
        }

        if (data) {
          setObras(data);
        }
      } catch (err) {
        console.error('Erro inesperado:', err);
        toast({
          title: 'Erro inesperado',
          description: 'Ocorreu um erro ao carregar as obras.',
        });
      }
    };

    fetchObras();
  }, [toast]);

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-6 text-[#027A48]">Obras Disponíveis</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {obras.map((obra) => (
          <div key={obra.id} className="border rounded-lg p-4 shadow-md">
            <h4 className="text-xl font-semibold mb-2 text-[#027A48]">{obra.name}</h4>
            <p className="text-sm text-gray-600 mb-4">{obra.description}</p>
            <p className="text-sm font-medium text-gray-700 mb-4">Serviço: {obra.service}</p>
            <Button className="mt-4 bg-[#027A48] text-white hover:bg-green-500">
              Ver Mais
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}


