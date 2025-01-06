"use client";
import { useRouter } from "next/navigation"; // Certifique-se de usar o "next/navigation" na nova arquitetura
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import correto para acessar os parâmetros


// interface Project {
//   id: string;
//   name: string;
//   description: string;
//   link: string;
//   image: string;
// }

// const projects: { [key: string]: Project[] } = {
const projects = {

  "solo-grampeado": [
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
  "estaca-raiz": [
    {
      id: "1",
      name: "Obra A",
      description: "Descrição da obra A",
      link: "#",
      image: "/images/obraA.jpg",
    },
  ],
};

export default function ServicoPage() {
  const params = useParams(); // Acessa os parâmetros de forma síncrona
  const [currentProjects, setCurrentProjects] = useState([]);

  useEffect(() => {
      if (params.servico) {
          const serviceProjects = projects[params.servico];
          setCurrentProjects(serviceProjects || []);
      }
  }, [params.servico]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        {params.servico ? params.servico.replace("-", " ") : "Serviço"}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {currentProjects.length > 0 ? (
                    currentProjects.map((project) => (          <div key={project.id} className="border rounded shadow-sm p-4">
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
        ))
      ) : (
        <p className="text-center text-gray-500">
            Nenhum projeto disponível para este serviço.
        </p>
    )}
    
      </div>
    </div>
  );
}

