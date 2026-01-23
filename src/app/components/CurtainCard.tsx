interface CurtainCardProps {
  title: string;
  description: string;
  imageUrl: string;
  hoverImageUrl?: string;
  onClick?: () => void;
}

export function CurtainCard({ title, description, imageUrl, hoverImageUrl, onClick }: CurtainCardProps) {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative overflow-hidden aspect-[3/4] bg-muted mb-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {hoverImageUrl && (
          <img
            src={hoverImageUrl}
            alt={`${title} - vista alternativa`}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <h4 className="mb-2 text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground font-light leading-relaxed">
        {description}
      </p>
    </div>
  );
}