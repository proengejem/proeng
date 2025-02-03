"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Image from "next/image";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <>
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative aspect-[4/3]">
              <motion.img
                src={project.thumbnail}
                alt={project.title}
                className="h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {project.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectCarousel
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface Project {
  id: number;
  title: string;
  thumbnail: string;
  images: string[];
}

interface ProjectCarouselProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectCarousel({ project, onClose }: ProjectCarouselProps) {
  return (
    <Dialog open={!!project} onClose={onClose} maxWidth="md" fullWidth>
      {/* Accessible title */}
      <DialogTitle>{project?.title}</DialogTitle>

      <DialogContent>
        <div className="flex flex-col space-y-4">
          {project?.images.map((image, index) => (
            <Image
            key={index}
            src={image}
            alt={`${project.title} - Image ${index + 1}`}
            width={800} // Defina um valor adequado
            height={600} // Defina um valor adequado
            className="w-full rounded-md object-cover"
          />
          
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
