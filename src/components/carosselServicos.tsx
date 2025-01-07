"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Estilos básicos do React Slick
import "slick-carousel/slick/slick-theme.css"; // Estilos adicionais do tema

const HeroCarousel: React.FC = () => {
  const settings = {
    dots: true, // Mostra os pontos de navegação
    infinite: true, // Permite o loop infinito das imagens
    speed: 400, // Velocidade da transição (em milissegundos)
    slidesToShow: 1, // Quantidade de slides visíveis
    slidesToScroll: 1, // Quantidade de slides que rolam por vez
    autoplay: true, // Habilita autoplay
    autoplaySpeed: 3000, // Tempo entre transições automáticas (5 segundos)
    pauseOnHover: false, // Pausa o autoplay quando o mouse está sobre o carrossel
    pauseOnFocus: false, // Pausa o autoplay quando o carrossel está focado
    swipe: true, // Permite que o usuário deslize manualmente
  };

  const images = [
    "/IntroServiços.png",
    "/Estaca Raiz.jpeg",
    "/prediosesolo.png",
    "/rodapecontato.png",
  ];

  return (
    <div className="hero max-w-full mx-auto">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="relative w-full h-[500px]">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
