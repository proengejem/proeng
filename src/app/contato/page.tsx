import { Footer1 }  from "~/components/ui/footer";
import Contato  from "~/components/contato";
import Navbar  from "~/components/navbar";
import StyledBar from "~/components/homePage/divisorAssimetrico";
import Introducao_1 from "~/components/Introducao_1";
import Rodapecontato from "~/components/rodapecontato";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato - ProEng',
  description: 'Entre em contato conosco para saber mais sobre nossos serviços e tirar suas dúvidas.',
  keywords: ['contato', 'engenharia', 'ProEng', 'atendimento'],
  // openGraph: {
  //   title: 'Contato - ProEng',
  //   description: 'Entre em contato conosco para saber mais sobre nossos serviços e tirar suas dúvidas.',
  //   url: 'https://www.proeng.com/contato',
  //   images: [{ url: '/images/contato-og-image.png', alt: 'Imagem de Contato' }],
  // },
};

const contato: React.FC = () => {
    return (
      <div>
      <Navbar />
        
      <Contato />  
      <StyledBar />
       <Introducao_1  /> 
      <Rodapecontato />

        <Footer1 />
        
      </div>
    );
  };
  
  export default contato;