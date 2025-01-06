import { Footer1 }  from "~/components/ui/footer";
import Contato  from "~/components/contato";
import Navbar  from "~/components/navbar";
import StyledBar from "~/components/homePage/divisorAssimetrico";
import Introducao_1 from "~/components/Itroducao_1";
import Rodapecontato from "~/components/rodapecontato";


const contato: React.FC = () => {
    return (
      <div>
      <Navbar />
        
      <Contato />  
      <StyledBar />
      {/* <Introducao_1  /> */}
      <Rodapecontato />

        <Footer1 />
        
      </div>
    );
  };
  
  export default contato;