import Image from "next/image";
import Link from "next/link";
import Numero from "~/components/numeros";
import React from "react";
import Portifolio from "~/components/portifolio";
import Portifolio2 from "~/components/portifolio2";
import Portifolio3 from "~/components/portifolio3";;
import { Footer1 }  from "~/components/ui/footer";
import Navbar  from "~/components/navbar";
import PortfolioBanner from "~/components/homePage/divisorPortifolio";
import WhatsAppIcon from "~/components/whatsapp";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfólio - ProEng',
  description: 'Veja nosso portfólio de projetos e obras concluídas com excelência.',
  keywords: ['portfólio', 'obras', 'projetos', 'engenharia', 'solo grampeado'],
  // openGraph: {
  //   title: 'Portfólio de Obras - ProEng',
  //   description: 'Veja nosso portfólio de projetos e obras concluídas com excelência.',
  //   url: 'https://www.proeng.com/portifolio',
  //   images: [{ url: '/images/portfolio-og-image.png', alt: 'Imagem do Portfólio' }],
  // },
};

export default function PortifolioPage() {
  return (
    <div>
    <Navbar />
    <Portifolio />
    {/* <PortfolioBanner/> */}
      <Portifolio2 />
      <Portifolio3 />
      {/* <Contatos /> */}
      <WhatsAppIcon />
    <Footer1 />

</div>
  );
};

// export default PortifolioPage;
