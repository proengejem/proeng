import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "~/components/ui/toaster";
import Script from "next/script";


export const metadata: Metadata = {
  title: "ProEng",
  description: "Veja nosso portfólio de projetos e obras concluídas com excelência.",
  keywords: ["portfólio", "obras", "projetos", "engenharia"],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y5GJKN3V0L"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y5GJKN3V0L');
          `}
        </Script>

        <Toaster />
      </body>
    </html>
  );
}