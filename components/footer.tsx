"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, ChevronDown } from "lucide-react"

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <footer className="bg-[#2D2420] text-[#F5E6D3]">
      {/* Main Footer Grid */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: Brand & Social */}
          <div className="space-y-6">
            <h3 className="font-serif text-3xl text-white">Perde Dünyası</h3>
            <p className="text-sm leading-relaxed text-[#C4B5A0]">
              20 yıldır yaşam alanlarınızı güzelleştiriyoruz. Kalite ve estetik her zaman önceliğimiz.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#3D3328] flex items-center justify-center hover:bg-[#8B7355] transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#3D3328] flex items-center justify-center hover:bg-[#8B7355] transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#3D3328] flex items-center justify-center hover:bg-[#8B7355] transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Customer Guides - Mobile Accordion */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection("guides")}
              className="flex justify-between items-center w-full md:pointer-events-none"
            >
              <h4 className="font-semibold text-white text-lg">Müşteri Rehberleri</h4>
              <ChevronDown
                className={`h-5 w-5 md:hidden transition-transform duration-300 ${openSection === "guides" ? "rotate-180" : ""}`}
              />
            </button>
            <ul
              className={`space-y-3 overflow-hidden transition-all duration-300 ${openSection === "guides" || typeof window === "undefined" ? "max-h-96 md:max-h-none" : "max-h-0 md:max-h-none"}`}
            >
              <li>
                <a href="#" className="text-[#C4B5A0] hover:text-white transition-colors duration-300 text-sm">
                  Nasıl Ölçü Alınır?
                </a>
              </li>
              <li>
                <a href="#" className="text-[#C4B5A0] hover:text-white transition-colors duration-300 text-sm">
                  Montaj Rehberleri
                </a>
              </li>
              <li>
                <a href="#" className="text-[#C4B5A0] hover:text-white transition-colors duration-300 text-sm">
                  Temizlik ve Bakım
                </a>
              </li>
              <li>
                <a href="#" className="text-[#C4B5A0] hover:text-white transition-colors duration-300 text-sm">
                  Sıkça Sorulan Sorular
                </a>
              </li>
              <li>
                <a href="#" className="text-[#C4B5A0] hover:text-white transition-colors duration-300 text-sm">
                  Blog / İlham Köşesi
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation - Mobile Accordion */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection("products")}
              className="flex justify-between items-center w-full md:pointer-events-none"
            >
              <h4 className="font-semibold text-white text-lg">Ürünlerimiz</h4>
              <ChevronDown
                className={`h-5 w-5 md:hidden transition-transform duration-300 ${openSection === "products" ? "rotate-180" : ""}`}
              />
            </button>
            <ul
              className={`space-y-3 overflow-hidden transition-all duration-300 ${openSection === "products" || typeof window === "undefined" ? "max-h-96 md:max-h-none" : "max-h-0 md:max-h-none"}`}
            >
              <li>
                <a href="#" className="text-[#C4B5A0] hover:text-white transition-colors duration-300 text-sm">
                  Stor Perdeler
                </a>
              </li>
              <li>
                <a href="#" className="text-[#C4B5A0] hover:text-white transition-colors duration-300 text-sm">
                  Tül Perdeler
                </a>
              </li>
              <li>
                <a href="#" className="text-[#C4B5A0] hover:text-white transition-colors duration-300 text-sm">
                  Fon Perdeler
                </a>
              </li>
              <li>
                <a href="#" className="text-[#C4B5A0] hover:text-white transition-colors duration-300 text-sm">
                  Zebra Perdeler
                </a>
              </li>
              <li>
                <a href="#" className="text-[#C4B5A0] hover:text-white transition-colors duration-300 text-sm">
                  Perde Aksesuarları
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Corporate */}
          <div className="space-y-6">
            <h4 className="font-semibold text-white text-lg">İletişim</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="flex items-start gap-3 text-[#C4B5A0] hover:text-white transition-colors duration-300 group"
                >
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Atatürk Cad. No:123, Merkez, İstanbul</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+905551234567"
                  className="flex items-center gap-3 text-[#C4B5A0] hover:text-white transition-colors duration-300 group"
                >
                  <Phone className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">0(555) 123 45 67</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@perdedunyasi.com"
                  className="flex items-center gap-3 text-[#C4B5A0] hover:text-white transition-colors duration-300 group"
                >
                  <Mail className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">info@perdedunyasi.com</span>
                </a>
              </li>
            </ul>
            <div className="pt-4 border-t border-[#3D3328]">
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#C4B5A0] hover:text-white transition-colors duration-300 text-sm">
                    Hakkımızda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#C4B5A0] hover:text-white transition-colors duration-300 text-sm">
                    Kariyer
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#3D3328] bg-[#1F1A16]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-[#C4B5A0]">© 2025 Perde Dünyası. Tüm hakları saklıdır.</p>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#C4B5A0]">Güvenli Ödeme:</span>
              <div className="flex items-center gap-2 opacity-60">
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-semibold text-blue-600">VISA</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-semibold text-orange-600">Mastercard</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-xs font-semibold text-red-600">TROY</span>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <a href="#" className="text-[#C4B5A0] hover:text-white transition-colors duration-300">
                Gizlilik Politikası
              </a>
              <span className="text-[#3D3328]">|</span>
              <a href="#" className="text-[#C4B5A0] hover:text-white transition-colors duration-300">
                Kullanım Koşulları
              </a>
              <span className="text-[#3D3328]">|</span>
              <a href="#" className="text-[#C4B5A0] hover:text-white transition-colors duration-300">
                Çerez Politikası
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
