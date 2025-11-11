"use client"

import { Ruler, Palette, Truck } from "lucide-react"

const steps = [
  {
    icon: Ruler,
    number: "01",
    title: "Ölçü Al",
    description: "Profesyonel ekibimiz ücretsiz keşif ile evinize gelir ve detaylı ölçüm yapar.",
  },
  {
    icon: Palette,
    number: "02",
    title: "Model Seç",
    description: "Geniş kumaş ve model koleksiyonumuzdan size en uygun seçenekleri belirleriz.",
  },
  {
    icon: Truck,
    number: "03",
    title: "Sipariş Ver",
    description: "Özel üretim perdeleriniz hazırlanır ve profesyonel montaj ile teslim edilir.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Nasıl Çalışır?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hayalinizdeki perdelere 3 basit adımda ulaşın
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative group">
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center border border-accent/20 group-hover:border-accent/40 transition-all duration-300">
                      <Icon className="w-10 h-10 text-accent" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-serif text-lg font-semibold">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-accent/40 to-transparent" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
