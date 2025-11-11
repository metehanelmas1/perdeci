import { Waves, Blinds, Grid3x3, Sparkles } from "lucide-react"

const categories = [
  {
    id: 1,
    title: "Stor Perdeler",
    description: "Modern ve fonksiyonel stor perdelerde geniş renk seçenekleri",
    icon: Blinds,
    image: "/modern-roller-blinds-in-minimalist-room.jpg",
  },
  {
    id: 2,
    title: "Tül Perdeler",
    description: "Zarif ve şık tül perdelerle mekanlarınıza ışık getirin",
    icon: Waves,
    image: "/elegant-sheer-curtains-in-bright-living-room.jpg",
  },
  {
    id: 3,
    title: "Zebra Perdeler",
    description: "İki katmanlı zebra perdelerle ışık kontrolünün keyfini çıkarın",
    icon: Grid3x3,
    image: "/zebra-blinds-dual-layer-window-treatment.jpg",
  },
  {
    id: 4,
    title: "Aksesuarlar",
    description: "Perdelerinizi tamamlayan şık aksesuar ve bağlama detayları",
    icon: Sparkles,
    image: "/luxury-curtain-accessories-and-tiebacks.jpg",
  },
]

export function ProductCategories() {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">Ürün Kategorileri</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            İhtiyacınıza uygun perde çözümlerini keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <div
                key={category.id}
                className="group relative overflow-hidden bg-card rounded-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6 text-primary-foreground">
                  <div className="mb-4 transform transition-transform group-hover:scale-110">
                    <IconComponent className="w-10 h-10" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl mb-2">{category.title}</h3>
                  <p className="text-sm text-primary-foreground/90 leading-relaxed">{category.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
