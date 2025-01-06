"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Navbar() {
    // Estado para controlar o menu
    const [menuOpen, setMenuOpen] = useState(false);

    // Alternar o estado do menu
    const toggleMenu = () => setMenuOpen(!menuOpen);
{/* Navigation */}
return(
  // <header className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm">
  <header className="bg-white shadow-sm">
  <nav className="container mx-auto flex items-center justify-between px-2 py-1">
    <Image
      src="/ProengLogo.png"
      alt="Proeng Engenharia"
      width={400}
      height={350}
      className="mb-6"
    />
            {/* Links de navegação - visíveis em telas maiores */}

    <div className="hidden items-center gap-6 text-lg md:flex">
      <a href="/home" className="text-gray-600 hover:text-[#006837]">
        Home
      </a>
      <a href="/sobrenos" className="text-gray-600 hover:text-[#006837]">
        Empresa
      </a>
      <a href="/servicos" className="text-gray-600 hover:text-[#006837]" >
        Serviços
      </a>
      <a href="/portifolio" className="text-gray-600 hover:text-[#006837]">
        Obras realizadas
      </a>
      <a href="/contato" className="text-gray-600 hover:text-[#006837]">
        Contato
      </a>
    </div>
            {/* Ícone do menu - visível em telas menores */}

    <div 
    className="cursor-pointer md:hidden"
    onClick={toggleMenu} // Alternar o menu ao clicar
    >
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
        {/* Menu Mobile - visível quando `menuOpen` estiver true */}
        {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-2">
          <a
            href="/home"
            className="block text-gray-600 hover:text-[#006837] py-1"
          >
            Home
          </a>
          <a
            href="/sobrenos"
            className="block text-gray-600 hover:text-[#006837] py-1"
          >
            Empresa
          </a>
          <a
            // href="/servicos"
            href="#"

            className="block text-gray-600 hover:text-[#006837] py-1"
          >
            Serviços
          </a>
          <a
            // href="/portifolio"
            href="#"

            className="block text-gray-600 hover:text-[#006837] py-1"
          >
            Obras realizadas
          </a>
          <a
            href="/contato"
            className="block text-gray-600 hover:text-[#006837] py-1"
          >
            Contato
          </a>
        </div>
      )}
  </header>
)
}

