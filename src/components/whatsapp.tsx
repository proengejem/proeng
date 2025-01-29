"use client";

import React from 'react';
import { BiLogoWhatsapp } from 'react-icons/bi';

export default function WhatsAppIcon() {
  return (
    <div className="whatsapp-container">
      <a
        href="https://wa.me/551143197888?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços!"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-icon"
      >
        <BiLogoWhatsapp className="whatsapp-logo white size-6"  />
      </a>
      <style jsx>{`
        .whatsapp-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }

        .whatsapp-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 60px; 
          height: 60px; 
          background-color: #027a48; 
          border-radius: 50%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .whatsapp-icon:hover {
          background-color: #28a745; 
        }

        .whatsapp-logo {
          color: white; 
          font-size: 40px;
                  }
      `}</style>
    </div>
  );
}