import StyledBar from "~/components/homePage/divisorAssimetrico";
import SolutionsSection from "~/components/homePage/videosHome";
import AboutSection from "~/components/homePage/EPEP";
import Introducao_1 from "~/components/Itroducao_1";
import Rodape from "~/components/homePage/rodape";

const HomePage: React.FC = () => {
  return (
    <div>
    <Introducao_1 />  

    <AboutSection />

      <StyledBar />
      
      <SolutionsSection />
      
      <Rodape />
    </div>
  );
};

export default HomePage;
