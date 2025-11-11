"use client"

import { MapPin, Wrench, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: MapPin,
    title: "Ücretsiz Keşif",
    description: "Profesyonel ekibimiz evinize gelerek detaylı ölçüm yapar ve size en uygun çözümleri sunar.",
    features: ["Ücretsiz ölçüm", "Kumaş örnekleri", "Tasarım danışmanlığı"],
  },
  {
    icon: Wrench,
    title: "Profesyonel Montaj",
    description: "Deneyimli montaj ekibimiz perdelerinizi titizlikle yerleştirir ve mükemmel bir görünüm sağlar.",
    features: ["Garantili montaj", "Temiz iş alanı", "Hızlı kurulum"],
  },
  {
    icon: Clock,
    title: "Hızlı Teslimat",
    description: "Siparişiniz özenle hazırlanır ve belirlenen tarihte eksiksiz olarak teslim edilir.",
    features: ["7-14 gün teslimat", "Takip sistemi", "Zamanında teslim"],
  },
  {
    icon: Phone,
    title: "7/24 Destek",
    description: "Satış sonrası hizmetlerimizle her zaman yanınızdayız. Sorularınız için bize ulaşabilirsiniz.",
    features: ["Müşteri desteği", "Bakım önerileri", "Garanti hizmeti"],
  },
]

export function Services() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/5 to-background" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium tracking-wider uppercase text-accent">Neden Bizi Seçmelisiniz</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-foreground mb-6 text-balance">
            Size Özel <span className="text-accent">Profesyonel</span> Hizmetler
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Keşiften montaja kadar her adımda yanınızdayız
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="relative group">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Card content */}
                <div className="relative h-full p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  {/* Icon with animated background */}
                  <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-8 h-8 text-accent" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-2xl text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>

                  {/* Features with elegant styling */}
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover/item:scale-150 transition-transform duration-300" />
                        <span className="group-hover/item:text-foreground transition-colors duration-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="text-lg px-12 py-6 rounded-full shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:scale-105 transition-all duration-300"
          >
            Ücretsiz Keşif Talep Et
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Hemen arayın: <span className="text-accent font-medium">0850 123 45 67</span>
          </p>
        </div>
      </div>
    </section>
  )
}
