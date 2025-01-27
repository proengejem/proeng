import { Footer1 }  from "~/components/ui/footer";
import Navbar  from "~/components/navbar";
import Portifolioindv  from "~/components/portifolioindiv";
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Portfólio de Obras - ProEng',
  description: 'Veja nosso portfólio de projetos e obras concluídas com excelência.',
  keywords: ['obras', 'projetos', 'engenharia', 'solo grampeado', 'estaca raíz', 'estaca hélice'],
};


const  PortifolioindivPage: React.FC = () => {
  return (
    <div>
    <Navbar />
    <Portifolioindv />
    
    <Footer1 />
</div>
  );
};

export default PortifolioindivPage;