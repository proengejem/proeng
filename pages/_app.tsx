import Script from "next/script";

import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Google Tag Manager */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Y5GJKN3V0L"
        strategy="afterInteractive" // Carrega o script após a interação inicial
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Y5GJKN3V0L');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
