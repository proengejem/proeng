import { ProjectHero } from "~/components/project-hero";
import { ProjectGrid } from "~/components/project-grid";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Navbar  from "~/components/navbar";
import { Footer1 }  from "~/components/ui/footer";


export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100">
          <Navbar />
      
      <section className="relative w-full bg-gray-100">
        {/* Container for the banner */}
        <div className="relative h-[500px] w-full overflow-hidden">
          <Image
            src="/Solo Grampeado.jpeg" // Replace with your actual image path
            alt="Imagem inicial"
            layout="fill"
            objectFit="cover"
            priority
            className="absolute inset-0"
          />
        </div>
       {/* Text section */}
       <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <h1 className="text-3xl md:text-4xl font-medium text-[#027A48]">
          Nome obra 01
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
          eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum
          nulla, ut commodo diam libero vitae erat.
        </p>
      </div>
    </div>
     
      </section>

      {/* Project Hero */}
      <ProjectHero />

      {/* Outras Obras */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-800" style={{ color: '#027A48' }}>Outras obras</h2>
        <ProjectGrid />
      </section>
    <Footer1 />

    </main>
  );
}
