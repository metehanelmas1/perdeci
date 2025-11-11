"use client"

import { Button } from "@/components/ui/button"
import { Phone, FileText } from "lucide-react"

export function PreFooterCTA() {
  return (
    <section className="relative bg-gradient-to-br from-[#8B7355] to-[#6B5744] py-16 md:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, white 2px, white 4px)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 animate-fade-in-up">
            Eviniz için mükemmel perdeyi bulamadınız mı?
          </h2>
          <p className="text-lg md:text-xl text-[#F5E6D3] mb-10 animate-fade-in-up animation-delay-100">
            Uzmanlığımızla size yardımcı olalım. Ücretsiz keşif hizmetimizden faydalanın.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-200">
            <Button
              size="lg"
              className="bg-white text-[#8B7355] hover:bg-[#F5E6D3] transition-all duration-300 text-lg px-8 py-6 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Phone className="mr-2 h-5 w-5" />
              Ücretsiz Keşif Randevusu Al
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#8B7355] transition-all duration-300 text-lg px-8 py-6 hover:scale-105 bg-transparent"
            >
              <FileText className="mr-2 h-5 w-5" />
              Numune Talep Edin
            </Button>
          </div>

          <div className="mt-8 animate-fade-in-up animation-delay-300">
            <a
              href="tel:+905551234567"
              className="inline-flex items-center text-white hover:text-[#F5E6D3] transition-colors duration-300 text-lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              <span>Bizi Arayın: 0(555) 123 45 67</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
