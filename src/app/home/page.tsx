import StyledBar from "~/components/homePage/divisorAssimetrico";
import SolutionsSection from "~/components/homePage/videosHome";
import AboutSection from "~/components/homePage/EPEP";
import Introducao_1 from "~/components/Itroducao_1";
import Rodape from "~/components/homePage/rodape";
import { Footer1 }  from "~/components/ui/footer";


const HomePage: React.FC = () => {
  return (
    <div>
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
