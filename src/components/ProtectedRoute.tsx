import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type UserType = "cidadao" | "associacao" | "coletor";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserType[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login");
      } else if (allowedRoles && profile && !allowedRoles.includes(profile.user_type)) {
        navigate("/");
      }
    }
  }, [user, profile, loading, allowedRoles, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (allowedRoles && profile && !allowedRoles.includes(profile.user_type)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
