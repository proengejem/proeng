"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Project = {
  servico: string;
  name: string;
  description: string;
  link: string;
  image: string[];
};

const projects: Project[] = [
  {
    servico: "solo-grampeado",
    name: "Solo Grampeado",
    description:
      "O solo grampeado é uma técnica de estabilização de taludes e encostas...",
    link: "#",
    image: ["/images/obra1.jpg", "/images/obra2.jpg"],
  },
  {
    servico: "estaca-raiz",
    name: "Estaca Raiz",
    description:
      "A estaca raiz é uma técnica de fundação utilizada em solos instáveis...",
    link: "#",
    image: ["/images/obra3.jpg", "/images/obra4.jpg"],
  },
  {
    servico: "concreto-projetado",
    name: "Concreto Projetado",
    description:
      "O concreto projetado é uma técnica usada em túneis e contenção de taludes...",
    link: "#",
    image: ["/images/obra5.jpg", "/images/obra6.jpg"],
  },
];

export default function SingleServicePage() {
  const params = useParams(); // Acessa os parâmetros da URL
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (params?.servico) {
      const filteredProject = projects.find(
        (project) => project.servico === params.servico
      );
      setProject(filteredProject || null);
    }
  }, [params]);

  return (
    <div className="container mx-auto px-4 py-8">
      {project ? (
        <>
          <h1 className="text-2xl font-bold text-center mb-6">
            {project.name}
          </h1>
          <p className="text-center text-gray-600 mb-8">{project.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {project.image.map((imgSrc, index) => (
              <div key={index} className="border rounded shadow-sm p-4">
                <img
                  src={imgSrc}
                  alt={project.name}
                  className="w-full h-48 object-cover rounded"
                />
              </div>
            ))}
          </div>
          <a
            href={project.link}
            className="block mt-6 text-center text-blue-500 hover:underline"
          >
            Saiba mais sobre este serviço
          </a>
        </>
      ) : (
        <p className="text-center text-gray-500">
          Nenhum projeto encontrado para este serviço.
        </p>
      )}
    </div>
  );
}
