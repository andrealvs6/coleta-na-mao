import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Package, CheckCircle, Route } from "lucide-react";

// Mock data - será substituído por dados reais do backend
const mockPontos = [
  {
    id: 1,
    endereco: "Rua das Flores, 123 - Centro",
    materialTipo: "Plástico",
    quantidade: "5kg",
    horario: "08:00 - 12:00",
    status: "pendente",
  },
  {
    id: 2,
    endereco: "Av. Brasil, 456 - Jardim",
    materialTipo: "Papel/Papelão",
    quantidade: "3 sacos",
    horario: "14:00 - 18:00",
    status: "pendente",
  },
  {
    id: 3,
    endereco: "Rua São Paulo, 789 - Vila Nova",
    materialTipo: "Metal",
    quantidade: "2kg",
    horario: "09:00 - 17:00",
    status: "em_rota",
  },
  {
    id: 4,
    endereco: "Rua Santos, 321 - Bairro Alto",
    materialTipo: "Vidro",
    quantidade: "10 unidades",
    horario: "10:00 - 16:00",
    status: "coletado",
  },
];

const Associacao = () => {
  const navigate = useNavigate();
  const [pontos] = useState(mockPontos);

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pendente: { label: "Pendente", className: "bg-accent" },
      em_rota: { label: "Em Rota", className: "bg-secondary" },
      coletado: { label: "Coletado", className: "bg-primary" },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <Badge className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    );
  };

  const pontosStats = {
    pendentes: pontos.filter(p => p.status === "pendente").length,
    emRota: pontos.filter(p => p.status === "em_rota").length,
    coletados: pontos.filter(p => p.status === "coletado").length,
  };

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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard da Associação</h1>
          <p className="text-muted-foreground">
            Gerencie pontos de coleta e organize rotas para os coletores
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pontos Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{pontosStats.pendentes}</div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Em Rota
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{pontosStats.emRota}</div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Coletados Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{pontosStats.coletados}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Pontos de Coleta
                </CardTitle>
                <CardDescription>
                  Visualize e organize os pontos registrados
                </CardDescription>
              </div>
              <Button variant="secondary">
                <Route className="w-4 h-4 mr-2" />
                Criar Rota
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pontos.map((ponto) => (
                <Card key={ponto.id} className="border shadow-sm hover:shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{ponto.endereco}</span>
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

                      <div className="flex items-center gap-2">
                        {getStatusBadge(ponto.status)}
                        {ponto.status === "pendente" && (
                          <Button size="sm" variant="outline">
                            Adicionar à Rota
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Associacao;
