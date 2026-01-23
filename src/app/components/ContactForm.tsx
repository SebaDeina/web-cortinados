import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { toast } from "sonner";

interface ContactFormProps {
  defaultCurtainType?: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  curtainType: string;
  room: string;
  message?: string;
}

const curtainTypes = [
  "Roller Blackout",
  "Roller Sunscreen",
  "Roller Eclipse",
  "Roller Deco",
  "Roller Doble",
  "Cortinas Waves",
  "Cortinas Americanas",
  "Bandas Verticales",
  "Panel Oriental",
  "Cortinas Automatizadas",
];

const rooms = [
  "Living",
  "Dormitorio",
  "Cocina",
  "Oficina",
  "Comedor",
  "Balcón",
  "Otro",
];

export function ContactForm({ defaultCurtainType }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      curtainType: defaultCurtainType || "",
      room: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const apiUrl = import.meta.env.PROD 
        ? '/api/send-email' 
        : 'http://localhost:3001/api/send-email';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success('¡Cotización enviada! Te contactaremos pronto.');
        reset();
      } else {
        toast.error(result.error || 'Error al enviar la cotización. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error de conexión. Por favor, verifica tu conexión e intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="fullName" className="text-foreground mb-1.5 block font-normal text-sm">
          Nombre y apellido
        </Label>
        <Input
          id="fullName"
          {...register("fullName", { required: "Este campo es requerido" })}
          placeholder="Ingresá tu nombre completo"
          className="rounded-md border border-muted-foreground/30 focus:border-accent font-normal text-sm py-2.5 bg-white"
        />
        {errors.fullName && (
          <p className="text-sm text-red-500 mt-1 font-medium">{errors.fullName.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email" className="text-foreground mb-1.5 block font-normal text-sm">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            placeholder="tucorreo@ejemplo.com"
            className="rounded-md border border-muted-foreground/30 focus:border-accent font-normal text-sm py-2.5 bg-white"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1 font-medium">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-foreground mb-1.5 block font-normal text-sm">
            Teléfono / WhatsApp
          </Label>
          <Input
            id="phone"
            {...register("phone", { required: "Este campo es requerido" })}
            placeholder="11 1234-5678"
            className="rounded-md border border-muted-foreground/30 focus:border-accent font-normal text-sm py-2.5 bg-white"
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1 font-medium">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="curtainType" className="text-foreground mb-1.5 block font-normal text-sm">
            Tipo de cortina
          </Label>
          <Controller
            name="curtainType"
            control={control}
            rules={{ required: "Seleccioná un tipo de cortina" }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="rounded-md border border-muted-foreground/30 focus:border-accent font-normal text-sm h-10 bg-white">
                  <SelectValue placeholder="Seleccioná un tipo" />
                </SelectTrigger>
                <SelectContent>
                  {curtainTypes.map((type) => (
                    <SelectItem key={type} value={type} className="font-normal text-sm">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.curtainType && (
            <p className="text-sm text-red-500 mt-1 font-medium">{errors.curtainType.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="room" className="text-foreground mb-1.5 block font-normal text-sm">
            Ambiente
          </Label>
          <Controller
            name="room"
            control={control}
            rules={{ required: "Seleccioná un ambiente" }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="rounded-md border border-muted-foreground/30 focus:border-accent font-normal text-sm h-10 bg-white">
                  <SelectValue placeholder="¿Dónde va la cortina?" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((r) => (
                    <SelectItem key={r} value={r} className="font-normal text-sm">
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.room && (
            <p className="text-sm text-red-500 mt-1 font-medium">{errors.room.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="message" className="text-foreground mb-1.5 block font-normal text-sm">
          Mensaje (opcional)
        </Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Contanos sobre tus necesidades, medidas aproximadas, o cualquier consulta..."
          className="rounded-md border border-muted-foreground/30 focus:border-accent font-normal text-sm min-h-[100px] resize-none py-2.5 bg-white"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-accent text-white hover:bg-accent/90 py-3 text-base font-semibold tracking-wide shadow-md hover:shadow-lg transition-all hover:scale-[1.01]"
      >
        {isSubmitting ? "Enviando..." : "Solicitar cotización"}
      </Button>
    </form>
  );
}