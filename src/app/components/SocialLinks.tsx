import { Instagram, Facebook, Mail } from "lucide-react";

interface SocialLinksProps {
  className?: string;
  variant?: "horizontal" | "vertical";
}

export function SocialLinks({ className = "", variant = "horizontal" }: SocialLinksProps) {
  const socials = [
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/cortinados", // Replace with actual URL
      ariaLabel: "Seguinos en Instagram",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/cortinados", // Replace with actual URL
      ariaLabel: "Seguinos en Facebook",
    },
  ];

  const containerClass =
    variant === "horizontal"
      ? "flex items-center gap-4"
      : "flex flex-col items-start gap-3";

  return (
    <div className={`${containerClass} ${className}`}>
      {variant === "horizontal" && (
        <span className="text-sm text-muted-foreground font-light">
          Seguinos en:
        </span>
      )}
      <div className={variant === "horizontal" ? "flex gap-3" : "flex flex-col gap-3"}>
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-300"
              aria-label={social.ariaLabel}
            >
              <Icon className="w-5 h-5" />
              {variant === "vertical" && (
                <span className="text-sm font-light">{social.name}</span>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
