interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full border-2 border-accent flex items-center justify-center mb-4 text-accent">
        <span className="text-xl">{number}</span>
      </div>
      <h4 className="mb-2 text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground font-light leading-relaxed">
        {description}
      </p>
    </div>
  );
}
