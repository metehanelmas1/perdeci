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
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Ürünlerimiz</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              İhtiyacınıza uygun perdeler arasından seçim yapın
            </p>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            <ProductFilters />
            <ProductGrid />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
