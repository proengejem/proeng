import StyledBar from "~/components/homePage/divisorAssimetrico";
import SolutionsSection from "~/components/homePage/videosHome";
import AboutSection from "~/components/homePage/EPEP";

const HomePage: React.FC = () => {
  return (
    <div>
    <AboutSection />

      <StyledBar />
      
      <SolutionsSection />
      
    </div>
  );
};

export default HomePage;
