"use client";
import Image from "next/image";
import Link from "next/link";
import Numero from "~/components/numeros";
import React from "react";
import Portifolio from "~/components/portifolio";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Portifolio2 from "~/components/portifolio2";
import Portifolio3 from "~/components/portifolio3";
import Contatos from "~/components/contatos";

export default function Sobrenos() {
  return (
    <>
      <Portifolio />
      <Portifolio2 />
      <Portifolio3 />
      <Contatos />
    </>
  );
}
