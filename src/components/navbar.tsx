"use client";

import Image from "next/image";

export default function Navbar() {

{/* Navigation */}
return(
  <header className="fixed left-0 right-0 top-0 z-50 bg-white/95 shadow-sm">
  <nav className="container mx-auto flex items-center justify-between px-4 py-3">
    <Image
      src="/ProengLogo.png"
      alt="Proeng Engenharia"
      width={100}
      height={150}
      className="mb-6"
    />
    <div className="hidden items-center gap-6 text-sm md:flex">
      <a href="/" className="text-gray-600 hover:text-[#006837]">
        Home
      </a>
      <a href="/empresa" className="text-gray-600 hover:text-[#006837]">
        Empresa
      </a>
      <a href="/servicos" className="text-gray-600 hover:text-[#006837]" >
        Serviços
      </a>
      <a href="/obras" className="text-gray-600 hover:text-[#006837]">
        Obras realizadas
      </a>
      <a href="/contato" className="text-gray-600 hover:text-[#006837]">
        Contato
      </a>
      {/* <a href="/social" className="text-gray-600 hover:text-[#006837]">
        Redes Sociais
      </a> */}
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
)
}

