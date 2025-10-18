import { Button } from "@/components/ui/button";
import { Recycle, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-recycle.jpg";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Recycle className="w-4 h-4" />
              Plataforma de Reciclagem Colaborativa
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Conectando Pessoas pela
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Sustentabilidade</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Una cidadãos, associações de catadores e coletores em uma plataforma integrada para coleta inteligente de materiais recicláveis.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/registro-ponto">
                <Button variant="hero" size="lg">
                  <MapPin className="w-5 h-5" />
                  Registrar Ponto de Coleta
                </Button>
              </Link>
              <Link to="/associacao">
                <Button variant="secondary" size="lg">
                  <Users className="w-5 h-5" />
                  Área da Associação
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Pontos Ativos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">50+</div>
                <div className="text-sm text-muted-foreground">Coletores</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">5ton</div>
                <div className="text-sm text-muted-foreground">Recicladas</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Pessoas trabalhando juntas na reciclagem de materiais" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
