"use client";
import Portifolio from "~/components/portifolio";
import Portifolio2 from "~/components/portifolio2";
import Portifolio3 from "~/components/portifolio3";;
import { Footer1 }  from "~/components/ui/footer";
import Navbar  from "~/components/navbar";

const  PortifolioPage: React.FC = () => {
  return (
    <div>
    <Navbar />
    <Portifolio />
      <Portifolio2 />
      <Portifolio3 />
      {/* <Contatos /> */}
    
    <Footer1 />

</div>
  );
};

export default PortifolioPage;

