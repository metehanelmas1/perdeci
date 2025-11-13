import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"

export const metadata = {
  title: "Ürünler - PERDE STUDYO",
  description: "Stor, tül, zebra perdeler ve daha fazlası. Geniş ürün yelpazemizi keşfedin.",
}

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">Ürünlerimiz</h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              İhtiyacınıza uygun perdeler arasından seçim yapın
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
            <ProductFilters />
            <ProductGrid />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
