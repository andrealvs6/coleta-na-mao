import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Truck } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeatureCards />
      
      <div className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Seja você um cidadão consciente, uma associação de catadores ou um coletor, 
            junte-se a nós nessa jornada pela sustentabilidade.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/registro-ponto">
              <Button variant="default" size="lg">
                Registrar Ponto de Coleta
              </Button>
            </Link>
            <Link to="/coletor">
              <Button variant="outline" size="lg">
                <Truck className="w-5 h-5 mr-2" />
                Área do Coletor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
