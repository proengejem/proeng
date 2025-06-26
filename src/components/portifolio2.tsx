"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import BlurFade from "~/components/ui/blur-fade";

export default function Portfolio2() {
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

  const blurRef = useRef(null);
  const isInView = useInView(blurRef, { once: false, margin: "-50px" });

  return (
    <motion.div
      className="mx-auto max-w-7xl px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
          {/* Left Column - Image/Video Section */}
          <motion.div className="relative" variants={itemVariants}>
            <motion.div
              className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/Estaca raiz.jpeg"
                alt="Estaca Raíz Project Photo"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.div variants={itemVariants}>
              <div ref={blurRef}>
                {isInView ? (
                  <BlurFade delay={0.14}>
                    <h1 className="mb-4 text-3xl font-bold">Estaca Raíz</h1>
                  </BlurFade>
                ) : (
                  <h1 className="mb-4 text-3xl font-bold opacity-0">Estaca Raíz</h1>
                )}
                <p className="text-gray-600 text-justify">
                  A estaca raiz é uma estaca moldada in loco, de pequeno diâmetro e alta
                  capacidade de carga, ideal para locais com espaço reduzido e sem causar
                  vibrações. Pode atingir grandes profundidades, atravessando obstáculos
                  como rochas ou blocos de concreto, com o auxílio de revestimentos
                  metálicos recuperáveis e martelo hidráulico.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid gap-6 md:grid-cols-2"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-lg bg-gray-50 p-6 text-left transition-shadow hover:shadow-lg"
              >
                <h3 className="mb-2 font-bold text-center">Qualidade Garantida</h3>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-lg bg-gray-50 p-6 text-left transition-shadow hover:shadow-lg"
              >
                <h3 className="mb-2 font-bold text-center">Soluções Personalizadas</h3>
              </motion.button>
            </motion.div>

            <motion.div className="flex space-x-4" variants={itemVariants}>
              <Link href={`/portifolio/${encodeURIComponent("estaca-tipo-raiz")}`}>
                <button className="px-6 py-3 bg-[#027A48] text-white rounded-lg font-semibold hover:bg-green-500 transition">
                  Fotos
                </button>
              </Link>

              <Link href="https://www.youtube.com/playlist?list=PLnLPCcEY60IDsYO4a8NxMUaiRoNdUxbdG">
                <button
                  className="rounded border px-6 py-3 bg-white text-green-500 rounded-lg font-semibold hover:bg-gray-200 transition"
                  style={{ color: "#027A48" }}
                >
                  Vídeos
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}



      