"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeadBar from "~/components/homePage/headerPortifolio";


type MediaType = "photo" | "video";

interface ModalContent {
  title: string;
  content: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Portfolio() {
  const [mediaType, setMediaType] = useState<MediaType>("photo");
  const [selectedModal, setSelectedModal] = useState<ModalContent | null>(null);

  const modalContent = {
    quality: {
      title: "Qualidade Garantida",
      content:
        "Nossa equipe altamente qualificada garante a excelência em cada etapa do projeto. Utilizamos tecnologias avançadas e seguimos rigorosos padrões de qualidade para entregar resultados que superam as expectativas. Cada projeto é minuciosamente planejado e executado com precisão, garantindo durabilidade e segurança.",
    },
    solutions: {
      title: "Soluções Personalizadas",
      content:
        "Entendemos que cada projeto é único e requer uma abordagem específica. Nossa equipe trabalha em estreita colaboração com você para desenvolver soluções que atendam perfeitamente às suas necessidades. Combinamos nossa experiência técnica com sua visão para criar soluções inovadoras e eficientes.",
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with slide-in animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-[250px] w-full overflow-hidden"
      >
      <HeadBar />

      </motion.div>
      {/* <HeadBar /> */}

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-start gap-12 md:grid-cols-2"
        >
          {/* Left Column */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="mb-4 text-3xl font-bold">Solo Grampeado</h2>
              <p className="mb-6 text-gray-600">
                Nossos serviços são projetados para atender às suas necessidades
                específicas. Experimente a eficiência e a qualidade que
                oferecemos.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid gap-6 md:grid-cols-2"
            >
              <motion.button
                onClick={() => setSelectedModal(modalContent.quality)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-lg bg-gray-50 p-6 text-left transition-shadow hover:shadow-lg"
              >
                <h3 className="mb-2 font-bold">Qualidade Garantida</h3>
                <p className="text-sm text-gray-600">
                  Clique para saber mais sobre nossa qualidade excepcional.
                </p>
              </motion.button>
              <motion.button
                onClick={() => setSelectedModal(modalContent.solutions)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-lg bg-gray-50 p-6 text-left transition-shadow hover:shadow-lg"
              >
                <h3 className="mb-2 font-bold">Soluções Personalizadas</h3>
                <p className="text-sm text-gray-600">
                  Clique para descobrir como personalizamos nossas soluções.
                </p>
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex space-x-4">
             
                              <Link href={{
      pathname: "/portifolioindiv", // Nome da página do segundo código
      query: { title: "Solo Grampeado" }, // Passa o título como parâmetro
    }}>
            <button className="px-6 py-3 bg-[#027A48] text-white rounded-lg font-semibold hover:bg-green-500 transition">
              Fotos
            </button>
            </Link>
            <Link href="https://www.youtube.com/playlist?list=PLnLPCcEY60IAok3QEttHV3Mkxj87koWqk">
            <button className="rounded border px-6 py-3 bg-white text-green-500 rounded-lg font-semibold hover:bg-gray-200 transition" style={{ color: '#027A48' }}>
              Vídeos
            </button>
            </Link>
            </motion.div>
          </div>

          {/* Right Column - Image/Video Section */}
          <motion.div variants={itemVariants} className="relative">
            <AnimatePresence mode="wait">
                <motion.div
                  key="photo"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl"
                >
                  <Image
                    src="/Estaca Raiz.jpeg"
                    alt="Solo Grampeado Project Photo"
                    fill
                    className="object-cover"
                  />
                </motion.div>
             
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
      
    </div>
  );
};