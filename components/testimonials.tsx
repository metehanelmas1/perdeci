"use client"

import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"

const testimonials = [
  {
    name: "Ayşe Yılmaz",
    location: "İstanbul",
    rating: 5,
    comment:
      "Evimizin görünümü tamamen değişti! Kumaş kalitesi ve işçilik mükemmel. Özellikle ücretsiz keşif hizmeti çok profesyonelce yapıldı.",
    image: "/professional-woman-portrait.jpg",
  },
  {
    name: "Mehmet Kaya",
    location: "Ankara",
    rating: 5,
    comment:
      "Zebra perdeler için araştırma yaparken buldum. Hem fiyat hem kalite açısından çok memnun kaldım. Montaj ekibi de oldukça titizdi.",
    image: "/professional-man-portrait.jpg",
  },
  {
    name: "Zeynep Demir",
    location: "İzmir",
    rating: 5,
    comment:
      "Tül perdeler harika oldu! Danışman arkadaş ev dekorasyonuma uygun modeli seçmemde çok yardımcı oldu. Kesinlikle tavsiye ederim.",
    image: "/smiling-woman-portrait.jpg",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Müşterilerimiz Ne Diyor?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Binlerce mutlu müşterimizden bazılarının deneyimleri
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 lg:p-8 bg-background/80 backdrop-blur border-border/50 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">"{testimonial.comment}"</p>

              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
