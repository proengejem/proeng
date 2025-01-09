"use client";

import { Button, Input } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoYoutube,
  BiLogoWhatsapp,
} from "react-icons/bi";
import { db } from "pages/api/firebase/firebase";
import Link from "next/link";


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

export const Footer1 = (props: Footer1Props) => {
  const {
    logo,
    newsletterDescription,
    button,
    termsAndConditions,
    columnLinks,
    footerText,
  } = {
    ...Footer1Defaults,
    ...props,
  };

  const [nomeInput, setNomeInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [mensagemInput, setMensagemInput] = useState<string>("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = {
      name: form.nome.value,
      email: form.email.value,
      message: form.mensagem.value,
    };
  
    try {
      // Salva no Firebase
      await addDoc(collection(db, "contato"), formData);
  
      // Envia o email
      const response = await fetch("api/send-email", 
        {method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Informações salvas e email enviado com sucesso!");
      } else {
        alert("Erro ao enviar email");
      }
    } catch (error) {
      console.error("Erro ao processar o formulário: ", error);
    }
  };

  return (
    <footer>
      <div className="relative h-16 w-full bg-white">
        <div className="clip-path-diagonal absolute bottom-0 h-16 w-full bg-green-800" style={{ backgroundColor: '#027A48' }} />
      </div>
      {/* Faixa verde */}
      <div className="h-px w-full bg-black" />
      <div className="px-[5%] py-12 md:py-18 lg:py-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-x-[8vw] gap-y-12 pb-12 md:gap-y-16 md:pb-18 lg:grid-cols-[0.75fr_1fr] lg:gap-y-4 lg:pb-20">
            <div className="flex flex-col">
              {logo.url && <Link href={logo.url} className="mb-3 md:mb-3">
                <img src= "/ProengLogo.png" alt="Proeng Engenharia" className="inline-block" />
              </Link>}
              <p className="mb-5 md:mb-6" style={{color:"#027A48"} }>{newsletterDescription}</p>
              <div className="w-full max-w-md">
              <form
                className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[1fr_max-content] md:gap-y-4"
                onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                  <Input
                    id="nome"
                    type="text" 
                    name = "nome"
                    placeholder={"Digite seu nome"}
                    value={nomeInput}
                    onChange={(e) => setNomeInput(e.target.value)}
                  />
                  <Input
                    id="email"
                    type="email"
                    name = "email"
                    placeholder={"Digite seu email"}
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                  <Input
                    id="mensagem"
                    type="text"
                    name = "mensagem"
                    placeholder={"Digite sua mensagem"}
                    value={mensagemInput}
                    onChange={(e) => setMensagemInput(e.target.value)}
                  />
                  </div>
                  <div className="space-y-12">
                    
                  <Button  className="px-6 py-3 bg-[#027A48] text-white rounded-lg font-semibold hover:bg-green-500 transition"
 style={{ backgroundColor: "#027A48", color: "white" }}{...button}>{button.title}</Button>
                  </div>

                </form>
                <div dangerouslySetInnerHTML={{ __html: termsAndConditions }} />
              </div>
            </div>
            <div className="grid grid-cols-1 items-start gap-y-10 sm:grid-cols-3 sm:gap-x-6 md:gap-x-8 md:gap-y-4">
              {columnLinks.map((column, index) => (
                <div key={index} className="flex flex-col items-start justify-start">
                  <h2 style={{color:"#027A48"} } className="mb-3 font-semibold md:mb-4">{column.title}</h2>
                  <ul>
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="py-2 text-sm">
                        <Link href={link.url} className="flex items-center gap-3">
                          {link.icon && <span>{link.icon}</span>}
                          <span>{link.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-black" />
          <div className="flex flex-col-reverse items-start justify-between pb-4 pt-6 text-sm md:flex-row md:items-center md:pb-0 md:pt-8">
            <p className="mt-6 md:mt-0">{footerText}</p>
            {/* <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
              {footerLinks.map((link, index) => (
                <li key={index} className="underline">
                  <a href={link.url}>{link.title}</a>
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </div>

    </footer>
  );
};

export const Footer1Defaults: Props = {
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
    By subscribing you agree to with our
    <a href='#' class='underline'>Privacy Policy</a>
    and provide consent to receive updates from our company.
  </p>
  `,

  column: [
    {
      title: "Column 1",
      text: ["Text 1", "Text 2"],
    },
    {
      title: "Column 2",
      text: ["Text 3", "Text 4"],
    },
  ],
  columnLinks: [
    {
      title: "Páginas",
      links: [
        { title: "Home", url: "/home" },
        { title: "Empresa", url: "/sobrenos" },
        { title: "Serviços", url: "/servicos" },
        { title: "Obras realizadas", url: "/portifolio" },
        { title: "Contato", url: "/contato" },
      ],
    },
    {
      title: "Contatos",
      links: [
        { title:"Rua Tupi, 05 - Valparaíso - Sto. André - SP", url: "https://www.google.com/maps/search/Rua+Tupi,+05+-+Valpara%C3%ADso+-+Sto.+Andr%C3%A9+-+SP/@-23.6673797,-46.546769,16z/data=!3m1!4b1?authuser=0&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" },
        { title:"(11) 4319-7888", url: "https://www.google.com/search?q=(11)+4319-7888&oq=(11)+4319-7888&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDEzMDhqMGo0qAIAsAIA&sourceid=chrome&ie=UTF-8#" },
        { title:"comercial@proengg.com.br", url: "mailto:comercial@proengg.com.br" },
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
        { title: "Whatsapp", url: "https://wa.me/551143197888?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços!", icon: <BiLogoWhatsapp className="size-6" /> },
      ],
    },
  ],
  footerLinks: [
    { title: "Política de Privacidade", url: "#" },
    { title: "Termos de Serviço", url: "#" },
    { title: "Configurações de Cookies", url: "#" },
  ],
  footerText: "© 2025 Proeng. Todos os direitos reservados.",
};