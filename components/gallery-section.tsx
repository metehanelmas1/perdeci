"use client"

import { useState } from "react"
import Image from "next/image"

const categories = ["Tümü", "Modern Salonlar", "Minimalist Yatak Odaları", "Şık Mutfaklar", "Önce / Sonra"]

const galleryItems = [
  {
    id: 1,
    category: "Modern Salonlar",
    image: "/modern-living-room-with-elegant-beige-curtains-and.jpg",
    title: "Modern Salon Tasarımı",
    description: "Bej tonlarında stor perdeler",
  },
  {
    id: 2,
    category: "Minimalist Yatak Odaları",
    image: "/luxury-bedroom-with-floor-to-ceiling-drapes-and-so.jpg",
    title: "Minimalist Yatak Odası",
    description: "Blackout perdeler ile mükemmel karartma",
  },
  {
    id: 3,
    category: "Modern Salonlar",
    image: "/minimalist-interior-with-modern-sheer-curtains-and.jpg",
    title: "Şık Salon Dekorasyonu",
    description: "Tül perdeler ile aydınlık mekan",
  },
  {
    id: 4,
    category: "Şık Mutfaklar",
    image: "/modern-kitchen-with-elegant-curtains.jpg",
    title: "Modern Mutfak",
    description: "Praktik stor perdeler",
  },
  {
    id: 5,
    category: "Minimalist Yatak Odaları",
    image: "/elegant-bedroom-with-blackout-curtains.jpg",
    title: "Lüks Yatak Odası",
    description: "Kadife dokulu blackout perdeler",
  },
  {
    id: 6,
    category: "Modern Salonlar",
    image: "/contemporary-living-room-with-zebra-blinds.jpg",
    title: "Çağdaş Salon",
    description: "Zebra perdeler ile modern çözüm",
  },
  {
    id: 7,
    category: "Önce / Sonra",
    image: "/before-and-after-curtain-installation-transformati.jpg",
    title: "Dönüşüm Projesi",
    description: "Salon yenileme projesi",
  },
  {
    id: 8,
    category: "Şık Mutfaklar",
    image: "/bright-kitchen-with-modern-window-treatments.jpg",
    title: "Aydınlık Mutfak",
    description: "Işık geçiren stor perdeler",
  },
]

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü")

  const filteredItems =
    selectedCategory === "Tümü" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-accent text-accent-foreground shadow-md"
                : "bg-card text-muted-foreground hover:bg-muted border border-border"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted cursor-pointer"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-serif text-xl text-white mb-2">{item.title}</h3>
                <p className="text-white/90 text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Before/After Section */}
      {selectedCategory === "Önce / Sonra" && (
        <div className="mt-16 bg-card border border-border rounded-2xl p-8 md:p-12">
          <h2 className="font-serif text-3xl text-foreground text-center mb-8">Dönüşüm Hikayeleri</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image src="/old-room-before-curtain-installation.jpg" alt="Önce" fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-muted-foreground/90 text-white px-4 py-2 rounded-lg font-medium">
                  Önce
                </div>
              </div>
              <p className="text-muted-foreground text-center">Eski ve yıpranmış perdeler</p>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image src="/placeholder.svg?height=400&width=600" alt="Sonra" fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium">
                  Sonra
                </div>
              </div>
              <p className="text-muted-foreground text-center">Modern ve şık yeni perdeler</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
