import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductDetailClient } from "@/components/product-detail-client"

export const metadata = {
  title: "Ürün Detayı - PERDE STUDYO",
  description: "Ürün detaylarını inceleyin ve sipariş verin.",
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <>
      <Navbar />
      <ProductDetailClient productId={id} />
      <Footer />
    </>
  )
}
