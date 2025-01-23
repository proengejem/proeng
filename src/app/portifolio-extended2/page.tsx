import { ProjectHero2 } from "~/components/ProjectHero2";
import { ProjectGrid } from "~/components/project-grid";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Navbar  from "~/components/navbar";
import { Footer1 }  from "~/components/ui/footer";


export default function Page() {
  return (
    // <main className="min-h-screen bg-gray-100">
          <main className="min-h-screen">

                  <Navbar />
        
      <ProjectHero2 />
      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-800" style={{ color: '#027A48' }}>Outras obras</h2>
        <ProjectGrid />
      </section>

     <Footer1 />
 
    </main>
  );
}