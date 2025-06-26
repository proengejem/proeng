"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import BlurFade from "~/components/ui/blur-fade";

export default function Portfolio3() {
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
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-4 pt-40"
      >

        <div className="grid items-start gap-12 md:grid-cols-2 pb-40">
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <div ref={blurRef}>
                {isInView ? (
                  <BlurFade delay={0.14}>
                    <h1 className="mb-4 text-3xl font-bold">Estaca Hélice</h1>
                  </BlurFade>
                ) : (
                  <h1 className="mb-4 text-3xl font-bold opacity-0">Estaca Hélice</h1>
                )}
              <p className="mb-6 text-gray-600 text-justify">
                A estaca tipo hélice contínua monitorada, usada no Brasil desde 2001, é executada com perfuratrizes compactas que permitem estacas de 25 a 50 cm de diâmetro e até 22 m de profundidade. É ideal para locais com espaço limitado, podendo ser feita a apenas 40 cm da divisa, e conta com monitoramento em tempo real, como nas perfuratrizes convencionais.
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

            <motion.div variants={itemVariants} className="flex space-x-4">
              <Link href={`/portifolio/${encodeURIComponent("helice-continua-monitorada")}`}>
                <button className="px-6 py-3 bg-[#027A48] text-white rounded-lg font-semibold hover:bg-green-500 transition">
                  Fotos
                </button>
              </Link>

              <a href="https://www.youtube.com/playlist?list=PLnLPCcEY60IA3AZL_Cj5l_MQTsoxdIXUF">
                <button className="rounded border px-6 py-3 bg-white text-green-500 rounded-lg font-semibold hover:bg-gray-200 transition" style={{ color: '#027A48' }}>
                  Vídeos
                </button>
              </a>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative">
            <AnimatePresence mode="wait">
              <motion.div className="relative" variants={itemVariants}>
                            <motion.div
                              className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl"
                              initial={{ scale: 0.95 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Image
                                src="/Estaca Helice.jpeg"
                                alt="Estaca Hélice Project Photo"
                                fill
                                className="object-cover"
                                priority
                              />
                            </motion.div>
                            </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

