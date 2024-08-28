import React, { useState, useEffect } from 'react';

// Datos del carrusel
export const dataCarouselTop = [
  {
    id: 1,
    title: "Envío en 24/48 h",
    description: "Como cliente VIP, tus envíos en 24/48 horas. Obtén más información y únete",
    link: "#!"
  },
  {
    id: 2,
    title: "Consigue hasta un -25% en compras superiores a $40",
    description: "−20 % al gastar $100 o −25 % al gastar $150. Usa el código TARREDEV.",
    link: "#",
  },
  {
    id: 3,
    title: "Devoluciones y entregas gratuitas",
    description: "Como cliente, tienes envíos y devoluciones gratis en un plazo de 30 días en todos los pedidos. Obtén más información y únete",
    link: "#",
  },
  {
    id: 4,
    title: "Comprar novedades",
    description: "Todas las novedades al 50% de descuento",
    link: "#",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState(dataCarouselTop);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // Cambiar cada 3 segundos

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 flex flex-col items-center justify-center p-6 bg-gray-200 text-center"
          >
            <h2 className="text-xl font-bold mb-2">{slide.title}</h2>
            <p className="mb-4">{slide.description}</p>
            <a href={slide.link} className="text-blue-500 hover:underline">
              Más información
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

