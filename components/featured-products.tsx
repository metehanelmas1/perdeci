"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Luna Tül Perde",
    category: "Tül Perdeler",
    
    badge: "Yeni Sezon",
    image: "/luxury-white-sheer-curtain-fabric-close-up.jpg",
  },
  {
    id: 2,
    name: "Zenith Zebra Perde",
    category: "Zebra Perdeler",

    badge: "İndirim",
    image: "/modern-gray-zebra-blinds-in-office.jpg",
  },
  {
    id: 3,
    name: "Velvet Blackout",
    category: "Stor Perdeler",
    price: "3.299",
    badge: "Popüler",
    image: "/elegant-velvet-blackout-curtains-beige.jpg",
  },
  {
    id: 4,
    name: "Crystal Tül",
    category: "Tül Perdeler",
    price: "1.699",
    badge: "Trend",
    image: "/delicate-crystal-white-sheer-curtain.jpg",
  },
]

export function FeaturedProducts() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-muted-foreground text-lg">Sezonun en trend ve özel ürünleri</p>
          </div>
          <button className="group flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-sm">
            Tüm Ürünler
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative overflow-hidden bg-muted mb-4 aspect-[3/4] rounded-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {product.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-sm">
                    {product.badge}
                  </div>
                )}

                <div
                  className={`absolute inset-0 bg-primary/10 transition-opacity duration-300 ${
                    hoveredId === product.id ? "opacity-100" : "opacity-0"
                  }`}
                />

                <button
                  className={`absolute bottom-4 left-4 right-4 py-3 bg-primary text-primary-foreground transition-all duration-300 rounded-sm ${
                    hoveredId === product.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  İncele
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-accent uppercase tracking-wider">{product.category}</p>
                <h3 className="font-serif text-xl text-primary">{product.name}</h3>
                <div className="flex items-center gap-3">
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
