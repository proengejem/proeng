import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Portfólio - ProEng',
    description: 'Veja nosso portfólio de projetos e obras concluídas com excelência.',
    keywords: ['portfólio', 'obras', 'projetos', 'engenharia', ],
    
  };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}