import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Package, CheckCircle, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - rota do dia para o coletor
const mockRota = [
  {
    id: 1,
    ordem: 1,
    endereco: "Av. Brasil, 456 - Jardim",
    materialTipo: "Papel/Papelão",
    quantidade: "3 sacos",
    horario: "14:00 - 18:00",
    coletado: false,
  },
  {
    id: 2,
    ordem: 2,
    endereco: "Rua das Flores, 123 - Centro",
    materialTipo: "Plástico",
    quantidade: "5kg",
    horario: "08:00 - 12:00",
    coletado: false,
  },
  {
    id: 3,
    ordem: 3,
    endereco: "Rua São Paulo, 789 - Vila Nova",
    materialTipo: "Metal",
    quantidade: "2kg",
    horario: "09:00 - 17:00",
    coletado: false,
  },
];

const Coletor = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rota, setRota] = useState(mockRota);

  const handleValidarColeta = (id: number) => {
    setRota(rota.map(ponto => 
      ponto.id === id ? { ...ponto, coletado: true } : ponto
    ));
    
    toast({
      title: "Coleta validada!",
      description: "O ponto foi marcado como coletado com sucesso.",
    });
  };

  const pontosColetados = rota.filter(p => p.coletado).length;
  const totalPontos = rota.length;
  const progresso = Math.round((pontosColetados / totalPontos) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Minha Rota de Coleta</h1>
          <p className="text-muted-foreground">
            Siga a ordem dos pontos e valide cada coleta realizada
          </p>
        </div>

        <Card className="shadow-[var(--shadow-soft)] mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Progresso do Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pontos coletados</span>
                <span className="font-medium">{pontosColetados} de {totalPontos}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progresso}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {rota.map((ponto) => (
            <Card 
              key={ponto.id} 
              className={`shadow-[var(--shadow-soft)] ${ponto.coletado ? 'opacity-60' : ''}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      ponto.coletado 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {ponto.coletado ? <CheckCircle className="w-5 h-5" /> : ponto.ordem}
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{ponto.endereco}</h3>
                        {ponto.coletado && (
                          <Badge className="bg-primary">Coletado</Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          {ponto.materialTipo} - {ponto.quantidade}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {ponto.horario}
                        </div>
                      </div>
                    </div>

                    {!ponto.coletado && (
                      <div className="flex gap-2">
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ponto.endereco)}`, '_blank')}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Navegar
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleValidarColeta(ponto.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Validar Coleta
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {pontosColetados === totalPontos && (
          <Card className="shadow-[var(--shadow-soft)] mt-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Rota Concluída!</h3>
              <p className="text-muted-foreground">
                Parabéns! Você completou todos os pontos de coleta do dia.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Coletor;
