import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import RegistroPonto from "./pages/RegistroPonto";
import Associacao from "./pages/Associacao";
import Coletor from "./pages/Coletor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route 
              path="/registro-ponto" 
              element={
                <ProtectedRoute allowedRoles={["cidadao"]}>
                  <RegistroPonto />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/associacao" 
              element={
                <ProtectedRoute allowedRoles={["associacao"]}>
                  <Associacao />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/coletor" 
              element={
                <ProtectedRoute allowedRoles={["coletor"]}>
                  <Coletor />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
