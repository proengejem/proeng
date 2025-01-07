import { Metadata } from 'next';
import StyledBar from "~/components/homePage/divisorAssimetrico";
import SolutionsSection from "~/components/homePage/videosHome";
import AboutSection from "~/components/homePage/EPEP";
import Introducao_1 from "~/components/Itroducao_1";
import Rodape from "~/components/homePage/rodape";
import { Footer1 } from "~/components/ui/footer";
import Navbar from "~/components/navbar";

export const metadata: Metadata = {
  title: 'ProEng - Sua Solução em Engenharia',
  description: 'Bem-vindo à ProEng. Oferecemos serviços especializados em engenharia para atender todas as suas necessidades.',
  keywords: ['engenharia', 'ProEng', 'construção', 'serviços de engenharia'],
  // openGraph: {
  //   title: 'ProEng - Sua Solução em Engenharia',
  //   description: 'Bem-vindo à ProEng. Oferecemos serviços especializados em engenharia para atender todas as suas necessidades.',
  //   url: 'https://www.proeng.com',
  //   images: [{ url: '/images/home-og-image.png', alt: 'Imagem da Home' }],
  // },
};

const HomePage: React.FC = () => {
  return (
    <div>
      {/* A meta tag será aplicada automaticamente aqui para a Home Page */}
      <Navbar />
      <Introducao_1 />  
      <AboutSection />
      <StyledBar />
      <SolutionsSection />
      <Rodape />
      <Footer1 />
    </div>
  );
};

export default HomePage;