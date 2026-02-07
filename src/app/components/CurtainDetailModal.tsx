import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/app/components/ui/dialog";
import { ContactForm } from "@/app/components/ContactForm";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CurtainDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  images: string[];
  fullDescription?: string;
}

export function CurtainDetailModal({
  open,
  onOpenChange,
  title,
  description,
  images,
  fullDescription,
}: CurtainDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when modal opens or images change
  useEffect(() => {
    if (open) {
      setCurrentImageIndex(0);
    }
  }, [open, images]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-6xl max-w-[95vw] max-h-[90vh] overflow-y-auto rounded-lg border-border bg-background p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Gallery Section */}
          <div className="bg-card p-5 lg:p-8">
            <div className="mb-5">
              <h2 className="text-2xl md:text-3xl mb-3 text-foreground font-semibold">{title}</h2>
              <p className="text-muted-foreground font-light leading-relaxed text-base">
                {description}
              </p>
            </div>

            <div className="relative w-full bg-muted overflow-hidden mb-4 rounded-md">
              <div className="aspect-[3/4] md:aspect-auto md:h-[60vh] max-h-[600px] w-full relative">
                {images[currentImageIndex]?.endsWith('.mp4') ? (
                  <video
                    key={images[currentImageIndex]}
                    src={images[currentImageIndex]}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={images[currentImageIndex]}
                    alt={`${title} - imagen ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    loading="eager"
                    onError={(e) => {
                      console.error('Error loading image:', images[currentImageIndex]);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground p-2 rounded-full transition-all shadow-md z-10"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-foreground p-2 rounded-full transition-all shadow-md z-10"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 justify-center mb-5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-accent w-8"
                        : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {fullDescription && (
              <div className="mt-5 pt-5 border-t border-border">
                <h3 className="text-lg mb-3 text-foreground font-semibold">Características</h3>
                <p className="text-muted-foreground font-light leading-relaxed whitespace-pre-line text-sm">
                  {fullDescription}
                </p>
              </div>
            )}
          </div>

          {/* Form Section */}
          <div className="bg-background p-5 lg:p-8">
            <div className="mb-5">
              <h3 className="text-xl mb-2 text-foreground font-semibold">
                Solicitá tu cotización
              </h3>
              <p className="text-muted-foreground font-light text-sm">
                Contanos qué necesitás y te enviamos una cotización personalizada.
              </p>
            </div>

            <ContactForm defaultCurtainType={title} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}