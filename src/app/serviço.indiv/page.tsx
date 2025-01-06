"use client";
import { useRouter } from "next/navigation"; // Certifique-se de usar o "next/navigation" na nova arquitetura
import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  image: string;
}

const projects: { [key: string]: Project[] } = {
  "Solo Grampeado": [
    {
      id: "1",
      name: "Obra 1",
      description: "Descrição da obra 1",
      link: "#",
      image: "/images/obra1.jpg",
    },
    {
      id: "2",
      name: "Obra 2",
      description: "Descrição da obra 2",
      link: "#",
      image: "/images/obra2.jpg",
    },
  ],
  "Estaca Raíz": [
    {
      id: "1",
      name: "Obra A",
      description: "Descrição da obra A",
      link: "#",
      image: "/images/obraA.jpg",
    },
  ],
};

export default function PortfolioPage() {
  const router = useRouter();
  const [currentProjects, setCurrentProjects] = useState<Project[] | undefined>(
    undefined
  );
  const [title, setTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Simulação de um "query" caso esteja na nova estrutura do app
    const queryTitle = window.location.pathname.split("/").pop();
    if (queryTitle) {
      setTitle(queryTitle);
      setCurrentProjects(projects[queryTitle]);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProjects?.map((project: Project) => (
          <div key={project.id} className="border rounded shadow-sm p-4">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{project.name}</h3>
            <p className="text-gray-600">{project.description}</p>
            <a
              href={project.link}
              className="text-blue-500 hover:underline mt-2 block"
            >
              Ver projeto
            </a>
          </div>
        ))}
        {!currentProjects && (
          <p className="text-center text-gray-500">
            Nenhum projeto disponível para este título.
          </p>
        )}
      </div>
    </div>
  );
}
