"use client";

import { Footer1 }  from "~/components/ui/footer";
import Navbar  from "~/components/navbar";
import Portifolioindv  from "~/components/portifolioindiv";

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