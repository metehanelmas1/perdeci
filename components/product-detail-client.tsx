"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Ruler, Package, Shield, Truck } from "lucide-react"

const allProducts = [
  {
    id: 1,
    name: "Modern Stor Perde",
    category: "Stor Perde",
    price: 450,
    images: [
      "/modern-roller-blinds-in-minimalist-room.jpg",
      "/modern-room-with-roller-blinds-installed.jpg",
      "/premium-roller-blinds-beige-color.jpg",
    ],
    description:
      "Modern ve minimalist tasarıma sahip stor perdelerimiz, yaşam alanlarınıza şıklık katar. Yüksek kaliteli kumaş yapısı sayesinde uzun ömürlüdür ve kolay temizlenir.",
    features: [
      "Işık geçirgenliği ayarlanabilir",
      "Kolay montaj sistemi",
      "UV koruma özelliği",
      "Makine yıkanabilir",
      "5 yıl garanti",
    ],
    colors: ["Beyaz", "Bej", "Gri", "Kahverengi"],
    specifications: {
      malzeme: "100% Polyester",
      genislik: "120-300 cm arası ölçülebilir",
      yukseklik: "150-280 cm arası ölçülebilir",
      bakim: "Islak bezle silinebilir",
    },
  },
  {
    id: 2,
    name: "Zarif Tül Perde",
    category: "Tül Perde",
    price: 320,
    images: [
      "/elegant-sheer-curtains-in-bright-living-room.jpg",
      "/elegant-living-room-with-sheer-curtains.jpg",
      "/luxury-white-sheer-curtain-fabric-close-up.jpg",
    ],
    description:
      "Zarif tül perdelerimiz, odanıza doğal ışık alırken gizlilik sağlar. İnce dokusu ve hafif yapısı ile mekanlara ferahlık katar.",
    features: ["Hafif ve şeffaf yapı", "Doğal ışık geçişi", "Zarif görünüm", "Kolay bakım", "3 yıl garanti"],
    colors: ["Beyaz", "Krem", "Bej"],
    specifications: {
      malzeme: "Polyester Tül",
      genislik: "150-400 cm arası ölçülebilir",
      yukseklik: "200-300 cm arası ölçülebilir",
      bakim: "Hassas yıkama programı",
    },
  },
  {
    id: 3,
    name: "Zebra Perde - Gri",
    category: "Zebra Perde",
    images: [
      "/modern-gray-zebra-blinds-in-office.jpg",
      "/modern-office-with-zebra-blinds.jpg",
      "/zebra-blinds-dual-layer-window-treatment.jpg",
    ],
    description:
      "Çift katmanlı zebra perdeler, ışık kontrolü için mükemmel bir çözüm sunar. Şık gri tonları ile modern ofis ve yaşam alanlarına uyum sağlar.",
    features: [
      "İki katmanlı sistem",
      "Ayarlanabilir ışık kontrolü",
      "Modern tasarım",
      "Kolay kullanım",
      "4 yıl garanti",
    ],
    colors: ["Gri", "Beyaz", "Bej", "Antrasit"],
    specifications: {
      malzeme: "Polyester ve Şeffaf Şerit",
      genislik: "100-280 cm arası ölçülebilir",
      yukseklik: "150-260 cm arası ölçülebilir",
      bakim: "Islak bez ile silinebilir",
    },
  },
  {
    id: 4,
    name: "Blackout Perde - Bej",
    category: "Blackout Perde",
    images: [
      "/elegant-velvet-blackout-curtains-beige.jpg",
      "/elegant-bedroom-with-blackout-curtains.jpg",
      "/modern-living-room-with-elegant-beige-curtains-and.jpg",
    ],
    description:
      "Premium kadife blackout perdelerimiz, tamamen karartma özelliği ile yatak odaları için ideal. Zarif bej rengi ile lüks bir ambiyans yaratır.",
    features: ["%100 ışık engelleme", "Ses yalıtımı", "Isı yalıtımı", "Kadife kumaş dokusu", "5 yıl garanti"],
    colors: ["Bej", "Kahverengi", "Lacivert", "Bordo"],
    specifications: {
      malzeme: "Kadife + Blackout Astarlı",
      genislik: "140-350 cm arası ölçülebilir",
      yukseklik: "200-300 cm arası ölçülebilir",
      bakim: "Kuru temizleme önerilir",
    },
  },
  {
    id: 5,
    name: "Klasik Tül",
    category: "Tül Perde",
    images: [
      "/luxury-white-sheer-curtain-fabric-close-up.jpg",
      "/bright-room-with-white-sheer-curtains.jpg",
      "/elegant-sheer-curtains-in-bright-living-room.jpg",
    ],
    description:
      "Klasik beyaz tül perdeler, zarafet ve sadeliğin mükemmel uyumunu sunar. Her mekan için uygun olan zamansız bir tasarım.",
    features: ["Premium tül kumaş", "Hafif ve havadar", "Doğal ışık geçişi", "Çok yönlü kullanım", "3 yıl garanti"],
    colors: ["Beyaz", "Ekru", "Krem"],
    specifications: {
      malzeme: "İnce Polyester Tül",
      genislik: "200-500 cm arası ölçülebilir",
      yukseklik: "220-320 cm arası ölçülebilir",
      bakim: "El ile yıkama veya hassas program",
    },
  },
  {
    id: 6,
    name: "Premium Stor",
    category: "Stor Perde",
    images: [
      "/premium-roller-blinds-beige-color.jpg",
      "/modern-living-room-with-premium-roller-blinds.jpg",
      "/modern-roller-blinds-in-minimalist-room.jpg",
    ],
    description:
      "Premium kalite stor perdelerimiz, üstün kumaş yapısı ve sessiz mekanizma ile öne çıkar. Modern yaşam alanları için mükemmel.",
    features: [
      "Sessiz açılır/kapanır mekanizma",
      "Premium kumaş kalitesi",
      "Uzun ömürlü",
      "Kolay temizlik",
      "5 yıl garanti",
    ],
    colors: ["Bej", "Beyaz", "Gri", "Krem"],
    specifications: {
      malzeme: "Yüksek Yoğunluklu Polyester",
      genislik: "120-300 cm arası ölçülebilir",
      yukseklik: "150-280 cm arası ölçülebilir",
      bakim: "Nemli bezle silinebilir",
    },
  },
  {
    id: 7,
    name: "Çiçek Desenli Perde",
    category: "Stor Perde",
    images: [
      "/floral-pattern-curtain-fabric.jpg",
      "/cozy-room-with-floral-curtains.jpg",
      "/modern-roller-blinds-in-minimalist-room.jpg",
    ],
    description:
      "Zarif çiçek desenleri ile dikkat çeken stor perdelerimiz, mekanlarınıza doğallık ve canlılık katar. Klasik ve modern dekorasyona uyum sağlar.",
    features: [
      "El çizimi çiçek desenleri",
      "Solmayan renkler",
      "Dekoratif görünüm",
      "Işık filtreleme",
      "4 yıl garanti",
    ],
    colors: ["Çok Renkli", "Pastel Tonlar", "Doğal Renkler"],
    specifications: {
      malzeme: "Desenli Polyester Kumaş",
      genislik: "130-280 cm arası ölçülebilir",
      yukseklik: "160-270 cm arası ölçülebilir",
      bakim: "Hassas yıkama",
    },
  },
  {
    id: 8,
    name: "Minimalist Zebra",
    category: "Zebra Perde",
    images: [
      "/zebra-blinds-dual-layer-window-treatment.jpg",
      "/minimalist-room-with-zebra-blinds.jpg",
      "/modern-gray-zebra-blinds-in-office.jpg",
    ],
    description:
      "Minimalist tasarım anlayışıyla hazırlanan zebra perdelerimiz, sadelik ve fonksiyonelliği bir araya getirir. Modern ofis ve evler için ideal.",
    features: ["Minimalist tasarım", "Hassas ışık kontrolü", "Kolay montaj", "Dayanıklı mekanizma", "4 yıl garanti"],
    colors: ["Beyaz", "Gri", "Krem"],
    specifications: {
      malzeme: "Çift Katmanlı Polyester",
      genislik: "100-280 cm arası ölçülebilir",
      yukseklik: "150-260 cm arası ölçülebilir",
      bakim: "Nemli bez ile temizleme",
    },
  },
]

