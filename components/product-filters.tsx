"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function ProductFilters() {
  const [openSections, setOpenSections] = useState<string[]>(["type", "color", "pattern", "room", "light"])

  const toggleSection = (section: string) => {
    setOpenSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const filters = [
    {
      id: "type",
      title: "Perde Tipi",
      options: ["Stor Perde", "Tül Perde", "Zebra Perde", "Blackout Perde", "Jaluzi"],
    },
    {
      id: "color",
      title: "Renk",
      options: ["Beyaz", "Bej", "Kahverengi", "Gri", "Mavi", "Yeşil"],
    },
    {
      id: "pattern",
      title: "Desen",
      options: ["Düz", "Çizgili", "Çiçekli", "Geometrik", "Modern"],
    },
    {
      id: "room",
      title: "Oda Tipi",
      options: ["Salon", "Yatak Odası", "Mutfak", "Çocuk Odası", "Ofis"],
    },
    {
      id: "light",
      title: "Işık Geçirgenliği",
      options: ["Blackout", "Yarı Karartma", "Işık Geçirgen", "Tül"],
    },
  ]

  return (
    <aside className="bg-card border border-border rounded-xl p-4 md:p-6 h-fit lg:sticky lg:top-24">
      <h2 className="font-serif text-xl text-foreground mb-6">Filtrele</h2>

      <div className="space-y-6">
        {filters.map((filter) => (
          <div key={filter.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
            <button
              onClick={() => toggleSection(filter.id)}
              className="flex items-center justify-between w-full text-left mb-4"
            >
              <span className="font-medium text-foreground">{filter.title}</span>
              {openSections.includes(filter.id) ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {openSections.includes(filter.id) && (
              <div className="space-y-2 animate-in slide-in-from-top-2">
                {filter.options.map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-border text-accent focus:ring-accent focus:ring-offset-0"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="w-full mt-6 bg-accent text-accent-foreground py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors">
        Filtreleri Uygula
      </button>
    </aside>
  )
}
