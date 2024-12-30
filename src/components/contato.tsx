import React from "react";
import Image from "next/image";
import type { ButtonProps } from "@relume_io/relume-ui";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
  BiLogoWhatsapp,
} from "react-icons/bi";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type Links = {
  title: string;
  url: string;
  icon?: React.ReactNode;
};

type ColumnLinks = {
  title: string;
  links: Links[];
};

type Column = {
  title: string;
  text: string[];
};

type FooterLink = {
  title: string;
  url: string;
};

type Props = {
  logo: ImageProps;
  newsletterDescription: string;
  inputPlaceholder?: string;
  button: ButtonProps;
  termsAndConditions: string;
  columnLinks: ColumnLinks[];
  column: Column[];
  footerText: string;
  footerLinks: FooterLink[];
};

export type Footer1Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Contato = (props: Footer1Props) => {
  const {
    logo,
    newsletterDescription,
    inputPlaceholder,
    button,
    termsAndConditions,
    columnLinks,
    footerText,
    footerLinks,
  } = { ...ContatoDefaults, ...props };

  return (
     <section className="relative z-50 py-12  flex items-center overflow-hidden">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
            {/* Image Section */}
            <div className="w-full md:w-1/2 order-last md:order-first flex justify-center">
              <div className="rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src="/sede.png" // Substituir pelo caminho correto da imagem
                  alt="Sobre a Proeng"
                  width={500}
                  height={300}
                  className="w-full h-auto object-cover"
                />
          </div>
        </div>
        <div className="w-full md:w-1/2 space-y-8">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">


        {/* <div className="px-[5%] py-12 md:py-18 lg:py-20 w-full"> */}
          {/* <div className="container"> */}
            <div className="grid grid-cols-1 gap-8 pb-12 md:gap-12 lg:grid-cols-2 lg:gap-16">
              {columnLinks.map((column, index) => (
                <div key={index} className="flex flex-col items-start justify-start">
                  <h2 style={{ color: "#027A48" }} className="mb-3 font-semibold md:mb-4">
                    {column.title}
                  </h2>
                  <ul className="space-y-4">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="text-sm">
                        <a
                          href={link.url}
                          className="flex items-center gap-3 text-gray-800 hover:text-gray-600"
                          aria-label={link.title}
                        >
                          {link.icon && <span>{link.icon}</span>}
                          <span>{link.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

// Default props for the component
export const ContatoDefaults: Props = {
  column: [
    {
      title: "Column Title",
      text: ["Column text line 1", "Column text line 2"],
    },
  ],
  logo: {
    url: "#",
    src: "https://d22po4pjz3o32e.cloudfront.net/logo-image.svg",
    alt: "Logo image",
  },
  newsletterDescription: "Vamos conversar?",
  button: {
    title: "Enviar",
    variant: "secondary",
    size: "sm",
  },
  termsAndConditions: `
    <p class='text-xs'>
      By subscribing you agree to our 
      <a href='#' class='underline'>Privacy Policy</a> 
      and provide consent to receive updates from our company.
    </p>
  `,
  columnLinks: [
    {
      title: "PROENG",
      links: [
        { title: "Rua Tupi, 05 - Valparaíso - Sto. André - SP", url: "https://www.google.com/maps/search/Rua+Tupi,+05+-+Valpara%C3%ADso+-+Sto.+Andr%C3%A9+-+SP/@-23.6673797,-46.546769,16z/data=!3m1!4b1?authuser=0&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" },
        { title: "(11) 4319-7888", url: "https://www.google.com/search?q=(11)+4319-7888&oq=(11)+4319-7888&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDEzMDhqMGo0qAIAsAIA&sourceid=chrome&ie=UTF-8#" },
        { title: "comercial@proengg.com.br", url: "mailto:comercial@proengg.com.br" },
        { title: "Seg.-Sex.: 8AM - 6PM", url: "#" },
      ],
    },
    {
      title: "Siga-nos",
      links: [
        { title: "Facebook", url: "https://www.facebook.com/proengg/?locale=pt_BR", icon: <BiLogoFacebookCircle className="size-6" /> },
        { title: "Instagram", url: "https://www.instagram.com/proeng_geotecnia/", icon: <BiLogoInstagram className="size-6" /> },
        { title: "LinkedIn", url: "https://www.linkedin.com/company/proeng-geotecnia/?originalSubdomain=br", icon: <BiLogoLinkedinSquare className="size-6" /> },
        { title: "Youtube", url: "https://www.youtube.com/channel/UCe4V9_T872AFbg4PVWtrJfw", icon: <BiLogoYoutube className="size-6" /> },
        { title: "Whatsapp", url: "#", icon: <BiLogoWhatsapp className="size-6" /> },
      ],
    },
  ],
  footerText: "© 2024 Proeng. Todos os direitos reservados.",
  footerLinks: [
    { title: "Política de Privacidade", url: "#" },
    { title: "Termos de Serviço", url: "#" },
    { title: "Configurações de Cookies", url: "#" },
  ],
};

export default Contato;