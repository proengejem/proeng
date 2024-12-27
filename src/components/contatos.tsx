import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Proeng from "public/ProengLogo.png";

export default function Contatos() {
  return (
    <footer className="w-full bg-white py-8">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-[1fr,auto,auto]">
        {/* Contact Form Section */}
        <div className="space-y-4">
          <Image
            src="/ProengLogo.png"
            alt="Proeng"
            width={170}
            height={80}
            className="mb-4"
          />
          <h3 className="text-green-700">Vamos conversar?</h3>
          <form className="space-y-3">
            <Input
              type="text"
              placeholder="Digite seu nome"
              className="border-gray-300"
            />
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              className="border-gray-300"
            />
            <Textarea
              placeholder="Digite sua mensagem"
              className="min-h-[100px] border-gray-300"
            />
            <Button
              type="submit"
              variant="outline"
              className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
            >
              Enviar
            </Button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="space-y-2">
          <h3 className="text-green-700">Contatos</h3>
          <div className="space-y-1 text-sm">
            <p>Rua Tupi, 05 - Valparaíso - São</p>
            <p>André - SP</p>
            <p>(11) 4315-7888</p>
            <p>comercial@proeng.com.br</p>
            <p>Seg-Sex: 8AM - 6PM</p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="space-y-2">
          <h3 className="text-green-700">Siga-nos</h3>
          <div className="flex flex-col space-y-1 text-sm">
            <Link
              href="#"
              className="flex items-center gap-2 hover:text-green-700"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 hover:text-green-700"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 hover:text-green-700"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 hover:text-green-700"
            >
              <Youtube className="h-4 w-4" />
              Youtube
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="container mx-auto mt-8 flex flex-col items-center justify-between border-t border-gray-200 px-4 pt-4 text-xs text-gray-500 md:flex-row">
        <p>© 2024 Melhorir. Todos os direitos reservados.</p>
        <div className="mt-2 flex space-x-4 md:mt-0">
          <Link href="#" className="hover:text-green-700">
            Política de Privacidade
          </Link>
          <Link href="#" className="hover:text-green-700">
            Termos de Serviço
          </Link>
          <Link href="#" className="hover:text-green-700">
            Configurações de Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
