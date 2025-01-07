import Image from "next/image";
import Link from "next/link";
import Numero from "~/components/numeros";
import React from "react";
import Carossel from "~/components/carossel";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Navbar  from "~/components/navbar";
import Valores  from "~/components/valores";
import { Footer1 }  from "~/components/ui/footer";
import Sobrenoscompo from "~/components/sobrenos1";
import Sobrenoscompo2 from "~/components/sobrenos2";
import Sobrenoscompo3 from "~/components/sobrenos3";
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Sobre Nós - ProEng',
  description: 'Saiba mais sobre a ProEng, nossa história e valores.',
  keywords: ['sobre nós', 'ProEng', 'empresa', 'engenharia'],
  // openGraph: {
  //   title: 'Sobre Nós - ProEng',
  //   description: 'Saiba mais sobre a ProEng, nossa história e valores.',
  //   url: 'https://www.proeng.com/sobre-nos',
  //   images: [{ url: '/images/sobre-nos-og-image.png', alt: 'Imagem de Sobre Nós' }],
  // },
};

export default function Sobrenos() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Sobrenoscompo/>
      <Sobrenoscompo2/>
      <Sobrenoscompo3/>
      <footer className="w-full">
        <Valores/>

        <Footer1 />
      </footer>
    </div>
  );
}