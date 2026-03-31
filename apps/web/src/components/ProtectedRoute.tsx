import { useAuthStore } from "@/features/auth/store/auth.store";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

type Props = {
  children: ReactNode;
};

/**
 * Componente de proteção de rotas que verifica autenticação do usuário
 *
 * Funcionalidades:
 * - Verifica se o usuário está logado usando Zustand (useAuthStore)
 * - Redireciona para página de login se não houver usuário autenticado
 * - Mostra loading state durante verificação para melhor UX
 * - Compatível com padrão shadcn/ui e Tailwind CSS
 * - Reutilizável para qualquer página privada da aplicação
 */
export function ProtectedRoute({ children }: Props) {
  const user = useAuthStore((s) => s.user);
  const [isLoading, setIsLoading] = useState(true);

  // Simula verificação de autenticação (pode ser removido se não necessário)
  useEffect(() => {
    // Pequeno delay para evitar flash de loading em autenticações rápidas
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Estado de loading - mostra spinner enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-sm bg-white rounded-xl shadow-2xl border-0">
          <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600 text-center font-medium">
              Verificando autenticação...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Usuário não autenticado - redireciona para login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Usuário autenticado - renderiza conteúdo protegido
  return <>{children}</>;
}