interface ProductDetailClientProps {
  productId: string
}

export function ProductDetailClient({ productId }: ProductDetailClientProps) {
  console.log("[v0] productId received:", productId, "type:", typeof productId)
  const numericId = Number.parseInt(productId)
  console.log("[v0] numericId:", numericId)

  const product = allProducts.find((p) => {
    console.log("[v0] Checking product id:", p.id, "against:", numericId)
    return p.id === numericId
  })

  console.log("[v0] Found product:", product)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!product) {
    return (
      <main className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Ürün Bulunamadı</h1>
          <Link href="/urunler" className="text-accent hover:underline">
            Ürünlere Dön
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Ana Sayfa
          </Link>
          <span>/</span>
          <Link href="/urunler" className="hover:text-foreground transition-colors">
            Ürünler
          </Link>
          <span>/</span>
          <span className="text-foreground truncate">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-muted">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
              >
                <Heart
                  className={`h-5 w-5 sm:h-6 sm:w-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-md sm:rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-accent" : "border-border hover:border-accent/50"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs sm:text-sm text-accent mb-2">{product.category}</p>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3 sm:mb-4">{product.name}</h1>
            <p className="text-xs sm:text-sm text-accent font-medium mb-4 sm:mb-6">
              Özel Fiyat Teklifi İçin İletişime Geçin
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8">
              {product.description}
            </p>

            <div className="mb-6 sm:mb-8">
              <h3 className="font-medium text-sm sm:text-base text-foreground mb-3 sm:mb-4">Renk Seçimi</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(index)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 text-sm border-2 rounded-lg transition-all ${
                      selectedColor === index
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border text-foreground hover:border-accent/50"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
              <button className="flex-1 bg-accent text-accent-foreground py-3 sm:py-4 rounded-lg text-sm sm:text-base font-medium hover:bg-accent/90 transition-colors">
                Teklif Al
              </button>
              <button className="flex-1 sm:flex-none sm:px-6 py-3 sm:py-4 border-2 border-accent text-accent rounded-lg text-sm sm:text-base font-medium hover:bg-accent/10 transition-colors">
                Ücretsiz Ölçü
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-muted rounded-lg">
                <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">Ücretsiz Kargo</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-muted rounded-lg">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">Garanti</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-muted rounded-lg">
                <Ruler className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">Ölçü Alınır</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-muted rounded-lg">
                <Package className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground">Montaj</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 sm:pt-12">
          <div className="max-w-4xl">
            <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4 sm:mb-6">Ürün Özellikleri</h2>
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-4 sm:mb-6">Teknik Özellikler</h2>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="p-3 sm:p-4 bg-muted rounded-lg">
                  <p className="text-xs sm:text-sm text-muted-foreground capitalize mb-1">{key}</p>
                  <p className="text-sm sm:text-base text-foreground font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
