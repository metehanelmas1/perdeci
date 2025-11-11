import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Award, Users, Clock, Shield } from "lucide-react"
import Image from "next/image"

export const metadata = {
  title: "Hakkımızda - PERDE STUDYO",
  description: "20 yıllık tecrübe ile kaliteli perde ve stor hizmetleri",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-background">
        {/* Hero Section */}
        <div className="container mx-auto px-6 mb-20">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Hikayemiz</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">1990'dan beri evlere değer katıyoruz</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src="/placeholder.svg?height=600&width=800" alt="Mağazamız" fill className="object-cover" />
            </div>
            <div className="space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                1990 yılında küçük bir atölye olarak başladığımız yolculuğumuzda, bugün binlerce mutlu müşteriye hizmet
                veren köklü bir marka haline geldik.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Kaliteli kumaşlar, usta işçilik ve müşteri memnuniyeti odaklı yaklaşımımızla, her projede mükemmelliği
                hedefliyoruz. Sadece perde satmıyoruz, yaşam alanlarınıza estetik ve fonksiyonellik katıyoruz.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                20 yılı aşkın tecrübemiz, uzman ekibimiz ve müşterilerimize duyduğumuz saygı, bizi sektörde bir adım öne
                çıkarıyor.
              </p>
            </div>
          </div>
        </div>

        {/* Why Us */}
        <div className="bg-card border-y border-border py-20">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-12">Neden Biz?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Usta İşçilik</h3>
                <p className="text-muted-foreground text-sm">
                  20+ yıllık deneyimli ustalarımız her detaya özen gösterir
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Kalite Garantisi</h3>
                <p className="text-muted-foreground text-sm">Premium kumaşlar ve 2 yıl garanti</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Müşteri Odaklı</h3>
                <p className="text-muted-foreground text-sm">Her projede 100% müşteri memnuniyeti</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Hızlı Teslimat</h3>
                <p className="text-muted-foreground text-sm">7-10 gün içinde üretim ve montaj</p>
              </div>
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="container mx-auto px-6 py-20">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-12">Nasıl Çalışırız?</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {[
                {
                  step: "01",
                  title: "Ücretsiz Keşif",
                  description: "Uzman ekibimiz yerinize gelir, ölçümleri alır ve size en uygun çözümleri sunar.",
                },
                {
                  step: "02",
                  title: "Model & Kumaş Seçimi",
                  description: "Binlerce kumaş ve model arasından size en uygun olanları birlikte seçeriz.",
                },
                {
                  step: "03",
                  title: "Üretim",
                  description: "Atölyemizde özenle, kaliteli malzemelerle perdeniz üretilir.",
                },
                {
                  step: "04",
                  title: "Profesyonel Montaj",
                  description: "Deneyimli ustalarımız perdenizi özenle monte eder ve son kontrolü yapar.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-8 group">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                      <span className="font-serif text-2xl text-accent group-hover:text-accent-foreground transition-colors duration-300">
                        {item.step}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 pt-4">
                    <h3 className="font-serif text-2xl text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-lg">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-muted/30 py-20">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-12">Ekibimiz</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: "Ahmet Yılmaz",
                  role: "Kurucu & Genel Müdür",
                  image: "/placeholder.svg?height=400&width=400",
                },
                {
                  name: "Zeynep Kaya",
                  role: "Tasarım Danışmanı",
                  image: "/placeholder.svg?height=400&width=400",
                },
                {
                  name: "Mehmet Demir",
                  role: "Baş Usta",
                  image: "/placeholder.svg?height=400&width=400",
                },
              ].map((member) => (
                <div key={member.name} className="text-center group">
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
