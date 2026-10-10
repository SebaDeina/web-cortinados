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
import { ArrowRight, Loader2 } from "lucide-react";

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

const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground";
const fieldClass =
  "h-12 w-full rounded-lg border border-black/10 bg-[#fafaf8] px-4 text-sm font-normal shadow-none transition-colors placeholder:text-muted-foreground/60 hover:border-black/20 focus-visible:border-accent focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-accent/15";
const errorClass = "mt-1.5 text-xs font-medium text-red-600";

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(26,26,26,0.25)] md:p-10"
    >
      <div>
        <Label htmlFor="fullName" className={labelClass}>
          Nombre y apellido
        </Label>
        <Input
          id="fullName"
          {...register("fullName", { required: "Este campo es requerido" })}
          placeholder="Ingresá tu nombre completo"
          className={fieldClass}
        />
        {errors.fullName && (
          <p className={errorClass}>{errors.fullName.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="email" className={labelClass}>
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
            className={fieldClass}
          />
          {errors.email && (
            <p className={errorClass}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className={labelClass}>
            Teléfono / WhatsApp
          </Label>
          <Input
            id="phone"
            {...register("phone", { required: "Este campo es requerido" })}
            placeholder="11 1234-5678"
            className={fieldClass}
          />
          {errors.phone && (
            <p className={errorClass}>{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="curtainType" className={labelClass}>
            Tipo de cortina
          </Label>
          <Controller
            name="curtainType"
            control={control}
            rules={{ required: "Seleccioná un tipo de cortina" }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={`${fieldClass} data-[size=default]:h-12 data-[placeholder]:text-muted-foreground/60`}>
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
            <p className={errorClass}>{errors.curtainType.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="room" className={labelClass}>
            Ambiente
          </Label>
          <Controller
            name="room"
            control={control}
            rules={{ required: "Seleccioná un ambiente" }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={`${fieldClass} data-[size=default]:h-12 data-[placeholder]:text-muted-foreground/60`}>
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
            <p className={errorClass}>{errors.room.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="message" className={labelClass}>
          Mensaje (opcional)
        </Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Contanos sobre tus necesidades, medidas aproximadas, o cualquier consulta..."
          className={`${fieldClass} h-auto min-h-[120px] resize-none py-3`}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="group h-12 w-full rounded-lg bg-accent text-base font-semibold tracking-wide text-white shadow-md transition-all hover:bg-accent/90 hover:shadow-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            Solicitar cotización
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>
    </form>
  );
}