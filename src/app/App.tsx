import { Button } from "@/app/components/ui/button";
import { CurtainCard } from "@/app/components/CurtainCard";
import { ProcessStep } from "@/app/components/ProcessStep";
import { ServiceFeature } from "@/app/components/ServiceFeature";
import { ContactForm } from "@/app/components/ContactForm";
import { SocialLinks } from "@/app/components/SocialLinks";
import { WhatsAppButton } from "@/app/components/WhatsAppButton";
import { Ruler, Truck, Wrench, MessageCircle, CreditCard, MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState, lazy, Suspense } from "react";
import { Toaster } from "@/app/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { ScrollToTop } from "@/app/components/ScrollToTop";

// Lazy load modal for better performance
const CurtainDetailModal = lazy(() => import("@/app/components/CurtainDetailModal").then(module => ({ default: module.CurtainDetailModal })));

// Component to highlight "cortinas" text
const HighlightedText = ({ children, underline = false }: { children: React.ReactNode, underline?: boolean }) => (
  <span className={`font-extrabold ${underline ? 'underline decoration-accent decoration-4 underline-offset-4' : ''}`}>
    {children}
  </span>
);

// Curtain data with images and descriptions
const curtains = [
  {
    id: "blackout",
    title: "Roller Blackout",
    description: "Oscurecimiento total para control absoluto de luz y privacidad.",
    imageUrl: "/assets/Nuevas blackout/30.png",
    hoverImageUrl: "/assets/Nuevas blackout/31.png",
    fullDescription: "Las cortinas Roller Blackout ofrecen un bloqueo completo de la luz, ideales para dormitorios y salas multimedia. Fabricadas con telas de alta densidad que garantizan privacidad absoluta.\n\n• Bloqueo del 100% de luz\n• Ideal para descanso y espacios multimedia\n• Variedad de colores\n• Mecanismo de cadena o motorizado",
    gallery: [
      "/assets/Nuevas blackout/30.png",
      "/assets/Nuevas blackout/31.png",
      "/assets/Nuevas blackout/32.png",
      "/assets/Nuevas blackout/33.png",
      "/assets/Nuevas blackout/34.png",
    ],
  },
  {
    id: "sunscreen",
    title: "Roller Sunscreen",
    description: "Filtra la luz solar manteniendo la visibilidad hacia el exterior.",
    imageUrl: "/assets/editados/Roller sunscreen/roll sunscreen antes 2.png",
    hoverImageUrl: "/assets/editados/Roller sunscreen/roll sunscreen despues 2.png",
    fullDescription: "Perfectas para living y oficinas, las cortinas Sunscreen permiten el paso de luz natural difusa mientras protegen del calor y los rayos UV.\n\n• Protección UV hasta 95%\n• Reduce el calor sin perder visibilidad\n• Diferentes grados de apertura (3%, 5%, 10%)\n• Ahorro energético",
    gallery: [
      "/assets/editados/Roller sunscreen/roll sunscreen despues 2.png",
      "/assets/editados/Roller sunscreen/roll sunscreen antes 2.png",
      "/assets/editados/Roller sunscreen/roll sunscreen  despues.png",
      "/assets/editados/Roller sunscreen/roll sunscreen antes.png",
      "/assets/editados/Roller sunscreen/roll sunscreen.png",
    ],
  },
  {
    id: "eclipse",
    title: "Roller Eclipse",
    description: "Alternancia entre privacidad y transparencia con sistema dual.",
    imageUrl: "/assets/Roller eclipse/18.png",
    hoverImageUrl: "/assets/Roller eclipse/17.png",
    fullDescription: "Sistema innovador que combina bandas opacas y traslúcidas. Alineando o desalineando las bandas, controlás la luz y privacidad a tu gusto.\n\n• Doble función en una sola cortina\n• Control preciso de luz\n• Diseño moderno y versátil\n• Fácil manejo",
    gallery: [
      "/assets/Roller eclipse/18.png",
      "/assets/Roller eclipse/17.png",
      "/assets/Roller eclipse/16.png",
    ],
  },
  {
    id: "clasicas",
    title: "Cortinas Clásicas",
    description: "Elegancia atemporal con telas nobles y acabados premium.",
    imageUrl: "/assets/editados/Cortinas_Clasicas/cortinas clasicas 1 despues.png",
    hoverImageUrl: "/assets/editados/Cortinas_Clasicas/cortinas clasicas 1 antes.png",
    fullDescription: "Cortinas tradicionales que nunca pasan de moda. Confeccionadas con telas de primera calidad, ofrecen calidez y sofisticación a cualquier ambiente.\n\n• Telas nobles y duraderas\n• Amplia variedad de colores y texturas\n• Confección artesanal\n• Estilo clásico renovado",
    gallery: [
      "/assets/editados/Cortinas_Clasicas/cortinas clasicas 1 despues.png",
      "/assets/editados/Cortinas_Clasicas/cortinas clasicas 1 antes.png",
      "/assets/editados/Cortinas_Clasicas/cortinas clasicas 2 despues.png",
      "/assets/editados/Cortinas_Clasicas/cortinas clasicas 2 antes.png",
      "/assets/editados/Cortinas_Clasicas/cortinas clasicas 2 despues 2.png",
      "/assets/editados/Cortinas_Clasicas/cortinas clasicas 3 despues.png",
      "/assets/editados/Cortinas_Clasicas/cortinas clasicas 3 antes.png",
      "/assets/editados/Cortinas_Clasicas/cortinas clasicas 4 antes.png",
      "/assets/editados/Cortinas_Clasicas/cortinas americanas_ 4 despues.png",
      "/assets/editados/Cortinas_Clasicas/cortinas clasicas despues 5.png",
      "/assets/editados/Cortinas_Clasicas/cortinas wave antes.png",
      "/assets/editados/Cortinas_Clasicas/cortinas clasicas proceso.png",
      "/assets/editados/Cortinas clasicas.mp4",
    ],
  },
  {
    id: "doble",
    title: "Roller Doble",
    description: "Doble tejido en un solo sistema para mayor versatilidad.",
    imageUrl: "/assets/Roller doble/24.png",
    hoverImageUrl: "/assets/Roller doble/23.png",
    fullDescription: "Dos cortinas independientes en un solo sistema. Combiná blackout y sunscreen según el momento del día y tus necesidades.\n\n• Dos tipos de tela en un sistema\n• Máxima versatilidad\n• Ahorro de espacio\n• Control total del ambiente",
    gallery: [
      "/assets/Roller doble/24.png",
      "/assets/Roller doble/23.png",
    ],
  },
  {
    id: "waves",
    title: "Cortinas Waves",
    description: "Caída en ondas perfectas para un estilo sofisticado y moderno.",
    imageUrl: "/assets/Cortinas wave/1.png",
    hoverImageUrl: "/assets/Cortinas wave/2.png",
    fullDescription: "Elegancia en movimiento. Sistema de riel con pliegues uniformes que crean ondas perfectas. Ideales para espacios amplios y ventanales.\n\n• Ondas uniformes y simétricas\n• Sistema de riel motorizado o manual\n• Telas pesadas de alta calidad\n• Efecto visual premium",
    gallery: [
      "/assets/Cortinas wave/1.png",
      "/assets/Cortinas wave/2.png",
      "/assets/Cortinas wave/3.png",
      "/assets/Cortinas wave/4.png",
      "/assets/Cortinas wave/5.png",
    ],
  },
  {
    id: "americanas",
    title: "Cortinas Americanas",
    description: "Elegancia clásica con pliegues horizontales ajustables.",
    imageUrl: "/assets/Cortina americana/10.png",
    hoverImageUrl: "/assets/Cortina americana/11.png",
    fullDescription: "Estilo atemporal con pliegues horizontales. Perfectas para dormitorios y livings que buscan elegancia tradicional.\n\n• Pliegues horizontales perfectos\n• Sistema de cordón\n• Telas nobles y duraderas\n• Estética clásica renovada",
    gallery: [
      "/assets/Cortina americana/10.png",
      "/assets/Cortina americana/11.png",
      "/assets/Cortina americana/12.png",
      "/assets/Cortina americana/9.png",
    ],
  },
  {
    id: "verticales",
    title: "Bandas Verticales",
    description: "Ideal para ventanales amplios y espacios corporativos.",
    imageUrl: "/assets/editados/Bandas verticales/Bandas_verticales_antes.png",
    hoverImageUrl: "/assets/editados/Bandas verticales/Bandas_verticales_despues.png",
    fullDescription: "Solución práctica para grandes ventanales y puertas corredizas. Perfectas para oficinas y espacios comerciales.\n\n• Ideales para ventanales amplios\n• Fácil mantenimiento\n• Control de luz ajustable\n• Durabilidad superior",
    gallery: [
      "/assets/editados/Bandas verticales/Bandas_verticales_antes.png",
      "/assets/editados/Bandas verticales/Bandas_verticales_despues.png",
    ],
  },
  {
    id: "panel",
    title: "Panel Oriental",
    description: "Diseño minimalista para dividir ambientes con estilo.",
    imageUrl: "/assets/Panel Oriental.png",
    hoverImageUrl: "/assets/Panel Oriental.png",
    fullDescription: "Paneles deslizantes que combinan funcionalidad y diseño. Perfectos como separadores de ambientes o para cubrir grandes aberturas.\n\n• Estética japonesa contemporánea\n• Paneles amplios y ligeros\n• Deslizamiento suave\n• Versatilidad decorativa",
    gallery: [
      "/assets/Panel Oriental.png",
    ],
  },
  {
    id: "automatizadas",
    title: "Cortinas Automatizadas",
    description: "Control inteligente con motorización y domótica integrada.",
    imageUrl: "https://images.unsplash.com/photo-1669237041595-a5d7d2f14c44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rvcml6ZWQlMjBzbWFydCUyMGJsaW5kc3xlbnwxfHx8fDE3NjgzNDEzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hoverImageUrl: "/assets/Roller eclipse/18.png",
    fullDescription: "La última tecnología en cortinas. Control por app, voz o programación automática. Compatible con sistemas de domótica.\n\n• Control remoto y por voz\n• Programación horaria\n• Integración con Google Home / Alexa\n• Máximo confort y eficiencia",
    gallery: [
      "/assets/editados/Cortinas automaticas corto.mp4",
      "https://images.unsplash.com/photo-1669237041595-a5d7d2f14c44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rvcml6ZWQlMjBzbWFydCUyMGJsaW5kc3xlbnwxfHx8fDE3NjgzNDEzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
];

export default function App() {
  const [selectedCurtain, setSelectedCurtain] = useState<typeof curtains[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCurtainClick = (curtain: typeof curtains[0]) => {
    setSelectedCurtain(curtain);
    setIsModalOpen(true);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById("contact-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Analytics />
      <Toaster position="top-center" />
      <WhatsAppButton />
      <ScrollToTop />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <h1 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl tracking-tight text-foreground font-bold cursor-pointer hover:opacity-80 transition-opacity"
          >
            decortinas home
          </h1>
          <Button 
            onClick={scrollToForm}
            size="sm" 
            className="rounded-md bg-accent text-white hover:bg-accent/90 transition-all px-4 py-2 text-sm font-semibold shadow-md hover:shadow-lg"
          >
            Solicitar cotización
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1754611362309-71297e9f42fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGVnYW50JTIwY3VydGFpbnMlMjB3aW5kb3d8ZW58MXx8fHwxNzY4MzQxMjc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Cortinas elegantes"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl mb-6 tracking-tight font-bold">
            <HighlightedText>Cortinas</HighlightedText> <span className="font-normal">a medida<br />para tu espacio</span>
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto font-light">
            Diseño, fabricación e instalación integral.<br />
            Transformá tus ambientes con elegancia y funcionalidad.
          </p>
          <Button 
            onClick={scrollToForm}
            size="lg" 
            className="rounded-md bg-accent text-white hover:bg-accent/90 px-8 py-3 text-base font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            Solicitar presupuesto
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl mb-6 text-foreground">
            Servicio integral de principio a fin
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
            Creamos <HighlightedText>cortinas</HighlightedText> a medida con atención personalizada en cada etapa del proceso. 
            Desde el asesoramiento inicial hasta la instalación final, nos ocupamos de todo 
            para que solo disfrutes del resultado.
          </p>
        </div>
      </section>

      {/* Curtain Types Section - MOVED TO TOP */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl mb-4 text-foreground font-bold">
              Tipos de <HighlightedText underline>cortinas</HighlightedText>
            </h3>
            <p className="text-lg text-muted-foreground font-light">
              Soluciones personalizadas para cada ambiente
            </p>
            <div className="mt-6">
              <Button 
                onClick={scrollToForm}
                size="lg" 
                className="rounded-md bg-accent text-white hover:bg-accent/90 px-6 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Solicitar cotización
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {curtains.map(curtain => (
              <CurtainCard
                key={curtain.id}
                title={curtain.title}
                description={curtain.description}
                imageUrl={curtain.imageUrl}
                hoverImageUrl={curtain.hoverImageUrl}
                onClick={() => handleCurtainClick(curtain)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl mb-4 text-foreground font-bold">
              Proceso de trabajo
            </h3>
            <p className="text-lg text-muted-foreground font-light">
              Pasos que seguimos para crear tus <HighlightedText>cortinas</HighlightedText> a medida
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
            <ProcessStep
              number="01"
              title="Explorá"
              description="Navegá nuestro catálogo y elegí el tipo de cortina ideal para tu espacio."
            />
            <ProcessStep
              number="02"
              title="Solicitá presupuesto"
              description="Completá el formulario con tus medidas y preferencias para recibir tu cotización."
            />
            <ProcessStep
              number="03"
              title="Recibí seguimiento"
              description="Te contactamos para confirmar detalles y coordinar el siguiente paso."
            />
            <ProcessStep
              number="04"
              title="Agendá la visita"
              description="Coordinamos día y horario para la medición e instalación en tu domicilio."
            />
            <ProcessStep
              number="05"
              title="Disfrutá"
              description="Nuestro equipo instala tus cortinas y te asegurás el resultado perfecto."
            />
          </div>
        </div>
      </section>

      {/* Service Features Section */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl mb-4 text-foreground font-bold">
              Servicio incluido
            </h3>
            <p className="text-lg text-muted-foreground font-light">
              Todo lo que necesitás en un solo lugar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            <ServiceFeature
              icon={Ruler}
              title="Fabricación a medida"
              description="Cada cortina se confecciona según las medidas exactas de tus ventanas."
            />
            <ServiceFeature
              icon={Truck}
              title="Entrega a convenir"
              description="Coordinamos la entrega de tus cortinas según la zona y el tipo de instalación."
            />
            <ServiceFeature
              icon={Wrench}
              title="Instalación profesional"
              description="Equipo especializado que instala tus cortinas con precisión."
            />
            <ServiceFeature
              icon={MessageCircle}
              title="Asesoramiento completo"
              description="Te acompañamos online, por teléfono o en nuestro showroom."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl mb-6 text-white">
            ¿Listo para transformar tu espacio?
          </h3>
          <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto font-light">
            Solicitá tu presupuesto sin compromiso y descubrí cómo podemos ayudarte.
          </p>
          <Button 
            onClick={scrollToForm}
            size="lg" 
            className="rounded-md bg-white text-foreground hover:bg-white/95 px-14 py-7 text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            Solicitar presupuesto
          </Button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 px-6 bg-background" id="contact-form">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl mb-4 text-foreground font-bold">
              Solicitá tu cotización
            </h3>
            <p className="text-muted-foreground font-light text-lg">
              Contanos qué necesitás y te enviamos una cotización personalizada.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h4 className="mb-4 text-foreground text-lg">También podés contactarnos por:</h4>
                <div className="space-y-3">
                  <a href="tel:+5491112345678" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                    <Phone className="w-5 h-5" />
                    <span className="font-light">+54 9 11 1234-5678</span>
                  </a>
                  <a href="mailto:info@decortinashome.com" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                    <Mail className="w-5 h-5" />
                    <span className="font-light">info@decortinashome.com</span>
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <SocialLinks variant="vertical" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl mb-4 text-foreground font-bold">
              Información práctica
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <MapPin className="w-8 h-8 text-accent stroke-[1.5]" />
              </div>
              <h4 className="mb-3 text-foreground">Ubicación</h4>
              <p className="text-muted-foreground font-light">
                Villa Crespo, CABA<br />
                <span className="text-sm">Zona de trabajo: CABA y GBA</span>
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Clock className="w-8 h-8 text-accent stroke-[1.5]" />
              </div>
              <h4 className="mb-3 text-foreground">Horarios</h4>
              <p className="text-muted-foreground font-light">
                Lunes a viernes<br />
                9:00 a 18:00 hs
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <CreditCard className="w-8 h-8 text-accent stroke-[1.5]" />
              </div>
              <h4 className="mb-3 text-foreground">Formas de pago</h4>
              <p className="text-muted-foreground font-light">
                Efectivo · Tarjeta<br />
                Transferencia · Mercado Pago
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-xl tracking-tight text-foreground mb-2">decortinas home</h1>
              <p className="text-sm text-muted-foreground font-light">
                <HighlightedText>Cortinas</HighlightedText> a medida · CABA y GBA
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground font-light">
                © {new Date().getFullYear()} decortinas home. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Curtain Detail Modal */}
      {selectedCurtain && (
        <Suspense fallback={<div />}>
          <CurtainDetailModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            title={selectedCurtain.title}
            description={selectedCurtain.description}
            images={selectedCurtain.gallery}
            fullDescription={selectedCurtain.fullDescription}
          />
        </Suspense>
      )}
    </div>
  );
}