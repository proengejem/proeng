"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  "Concreto Projetado": [
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
  const [title, setTitle] = useState<string | undefined>();
  const [currentProjects, setCurrentProjects] = useState<Project[] | undefined>(
    []
  );

  useEffect(() => {
    if (router.isReady) {
      const { title } = router.query;
      if (typeof title === "string") {
        setTitle(title);
        setCurrentProjects(projects[title]);
      }
    }
  }, [router.isReady, router.query]);

  return (
    <div className="container mx-auto px-4 py-8">
      {title ? (
        <>
          <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentProjects?.length ? (
              currentProjects.map((project: Project) => (
                <div key={project.id} className="border rounded shadow-sm p-4">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h3 className="text-lg font-semibold mt-2">
                    {project.name}
                  </h3>
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
                Nenhum projeto disponível para este título.
              </p>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Título inválido ou ausente.</p>
      )}
    </div>
  );
}
//*"use client";

//import { Footer1 }  from "~/components/ui/footer";
//import Navbar  from "~/components/navbar";
//import Portifolioindv  from "~/components/portifolioindv";

//const  PortifolioindivPage: React.FC = () => {
  //return (
    //<div>
    //<Navbar />
    //<Portifolioindv />
    
   // <Footer1 />

//</div>
 // );
//};

//export default PortifolioindivPage;