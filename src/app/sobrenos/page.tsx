"use client";
import Image from "next/image";
import Link from "next/link";
import Numero from "~/components/numeros";
import React from "react";
import Carossel from "~/components/carossel";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Sobrenos() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="fixed left-0 right-0 top-0 z-50 bg-white/95 shadow-sm">
        <nav className="container mx-auto flex items-center justify-between px-4 py-3">
          <Image
            src="/ProengLogo.png"
            alt="Proeng Engenharia"
            width={150}
            height={50}
            className="mb-6"
          />
          <div className="hidden items-center gap-6 text-sm md:flex">
            <Link href="/" className="text-gray-600 hover:text-[#006837]">
              Home
            </Link>
            <Link
              href="/empresa"
              className="text-gray-600 hover:text-[#006837]"
            >
              Empresa
            </Link>
            <Link
              href="/servicos"
              className="text-gray-600 hover:text-[#006837]"
            >
              Serviços
            </Link>
            <Link
              href="/contato"
              className="text-gray-600 hover:text-[#006837]"
            >
              Contato
            </Link>
            <Link href="/obras" className="text-gray-600 hover:text-[#006837]">
              Obras realizadas
            </Link>
            <Link href="/social" className="text-gray-600 hover:text-[#006837]">
              Redes Sociais
            </Link>
          </div>
          <div className="cursor-pointer md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </nav>
      </header>
      <div className="flex min-h-screen flex-col">
        {/* Green header */}
        <div className="h-12 w-full bg-[#0B4D2C]" />
        <div
          className="relative flex flex-1 items-center justify-end text-right"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1)), url('/fundosobrenos.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto px-4 py-20">
            <div className="ml-auto max-w-2xl">
              <h2 className="mb-4 text-4xl font-light text-white md:text-5xl">
                Desde{" "}
                <span className="text-5xl text-[#006241] md:text-6xl">
                  2006
                </span>
              </h2>
              <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                Construindo qualidade e confiança
                <br />
                No mercado da engenharia
              </h1>
            </div>
          </div>
        </div>
        {/* Main content */}
        <div className="relative flex flex-grow flex-col md:flex-row">
          {/* Background pattern */}
          <div className="absolute inset-0 overflow-hidden bg-[#3a4558]" />
          {/* Content container */}
          <div className="relative flex w-full flex-col items-center gap-8 bg-[#2A3444] bg-opacity-90 p-8 md:flex-row md:p-16">
            {/* Text content */}
            <div className="flex-1 space-y-6 text-white">
              <p className="text-lg leading-relaxed">
                A Proving Geotecnia é uma empresa de engenharia especializada na
                execução de obras de contenções, fundações, drenagem e
                tratamento de solos. Ingressou no mercado em maio de 2006 e já
                realizou mais de 1.500 obras até o presente momento.
              </p>
              <p className="text-lg leading-relaxed">
                A empresa se preocupa em manter-se atualizada, desenvolvendo
                novos metodologias e aprimorando as técnicas atualmente
                aplicadas nos serviços prestados, além de apoiar pesquisas
                incentivando trabalhos acadêmicos e científicos em nível de
                graduação, dissertações de mestrado e teses de doutorado,
                permitindo sua participação em trabalhos importantes.
              </p>
            </div>
            {/* Image */}
            <div className="max-w-md flex-1">
              <Image
                src="/trator.png"
                alt="Engineering equipment"
                width={500}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
        {/* Partners Section */}

        <div className="w-full bg-gray-200 p-4">
          <Carossel />
        </div>
      </div>
      {/* Stats Section */}
      <div className="relative flex min-h-[400px] w-full items-center bg-[#004d2e]">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('/placeholder.svg')`,
            backgroundBlendMode: "multiply",
          }}
        />
        {/* Content */}
        <div className="container relative z-10 mx-auto px-4">
          <h2 className="mb-16 text-center text-4xl font-bold text-white">
            NÚMEROS
          </h2>
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-6xl font-bold text-white">
                <Numero n={1500} />
              </div>
              <div className="text-xl uppercase text-white">
                Obras Realizadas
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-6xl font-bold text-white">
                <Numero n={13} />
              </div>
              <div className="text-xl uppercase text-white">
                Anos de Experiência
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full">
        {/* Additional content omitted for brevity */}
        {/* Values Section */}
        <div className="w-full bg-white px-4 py-12">
          <div className="container mx-auto">
            <h2 className="mb-6 text-2xl font-bold">Valores</h2>
            <p className="mb-12 max-w-3xl text-gray-600">
              Nossa equipe também conta com a expertise de profissionais
              capacitados e bem treinados, procurando sempre atualizar seus
              padrões de excelência, com qualidade e seriedade nos trabalhos
              executados, oferecendo atendimento personalizado, competitividade
              e transparência nos negociações, mantendo-nos tecnicamente e
              eticamente constantes fazem da Proeng uma empresa diferenciada no
              mercado.
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 text-green-700">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-green-700">Excelência</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 text-green-700">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-green-700">Seriedade</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 text-green-700">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-green-700">
                    Atendimento Personalizado
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 text-green-700">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-green-700">
                    Transparência
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal Divider */}
        <div className="relative h-16 w-full bg-white">
          <div className="clip-path-diagonal absolute bottom-0 h-16 w-full bg-green-800" />
        </div>

        {/* Footer Content */}
        <div className="bg-green-800 px-4 py-12 text-white">
          <div className="container mx-auto grid gap-8 md:grid-cols-12">
            {/* Contact Form */}
            <div className="md:col-span-4">
              <Image
                src="/placeholder.svg"
                alt="Proeng Engenharia"
                width={150}
                height={50}
                className="mb-6"
              />
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  className="w-full rounded border border-gray-300 p-2 text-gray-900"
                />
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  className="w-full rounded border border-gray-300 p-2 text-gray-900"
                />
                <textarea
                  placeholder="Digite sua mensagem"
                  rows={4}
                  className="w-full rounded border border-gray-300 p-2 text-gray-900"
                />
              </form>
            </div>

            {/* Links Columns */}
            <div className="grid gap-8 md:col-span-6 md:grid-cols-3">
              <div>
                <h4 className="mb-4 font-semibold">Endereço</h4>
                <ul className="space-y-2 text-sm">
                  <li>Link Um</li>
                  <li>Link Dois</li>
                  <li>Link Três</li>
                  <li>Link Quatro</li>
                  <li>Link Cinco</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 font-semibold">Outros Links</h4>
                <ul className="space-y-2 text-sm">
                  <li>Link Seis</li>
                  <li>Link Sete</li>
                  <li>Link Oito</li>
                  <li>Link Nove</li>
                  <li>Link Dez</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 font-semibold">Siga-nos</h4>
                <div className="space-y-4">
                  <Link href="#" className="flex items-center gap-2">
                    <FaFacebook size={20} />
                    Facebook
                  </Link>
                  <Link href="#" className="flex items-center gap-2">
                    <FaInstagram size={20} />
                    Instagram
                  </Link>
                  <Link href="#" className="flex items-center gap-2">
                    <FaLinkedin size={20} />
                    LinkedIn
                  </Link>
                  <Link href="#" className="flex items-center gap-2">
                    <FaYoutube size={20} />
                    YouTube
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 bg-green-800 px-4 py-4 text-sm text-white">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
            <p>© 2024 Proeng. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <Link href="#">Política de Privacidade</Link>
              <Link href="#">Termos de Serviço</Link>
              <Link href="#">Configurações de Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
