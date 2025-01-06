"use client";
import { useRouter } from "next/navigation"; // Certifique-se de usar o "next/navigation" na nova arquitetura
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import correto para acessar os parâmetros


export default function SingleServicePage({params}: any) {
  // const { theme, setTheme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { servico } = params;
  // const [product, setProject] = useState<ProjectInterface | null>(null); // Produto único
  console.log(servico)


  // useEffect(() => {
  //   const getProject = async () => {
  //     const productData = await fetchProjectById(`${id}`);
  //     if (productData) {
  //       setProject(productData);
  //     }
  //   };

// interface Project {
//   servico: string;
//   name: string;
//   description: string;
//   link: string;
//   image: string;
// }


type Project = {
  servico: string,
  name: string,
  description: string,
  link: string,
  image: string[];
}

const projects: Project[] = [
  {
    servico: "solo-grampeado",
    name: "Solo Grampeado",
    description: "O solo grampeado é uma técnica de estabilização de taludes e encostas que consiste na instalação de grampos de aço ou fibra de vidro, ancorados no terreno e conectados a uma tela de aço ou fibra de vidro.",
    link: "#",
    image:["/images/obra1.jpg" , "/images/obra1.jpg" ] 
  },
  {
    servico: "estaca-raiz",
    name: "Solo Grampeado",
    description: "O solo grampeado é uma técnica de estabilização de taludes e encostas que consiste na instalação de grampos de aço ou fibra de vidro, ancorados no terreno e conectados a uma tela de aço ou fibra de vidro.",
    link: "#",
    image: ["/images/obra1.jpg", "/images/obra1.jpg" ]
  }
]
// const projects: { [key: string]: Project[] } = {
// const projects = {

//   "solo-grampeado": [
//     {
//       servico: "1",
//       name: "serviço1",
//       description: "Descrição da serviço1",
//       link: "#",
//       image: "/images/obra1.jpg",
//     },
//   ],
//   "estaca-raiz": [
//     {
//       servico: "1",
//       name: "serviço2",
//       description: "Descrição da serviço2",
//       link: "#",
//       image: "/images/obraA.jpg",
//     },
//   ],
// };

// export default function ServicoPage() {
//   const params = useParams(); // Acessa os parâmetros de forma síncrona
//   const [currentProjects, setCurrentProjects] = useState([]);

//   useEffect(() => {
//       if (params.servico) {
//           const serviceProjects = projects[params.servico];
//           setCurrentProjects(serviceProjects || []);
//       }
//   }, [params.servico]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        {params.servico ? params.servico.replace("-", " ") : "Serviço"}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {projects.length > 0 ? (
                    projects.map((project) => (          <div key={project.servico} className="border rounded shadow-sm p-4">
            <img
              src={project.image[0]}
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

