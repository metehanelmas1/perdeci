"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    image: "/modern-living-room-with-elegant-beige-curtains-and.jpg",
    title: "Zarafet Evinizde",
    subtitle: "Özel tasarım perdelerle mekanlarınızı dönüştürün",
  },
  {
    image: "/luxury-bedroom-with-floor-to-ceiling-drapes-and-so.jpg",
    title: "Lüks ve Konfor",
    subtitle: "Premium kumaşlar ve kusursuz işçilik",
  },
  {
    image: "/minimalist-interior-with-modern-sheer-curtains-and.jpg",
    title: "Modern Tasarım",
    subtitle: "Çağdaş çizgiler, zamansız estetik",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl px-6 text-center">
              <h1 className="font-serif text-5xl text-primary-foreground md:text-7xl lg:text-8xl text-balance mb-6">
                {slide.title}
              </h1>
              <p className="text-xl text-primary-foreground/90 md:text-2xl text-balance mb-8">{slide.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Ürünleri Keşfedin
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Randevu Alın
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-primary-foreground/20 p-3 backdrop-blur-sm transition-all hover:bg-primary-foreground/30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8 text-primary-foreground" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-primary-foreground/20 p-3 backdrop-blur-sm transition-all hover:bg-primary-foreground/30"
        aria-label="Next slide"
      >
        <ChevronRight className="h-8 w-8 text-primary-foreground" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 transition-all ${
              index === currentSlide
                ? "w-12 bg-primary-foreground"
                : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
