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

// Lazy load modal for better performance
const CurtainDetailModal = lazy(() => import("@/app/components/CurtainDetailModal").then(module => ({ default: module.CurtainDetailModal })));

// Component to highlight "cortinas" text
const HighlightedText = ({ children }: { children: React.ReactNode }) => (
  <span className="font-bold underline decoration-accent decoration-4 underline-offset-4">{children}</span>
);

// Curtain data with images and descriptions
const curtains = [
  {
    id: "blackout",
    title: "Roller Blackout",
    description: "Oscurecimiento total para control absoluto de luz y privacidad.",
    imageUrl: "https://images.unsplash.com/photo-1712862207126-f31bc5bf0a20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xsZXIlMjBibGluZHMlMjBibGFja291dHxlbnwxfHx8fDE3NjgzNDEzMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hoverImageUrl: "https://images.unsplash.com/photo-1752388696571-d130cbf33848?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFja291dCUyMHJvbGxlciUyMGJsaW5kcyUyMGludGVyaW9yfGVufDF8fHx8MTc2ODM0MjE5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    fullDescription: "Las cortinas Roller Blackout ofrecen un bloqueo completo de la luz, ideales para dormitorios y salas multimedia. Fabricadas con telas de alta densidad que garantizan privacidad absoluta.\n\n• Bloqueo del 100% de luz\n• Ideal para descanso y espacios multimedia\n• Variedad de colores\n• Mecanismo de cadena o motorizado",
    gallery: [
      "https://images.unsplash.com/photo-1712862207126-f31bc5bf0a20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xsZXIlMjBibGluZHMlMjBibGFja291dHxlbnwxfHx8fDE3NjgzNDEzMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1752388696571-d130cbf33848?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFja291dCUyMHJvbGxlciUyMGJsaW5kcyUyMGludGVyaW9yfGVufDF8fHx8MTc2ODM0MjE5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
  {
    id: "sunscreen",
    title: "Roller Sunscreen",
    description: "Filtra la luz solar manteniendo la visibilidad hacia el exterior.",
    imageUrl: "https://images.unsplash.com/photo-1697659626446-47a5ad227c8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjByb2xsZXIlMjBzaGFkZXN8ZW58MXx8fHwxNzY4MzQxMzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hoverImageUrl: "https://images.unsplash.com/photo-1697659626446-47a5ad227c8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjByb2xsZXIlMjBzaGFkZXMlMjBsaWdodHxlbnwxfHx8fDE3NjgzNDIxOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    fullDescription: "Perfectas para living y oficinas, las cortinas Sunscreen permiten el paso de luz natural difusa mientras protegen del calor y los rayos UV.\n\n• Protección UV hasta 95%\n• Reduce el calor sin perder visibilidad\n• Diferentes grados de apertura (3%, 5%, 10%)\n• Ahorro energético",
    gallery: [
      "https://images.unsplash.com/photo-1697659626446-47a5ad227c8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjByb2xsZXIlMjBzaGFkZXN8ZW58MXx8fHwxNzY4MzQxMzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1697659626446-47a5ad227c8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjByb2xsZXIlMjBzaGFkZXMlMjBsaWdodHxlbnwxfHx8fDE3NjgzNDIxOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
  {
    id: "eclipse",
    title: "Roller Eclipse",
    description: "Alternancia entre privacidad y transparencia con sistema dual.",
    imageUrl: "https://images.unsplash.com/photo-1712862207126-f31bc5bf0a20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xsZXIlMjBibGluZHMlMjBibGFja291dHxlbnwxfHx8fDE3NjgzNDEzMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hoverImageUrl: "https://images.unsplash.com/photo-1616156104743-0ed6f123d8b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWFsJTIwcm9sbGVyJTIwYmxpbmRzJTIwd2luZG93fGVufDF8fHx8MTc2ODM0MjE5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    fullDescription: "Sistema innovador que combina bandas opacas y traslúcidas. Alineando o desalineando las bandas, controlás la luz y privacidad a tu gusto.\n\n• Doble función en una sola cortina\n• Control preciso de luz\n• Diseño moderno y versátil\n• Fácil manejo",
    gallery: [
      "https://images.unsplash.com/photo-1712862207126-f31bc5bf0a20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xsZXIlMjBibGluZHMlMjBibGFja291dHxlbnwxfHx8fDE3NjgzNDEzMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1616156104743-0ed6f123d8b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWFsJTIwcm9sbGVyJTIwYmxpbmRzJTIwd2luZG93fGVufDF8fHx8MTc2ODM0MjE5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
  {
    id: "deco",
    title: "Roller Deco",
    description: "Texturas y diseños exclusivos para ambientes con personalidad.",
    imageUrl: "https://images.unsplash.com/photo-1697659626446-47a5ad227c8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjByb2xsZXIlMjBzaGFkZXN8ZW58MXx8fHwxNzY4MzQxMzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hoverImageUrl: "https://images.unsplash.com/photo-1764418321528-8d5caeb0ceec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0dXJlZCUyMGRlY29yYXRpdmUlMjBibGluZHN8ZW58MXx8fHwxNzY4MzQyMTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    fullDescription: "Amplia colección de telas con texturas, tramas y diseños para personalizar tu espacio. Ideales para dar carácter decorativo sin renunciar a la funcionalidad.\n\n• Texturas y diseños únicos\n• Telas de alta calidad\n• Personalización completa\n• Balance entre estética y función",
    gallery: [
      "https://images.unsplash.com/photo-1697659626446-47a5ad227c8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zY3JlZW4lMjByb2xsZXIlMjBzaGFkZXN8ZW58MXx8fHwxNzY4MzQxMzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1764418321528-8d5caeb0ceec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0dXJlZCUyMGRlY29yYXRpdmUlMjBibGluZHN8ZW58MXx8fHwxNzY4MzQyMTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
  {
    id: "doble",
    title: "Roller Doble",
    description: "Doble tejido en un solo sistema para mayor versatilidad.",
    imageUrl: "https://images.unsplash.com/photo-1712862207126-f31bc5bf0a20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xsZXIlMjBibGluZHMlMjBibGFja291dHxlbnwxfHx8fDE3NjgzNDEzMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hoverImageUrl: "https://images.unsplash.com/photo-1635324944940-0c0a9c8f9bf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3VibGUlMjByb2xsZXIlMjBzaGFkZXN8ZW58MXx8fHwxNzY4MzQyMTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    fullDescription: "Dos cortinas independientes en un solo sistema. Combiná blackout y sunscreen según el momento del día y tus necesidades.\n\n• Dos tipos de tela en un sistema\n• Máxima versatilidad\n• Ahorro de espacio\n• Control total del ambiente",
    gallery: [
      "https://images.unsplash.com/photo-1712862207126-f31bc5bf0a20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2xsZXIlMjBibGluZHMlMjBibGFja291dHxlbnwxfHx8fDE3NjgzNDEzMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1635324944940-0c0a9c8f9bf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3VibGUlMjByb2xsZXIlMjBzaGFkZXN8ZW58MXx8fHwxNzY4MzQyMTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
  {
    id: "waves",
    title: "Cortinas Waves",
    description: "Caída en ondas perfectas para un estilo sofisticado y moderno.",
    imageUrl: "https://images.unsplash.com/photo-1565080584018-abf2698cd413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjdXJ0YWlucyUyMHdhdmVzfGVufDF8fHx8MTc2ODM0MTMwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hoverImageUrl: "https://images.unsplash.com/photo-1748009192120-8fd75c9999d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2F2ZSUyMGN1cnRhaW5zfGVufDF8fHx8MTc2ODM0MjE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    fullDescription: "Elegancia en movimiento. Sistema de riel con pliegues uniformes que crean ondas perfectas. Ideales para espacios amplios y ventanales.\n\n• Ondas uniformes y simétricas\n• Sistema de riel motorizado o manual\n• Telas pesadas de alta calidad\n• Efecto visual premium",
    gallery: [
      "https://images.unsplash.com/photo-1565080584018-abf2698cd413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjdXJ0YWlucyUyMHdhdmVzfGVufDF8fHx8MTc2ODM0MTMwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1748009192120-8fd75c9999d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2F2ZSUyMGN1cnRhaW5zfGVufDF8fHx8MTc2ODM0MjE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
  {
    id: "americanas",
    title: "Cortinas Americanas",
    description: "Elegancia clásica con pliegues horizontales ajustables.",
    imageUrl: "https://images.unsplash.com/photo-1565080584018-abf2698cd413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjdXJ0YWlucyUyMHdhdmVzfGVufDF8fHx8MTc2ODM0MTMwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hoverImageUrl: "https://images.unsplash.com/photo-1699823504234-2c92bf857ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbiUyMHNoYWRlcyUyMHdpbmRvdyUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NjgzNDIxOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    fullDescription: "Estilo atemporal con pliegues horizontales. Perfectas para dormitorios y livings que buscan elegancia tradicional.\n\n• Pliegues horizontales perfectos\n• Sistema de cordón\n• Telas nobles y duraderas\n• Estética clásica renovada",
    gallery: [
      "https://images.unsplash.com/photo-1565080584018-abf2698cd413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjdXJ0YWlucyUyMHdhdmVzfGVufDF8fHx8MTc2ODM0MTMwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1699823504234-2c92bf857ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbiUyMHNoYWRlcyUyMHdpbmRvdyUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NjgzNDIxOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
  {
    id: "verticales",
    title: "Bandas Verticales",
    description: "Ideal para ventanales amplios y espacios corporativos.",
    imageUrl: "https://images.unsplash.com/photo-1691809159150-5381f57c6f46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXJ0aWNhbCUyMGJsaW5kcyUyMHdpbmRvd3xlbnwxfHx8fDE3NjgzNDEzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hoverImageUrl: "https://images.unsplash.com/photo-1744378816349-06a5d569deb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXJ0aWNhbCUyMGJsaW5kcyUyMG9mZmljZXxlbnwxfHx8fDE3NjgzNDIxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    fullDescription: "Solución práctica para grandes ventanales y puertas corredizas. Perfectas para oficinas y espacios comerciales.\n\n• Ideales para ventanales amplios\n• Fácil mantenimiento\n• Control de luz ajustable\n• Durabilidad superior",
    gallery: [
      "https://images.unsplash.com/photo-1691809159150-5381f57c6f46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXJ0aWNhbCUyMGJsaW5kcyUyMHdpbmRvd3xlbnwxfHx8fDE3NjgzNDEzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1744378816349-06a5d569deb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXJ0aWNhbCUyMGJsaW5kcyUyMG9mZmljZXxlbnwxfHx8fDE3NjgzNDIxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
  {
    id: "panel",
    title: "Panel Oriental",
    description: "Diseño minimalista para dividir ambientes con estilo.",
    imageUrl: "https://images.unsplash.com/photo-1719381502989-f5c050611bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lbCUyMHRyYWNrJTIwYmxpbmRzfGVufDF8fHx8MTc2ODM0MTMwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hoverImageUrl: "https://images.unsplash.com/photo-1719381502989-f5c050611bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lbCUyMHRyYWNrJTIwYmxpbmRzJTIwbW9kZXJufGVufDF8fHx8MTc2ODM0MjE5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    fullDescription: "Paneles deslizantes que combinan funcionalidad y diseño. Perfectos como separadores de ambientes o para cubrir grandes aberturas.\n\n• Estética japonesa contemporánea\n• Paneles amplios y ligeros\n• Deslizamiento suave\n• Versatilidad decorativa",
    gallery: [
      "https://images.unsplash.com/photo-1719381502989-f5c050611bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lbCUyMHRyYWNrJTIwYmxpbmRzfGVufDF8fHx8MTc2ODM0MTMwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1719381502989-f5c050611bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lbCUyMHRyYWNrJTIwYmxpbmRzJTIwbW9kZXJufGVufDF8fHx8MTc2ODM0MjE5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
  },
  {
    id: "automatizadas",
    title: "Cortinas Automatizadas",
    description: "Control inteligente con motorización y domótica integrada.",
    imageUrl: "https://images.unsplash.com/photo-1669237041595-a5d7d2f14c44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rvcml6ZWQlMjBzbWFydCUyMGJsaW5kc3xlbnwxfHx8fDE3NjgzNDEzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hoverImageUrl: "https://images.unsplash.com/photo-1669237041595-a5d7d2f14c44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rvcml6ZWQlMjBzbWFydCUyMGJsaW5kc3xlbnwxfHx8fDE3NjgzNDEzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    fullDescription: "La última tecnología en cortinas. Control por app, voz o programación automática. Compatible con sistemas de domótica.\n\n• Control remoto y por voz\n• Programación horaria\n• Integración con Google Home / Alexa\n• Máximo confort y eficiencia",
    gallery: [
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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl tracking-tight text-foreground font-bold">CORTINADOS</h1>
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
            <HighlightedText>Cortinas</HighlightedText> a medida<br />para tu espacio
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
              Tipos de <HighlightedText>cortinas</HighlightedText>
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
              title="Entrega incluida"
              description="Llevamos tus cortinas a tu domicilio sin costo adicional en CABA y GBA."
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
                  <a href="mailto:info@cortinados.com" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                    <Mail className="w-5 h-5" />
                    <span className="font-light">info@cortinados.com</span>
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
              <h1 className="text-xl tracking-tight text-foreground mb-2">CORTINADOS</h1>
              <p className="text-sm text-muted-foreground font-light">
                <HighlightedText>Cortinas</HighlightedText> a medida · CABA y GBA
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground font-light">
                © {new Date().getFullYear()} Cortinados. Todos los derechos reservados.
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