import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Truck, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, profile } = useAuth();

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
            {!user ? (
              <>
                <Link to="/cadastro">
                  <Button variant="default" size="lg">
                    <User className="w-5 h-5 mr-2" />
                    Criar Conta
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Fazer Login
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {profile?.user_type === "cidadao" && (
                  <Link to="/registro-ponto">
                    <Button variant="default" size="lg">
                      Registrar Ponto de Coleta
                    </Button>
                  </Link>
                )}
                {profile?.user_type === "associacao" && (
                  <Link to="/associacao">
                    <Button variant="default" size="lg">
                      Área da Associação
                    </Button>
                  </Link>
                )}
                {profile?.user_type === "coletor" && (
                  <Link to="/coletor">
                    <Button variant="default" size="lg">
                      <Truck className="w-5 h-5 mr-2" />
                      Área do Coletor
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
