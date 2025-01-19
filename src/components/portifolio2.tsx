"use client";

import Image from "next/image";
import { Play, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MediaType = "photo" | "video";
type ModalContent = {
  title: string;
  content: string;
} | null;

export default function Portfolio2() {
  const [mediaType, setMediaType] = useState<MediaType>("photo");
  const [modalContent, setModalContent] = useState<ModalContent>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen bg-white p-4 md:p-8 lg:p-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
          {/* Left Column - Image/Video Section */}
          <motion.div className="relative" variants={itemVariants}>
            {mediaType === "photo" ? (
              <motion.div
                className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/Estaca Helice.jpeg"
                  alt="Estaca Raíz Project Photo"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            ) : (
              <motion.div
                className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/Estaca Helice.jpeg"
                  alt="Estaca Raíz Project Video"
                  fill
                  className="object-cover"
                  priority
                />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 transition-colors hover:bg-opacity-30"
                  aria-label="Play video"
                >
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-xl bg-black bg-opacity-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="h-8 w-8 text-white" />
                  </motion.div>
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div variants={itemVariants}>
              <h1 className="mb-4 text-3xl font-bold">Estaca Raíz</h1>
              <p className="text-gray-600">
                Nossos serviços são projetados para atender às suas necessidades
                específicas. Experimente a eficiência e a qualidade que
                oferecemos.
              </p>
            </motion.div>

            <motion.div className="grid gap-6" variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  setModalContent({
                    title: "Qualidade Garantida",
                    content:
                      "Nossa equipe altamente qualificada garante a excelência em cada projeto. Utilizamos as melhores práticas e tecnologias do mercado para entregar resultados que superam as expectativas dos nossos clientes.",
                  })
                }
                className="cursor-pointer rounded-lg p-4 hover:bg-gray-50"
              >
                <h3 className="mb-2 font-bold">Qualidade Garantida</h3>
                <p className="text-sm text-gray-600">
                  Entregamos resultados excepcionais em todos os projetos que
                  realizamos.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  setModalContent({
                    title: "Soluções Personalizadas",
                    content:
                      "Cada projeto é único, e nossa abordagem reflete isso. Desenvolvemos soluções sob medida que se adaptam perfeitamente às necessidades específicas do seu projeto, garantindo os melhores resultados.",
                  })
                }
                className="cursor-pointer rounded-lg p-4 hover:bg-gray-50"
              >
                <h3 className="mb-2 font-bold">Soluções Personalizadas</h3>
                <p className="text-sm text-gray-600">
                  Adaptamos nossos serviços para se adequar às sua projeto
                  único.
                </p>
              </motion.div>
            </motion.div>

            <motion.div className="flex space-x-4" variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMediaType("photo")}
                className={`rounded-lg border px-6 py-2 transition-colors ${
                  mediaType === "photo"
                    ? "border-emerald-800 bg-emerald-800 text-white"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                Fotos
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMediaType("video")}
                className={`rounded-lg border px-6 py-2 transition-colors ${
                  mediaType === "video"
                    ? "border-emerald-800 bg-emerald-800 text-white"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                Vídeos
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={() => setModalContent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-xl bg-white p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalContent(null)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="mb-4 text-2xl font-bold">{modalContent.title}</h2>
              <p className="text-gray-600">{modalContent.content}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
