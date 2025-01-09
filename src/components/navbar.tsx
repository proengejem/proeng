"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";


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
  {/* <nav className="container mx-auto flex flex-col items-center px-4 py-2 md:flex-row"> */}

    <Image
      src="/ProengLogo.png"
      alt="Proeng Engenharia"
      width={400}
      height={350}
      className="mb-6"
    />
            {/* Links de navegação - visíveis em telas maiores */}
    <div className="hidden items-center gap-6 text-lg md:flex">
    {/* text-4xl md:text-6xl font-bold leading-tight text-white */}
    {/* <div className="hidden justify-center items-center space-x-10 text-lg md:flex"> */}
    <Link href="/home" className="  text-[#006837] font-bold leading-tight hover:text-green-500">
        Home
      </Link >
      <Link  href="/sobrenos" className="text-[#006837] font-bold leading-tight hover:text-green-500">
        Empresa
      </Link >
      <Link  href="/servicos" className="text-[#006837] font-bold leading-tight hover:text-green-500" >
        Serviços
      </Link >
      <Link  href="/portifolio" className="text-[#006837] font-bold leading-tight hover:text-green-500">
        Obras realizadas
      </Link >
      {/* <a href="/contato" className="text-gray-600 hover:text-[#006837]"> */}
      <Link  href="/contato" className="text-[#006837] font-bold leading-tight hover:text-green-500" >
        Contato
      </Link >
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
          <Link 
            href="/home"
            className="block text-[#006837] hover:text-green-500 py-1"
          >
            Home
          </Link >
          <Link 
            href="/sobrenos"
            className="block text-[#006837] hover:text-green-500 py-1"
          >
            Empresa
          </Link >
          <Link 
            // href="/servicos"
            href="#"

            className="block text-[#006837] hover:text-green-500 py-1"
          >
            Serviços
          </Link >
          <Link 
            // href="/portifolio"
            href="#"

            className="block text-[#006837] hover:text-green-500 py-1"
          >
            Obras realizadas
          </Link >
          <Link 
            href="/contato"
            className="block text-[#006837] hover:text-green-500 py-1"
          >
            Contato
          </Link >
        </div>
      )}
  </header>
)
}

