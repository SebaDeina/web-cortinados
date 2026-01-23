import { type LucideIcon } from "lucide-react";

interface ServiceFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ServiceFeature({ icon: Icon, title, description }: ServiceFeatureProps) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="mb-4 text-accent">
        <Icon className="w-10 h-10 stroke-[1.5]" />
      </div>
      <h4 className="mb-2 text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground font-light leading-relaxed">
        {description}
      </p>
    </div>
  );
}
