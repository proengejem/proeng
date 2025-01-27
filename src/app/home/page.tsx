import { Metadata } from 'next';
import StyledBar from "~/components/homePage/divisorServico";
import SolutionsSection from "~/components/homePage/servicosHome";
import AboutSection from "~/components/homePage/EPEP";
import Introducao_1 from "~/components/Introducao_1";
import Rodape from "~/components/homePage/rodape";
import { Footer1 } from "~/components/ui/footer";
import Navbar from "~/components/navbar";
import SolutionsSectionVideos from '~/components/homePage/videosCards/page';

export const metadata: Metadata = {
  title: 'ProEng - Sua Solução em Engenharia',
  description: 'Bem-vindo à ProEng. Oferecemos serviços especializados em engenharia para atender suas necessidades sempre.',
  keywords: ['engenharia', 'ProEng', 'geotecnia', 'serviços de engenharia'],
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
      <SolutionsSectionVideos />
      <Rodape />
      <Footer1 />
    </div>
  );
};

export default HomePage;