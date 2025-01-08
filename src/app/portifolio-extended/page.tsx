import { ProjectHero } from "~/components/project-hero";
import { ProjectGrid } from "~/components/project-grid";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100">
      <ProjectHero />
      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Outras obras</h2>
        <ProjectGrid />
      </section>

      {/* Footer Content */}
      <div className="bg-green-800 px-4 py-12 text-white">
        <div className="container mx-auto grid gap-8 md:grid-cols-12">
          {/* Contact Form */}
          <div className="md:col-span-4">
            <Image
              src="/ProengLogo.png"
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
    </main>
  );
}
