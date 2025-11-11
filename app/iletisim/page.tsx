import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export const metadata = {
  title: "İletişim - PERDE STUDYO",
  description: "Bizimle iletişime geçin, ücretsiz keşif randevusu alın",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">İletişim</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Ücretsiz keşif randevusu için bize ulaşın</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="font-serif text-2xl text-foreground mb-6">Bize Yazın</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="font-serif text-2xl text-foreground mb-6">İletişim Bilgileri</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Telefon</h3>
                      <a href="tel:+902121234567" className="text-muted-foreground hover:text-accent transition-colors">
                        +90 (212) 123 45 67
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">E-posta</h3>
                      <a
                        href="mailto:info@perdestudyo.com"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        info@perdestudyo.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Adres</h3>
                      <p className="text-muted-foreground">
                        Nişantaşı Mah. Teşvikiye Cad.
                        <br />
                        No: 123 Şişli / İstanbul
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Çalışma Saatleri</h3>
                      <p className="text-muted-foreground">
                        Pazartesi - Cumartesi: 09:00 - 19:00
                        <br />
                        Pazar: Kapalı
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8">
                <h3 className="font-medium text-foreground mb-3">Hızlı İletişim</h3>
                <p className="text-muted-foreground mb-6">WhatsApp üzerinden de bize ulaşabilirsiniz</p>
                <a
                  href="https://wa.me/902121234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  WhatsApp ile İletişim
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-card border border-border rounded-2xl p-4 overflow-hidden">
            <div className="aspect-[21/9] bg-muted rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.3844358937887!2d28.9945089!3d41.0453892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2zTmnFn2FudGHFn8SxLCDEsHN0YW5idWw!5e0!3m2!1str!2str!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
