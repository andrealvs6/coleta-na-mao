import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, ArrowLeft, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const materialTypes = [
  "Plástico",
  "Papel/Papelão",
  "Metal",
  "Vidro",
  "Eletrônicos",
  "Óleo de Cozinha",
  "Outros",
];

const RegistroPonto = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    endereco: "",
    materialTipo: "",
    quantidade: "",
    horarioInicio: "",
    horarioFim: "",
    observacoes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.endereco || !formData.materialTipo || !formData.quantidade) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Ponto registrado com sucesso!",
      description: "Sua solicitação foi enviada para as associações da região.",
    });
    
    setTimeout(() => navigate("/"), 2000);
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

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <MapPin className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Registrar Ponto de Coleta</h1>
            <p className="text-muted-foreground">
              Informe onde temos materiais recicláveis para coleta
            </p>
          </div>

          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Informações do Ponto
              </CardTitle>
              <CardDescription>
                Preencha os dados sobre o material disponível para coleta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço Completo *</Label>
                  <Input
                    id="endereco"
                    placeholder="Rua, número, bairro, cidade"
                    value={formData.endereco}
                    onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="materialTipo">Tipo de Material *</Label>
                    <Select 
                      value={formData.materialTipo}
                      onValueChange={(value) => setFormData({ ...formData, materialTipo: value })}
                    >
                      <SelectTrigger id="materialTipo">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {materialTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantidade">Quantidade Estimada *</Label>
                    <Input
                      id="quantidade"
                      placeholder="Ex: 5kg, 2 sacos, 10 unidades"
                      value={formData.quantidade}
                      onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="horarioInicio">Horário Inicial</Label>
                    <Input
                      id="horarioInicio"
                      type="time"
                      value={formData.horarioInicio}
                      onChange={(e) => setFormData({ ...formData, horarioInicio: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="horarioFim">Horário Final</Label>
                    <Input
                      id="horarioFim"
                      type="time"
                      value={formData.horarioFim}
                      onChange={(e) => setFormData({ ...formData, horarioFim: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações Adicionais</Label>
                  <Textarea
                    id="observacoes"
                    placeholder="Informações adicionais que possam ajudar na coleta..."
                    value={formData.observacoes}
                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  Registrar Ponto de Coleta
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegistroPonto;
