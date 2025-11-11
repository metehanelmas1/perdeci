import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GallerySection } from "@/components/gallery-section"

export const metadata = {
  title: "Galeri - PERDE STUDYO",
  description: "Tamamlanmış projelerimiz ve ilham veren tasarımlar",
}

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">İlham Köşesi</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hayalinizdeki evi yaratmak için referans projelerimize göz atın
            </p>
          </div>

          <GallerySection />
        </div>
      </main>
      <Footer />
    </>
  )
}
