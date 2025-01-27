import React from "react";
import { Footer1 }  from "~/components/ui/footer";
import Navbar  from "~/components/navbar";
import Servicos  from "~/components/servicosgeral";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Serviços - ProEng',
  description: 'Conheça nossos serviços especializados em engenharia.',
  keywords: ['serviços', 'engenharia', 'ProEng', 'construção'],
  // openGraph: {
  //   title: 'Serviços - ProEng',
  //   description: 'Conheça nossos serviços especializados em engenharia.',
  //   url: 'https://www.proeng.com/servicos',
  //   images: [{ url: '/images/servicos-og-image.png', alt: 'Imagem de Serviços' }],
  // },
};

const  ServicoPage: React.FC = () => {
  return (
    <div>
    <Navbar />
    <Servicos />
    <Footer1 />

</div>
  );
};

export default ServicoPage;
