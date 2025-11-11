"use client"

import { useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl text-foreground tracking-tight">PERDE STUDYO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-accent transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/urunler" className="text-foreground hover:text-accent transition-colors">
              Ürünler
            </Link>
            <Link href="/galeri" className="text-foreground hover:text-accent transition-colors">
              Galeri
            </Link>
            <Link href="/hakkimizda" className="text-foreground hover:text-accent transition-colors">
              Hakkımızda
            </Link>
            <Link href="/iletisim" className="text-foreground hover:text-accent transition-colors">
              İletişim
            </Link>
          </div>

          {/* Contact Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/iletisim">
              <Button variant="default" size="sm" className="gap-2">
                <Phone className="h-4 w-4" />
                Randevu Alın
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                href="/urunler"
                className="text-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Ürünler
              </Link>
              <Link
                href="/galeri"
                className="text-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Galeri
              </Link>
              <Link
                href="/hakkimizda"
                className="text-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Hakkımızda
              </Link>
              <Link
                href="/iletisim"
                className="text-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                İletişim
              </Link>
              <Link href="/iletisim" onClick={() => setIsOpen(false)}>
                <Button variant="default" size="sm" className="gap-2 w-full">
                  <Phone className="h-4 w-4" />
                  Randevu Alın
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
