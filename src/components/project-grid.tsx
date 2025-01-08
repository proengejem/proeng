"use client";

import { useState } from "react";
import { ProjectCarousel } from "~/components/carossel2";

const projects = [
  {
    id: 1,
    title: "Nome obra 04",
    thumbnail: "/Estaca Helice.jpeg?height=300&width=400",
    images: [
      "/Estaca Raiz.jpeg?height=600&width=800",
      "/Estaca Raiz.jpeg?height=600&width=800",
      "/Estaca Raiz.jpeg?height=600&width=800",
    ],
  },
  {
    id: 2,
    title: "Nome obra 05",
    thumbnail: "/Solo Grampeado.jpeg?height=300&width=400",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 3,
    title: "Nome obra 06",
    thumbnail: "/Estaca Raiz.jpeg?height=300&width=400",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
];

export function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105"
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative aspect-[4/3]">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      {selectedProject && (
        <ProjectCarousel
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
