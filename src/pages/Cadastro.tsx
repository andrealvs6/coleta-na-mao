import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, ArrowLeft, Recycle, User, Building2, Truck } from "lucide-react";

type UserType = "cidadao" | "associacao" | "coletor";

const userTypeInfo = {
  cidadao: {
    label: "Cidadão",
    description: "Registre pontos de coleta de recicláveis",
    icon: User,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  associacao: {
    label: "Associação",
    description: "Organize rotas e gerencie coletas",
    icon: Building2,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  coletor: {
    label: "Coletor",
    description: "Receba rotas e valide coletas",
    icon: Truck,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
};

const Cadastro = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "" as UserType | "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userType) {
      toast({
        title: "Tipo de usuário obrigatório",
        description: "Por favor, selecione o tipo de usuário.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "As senhas digitadas não são iguais.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(
        formData.email,
        formData.password,
        formData.nomeCompleto,
        formData.userType as UserType
      );

      if (error) {
        if (error.message.includes("already registered")) {
          toast({
            title: "Email já cadastrado",
            description: "Este email já está em uso. Tente fazer login.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro ao cadastrar",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "Cadastro realizado!",
        description: "Você pode fazer login agora.",
      });

      setTimeout(() => navigate("/login"), 1500);
    } catch (error: any) {
      toast({
        title: "Erro inesperado",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
            <Recycle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Criar Conta</h1>
          <p className="text-muted-foreground">
            Junte-se a nós na missão pela sustentabilidade
          </p>
        </div>

        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" />
              Cadastro
            </CardTitle>
            <CardDescription>
              Preencha os dados para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userType">Tipo de Usuário *</Label>
                <Select 
                  value={formData.userType}
                  onValueChange={(value) => setFormData({ ...formData, userType: value as UserType })}
                  disabled={loading}
                >
                  <SelectTrigger id="userType">
                    <SelectValue placeholder="Selecione o tipo de usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(userTypeInfo).map(([key, info]) => {
                      const Icon = info.icon;
                      return (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <div className={`p-1 rounded ${info.bgColor}`}>
                              <Icon className={`w-4 h-4 ${info.color}`} />
                            </div>
                            <div>
                              <div className="font-medium">{info.label}</div>
                              <div className="text-xs text-muted-foreground">{info.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomeCompleto">Nome Completo *</Label>
                <Input
                  id="nomeCompleto"
                  placeholder="Seu nome completo"
                  value={formData.nomeCompleto}
                  onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Senha *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repita a senha"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={loading}
              >
                {loading ? "Cadastrando..." : "Criar Conta"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Faça login aqui
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cadastro;
