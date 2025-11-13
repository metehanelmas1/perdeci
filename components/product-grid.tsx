"use client"

import { Heart } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const products = [
  {
    id: 1,
    name: "Modern Stor Perde",
    category: "Stor Perde",
    image: "/modern-roller-blinds-in-minimalist-room.jpg",
    hoverImage: "/modern-room-with-roller-blinds-installed.jpg",
  },
  {
    id: 2,
    name: "Zarif Tül Perde",
    category: "Tül Perde",
    image: "/elegant-sheer-curtains-in-bright-living-room.jpg",
    hoverImage: "/elegant-living-room-with-sheer-curtains.jpg",
  },
  {
    id: 3,
    name: "Zebra Perde - Gri",
    category: "Zebra Perde",
    image: "/modern-gray-zebra-blinds-in-office.jpg",
    hoverImage: "/modern-office-with-zebra-blinds.jpg",
  },
  {
    id: 4,
    name: "Blackout Perde - Bej",
    category: "Blackout Perde",
    image: "/elegant-velvet-blackout-curtains-beige.jpg",
    hoverImage: "/elegant-bedroom-with-blackout-curtains.jpg",
  },
  {
    id: 5,
    name: "Klasik Tül",
    category: "Tül Perde",
    image: "/luxury-white-sheer-curtain-fabric-close-up.jpg",
    hoverImage: "/bright-room-with-white-sheer-curtains.jpg",
  },
  {
    id: 6,
    name: "Premium Stor",
    category: "Stor Perde",
    image: "/premium-roller-blinds-beige-color.jpg",
    hoverImage: "/modern-living-room-with-premium-roller-blinds.jpg",
  },
  {
    id: 7,
    name: "Çiçek Desenli Perde",
    category: "Stor Perde",
    image: "/floral-pattern-curtain-fabric.jpg",
    hoverImage: "/cozy-room-with-floral-curtains.jpg",
  },
  {
    id: 8,
    name: "Minimalist Zebra",
    category: "Zebra Perde",
    image: "/zebra-blinds-dual-layer-window-treatment.jpg",
    hoverImage: "/minimalist-room-with-zebra-blinds.jpg",
  },
]

export function ProductGrid() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const router = useRouter()

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const handleViewDetails = (id: number) => {
    console.log("[v0] Navigating to product:", id)
    router.push(`/urunler/${id}`)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <p className="text-muted-foreground">
          <span className="text-foreground font-medium">{products.length}</span> ürün bulundu
        </p>
        <select className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
          <option>Önerilen</option>
          <option>Fiyat: Düşükten Yükseğe</option>
          <option>Fiyat: Yüksekten Düşüğe</option>
          <option>Yeni Ürünler</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={hoveredProduct === product.id ? product.hoverImage : product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors z-10"
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                  }`}
                />
              </button>
            </div>

            <div className="p-5">
              <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
              <h3 className="font-medium text-foreground mb-3 group-hover:text-accent transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-sm text-accent font-medium">Fiyat Teklifi Al</p>
                <button
                  onClick={() => handleViewDetails(product.id)}
                  className="text-sm text-accent hover:underline cursor-pointer"
                >
                  Detayları Gör
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
