import { Navbar } from "@/components/navbar"
import { HeroSlider } from "@/components/hero-slider"
import { ProductCategories } from "@/components/product-categories"
import { FeaturedProducts } from "@/components/featured-products"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { Services } from "@/components/services"
import { PreFooterCTA } from "@/components/pre-footer-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSlider />
      <ProductCategories />
      <FeaturedProducts />
      <HowItWorks />
      <Services />
      <Testimonials />
      <PreFooterCTA />
      <Footer />
    </main>
  )
}
