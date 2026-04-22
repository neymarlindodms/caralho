import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroBanner1 from "@/assets/hero-frete-brasil.png";
import heroBanner2 from "@/assets/hero-compra-segura.jpg";

const slides = [
  { image: heroBanner1, type: "banner" as const },
  { image: heroBanner2, type: "banner" as const },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1)), []);
  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  return (
    <section
      className="relative overflow-hidden bg-primary"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full-width banner */}
      <div className="relative w-full h-[280px] sm:h-[360px] md:h-[480px] lg:h-[560px]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {slide.type === "banner" ? (
              <img
                src={slide.image}
                alt="Colecao Verde Casa"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary flex items-end justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
                <img
                  src={slide.image}
                  alt="Verde Casa"
                  className="relative z-10 h-[85%] w-auto object-contain object-bottom drop-shadow-2xl"
                />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
          </div>
        ))}

      </div>
    </section>
  );
};

export default HeroSection;
