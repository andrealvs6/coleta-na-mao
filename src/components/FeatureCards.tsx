import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building2, Truck } from "lucide-react";

const features = [
  {
    icon: User,
    title: "Para Cidadãos",
    description: "Registre pontos de coleta informando tipo de material, quantidade e horário disponível para retirada.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Building2,
    title: "Para Associações",
    description: "Organize e visualize todos os pontos de coleta, planeje rotas eficientes e coordene os coletores.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Truck,
    title: "Para Coletores",
    description: "Receba instruções de rotas otimizadas e valide os pontos de coleta após a retirada dos materiais.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const FeatureCards = () => {
  return (
    <div className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma completa que conecta todos os participantes do processo de reciclagem
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="border-none shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)] hover:-translate-y-1 bg-gradient-to-b from-card to-card/50"
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl ${feature.bgColor} ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
