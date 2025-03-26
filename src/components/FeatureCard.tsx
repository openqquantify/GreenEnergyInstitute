
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

const FeatureCard = ({ title, description, icon: Icon, delay = 0 }: FeatureCardProps) => {
  const animationDelay = `animate-delay-${delay}`;

  return (
    <div className={`card-glass p-6 rounded-xl transition-all duration-300 reveal ${animationDelay} hover:shadow-md`}>
      <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
