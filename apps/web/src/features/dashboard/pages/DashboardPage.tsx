import { BalanceCard } from "../components/BalanceCard";
import { TransactionList } from "../components/TransactionList";
import { useAccountStore } from "../store/account.store";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardPage() {
  const { accounts } = useAccountStore();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-4">
          <Button onClick={() => navigate("/transfer")}>Transferir entre Contas</Button>
          <Button variant="outline" onClick={handleLogout}>Sair</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader>
              <CardTitle>{account.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <BalanceCard balance={account.balance} />
              <TransactionList transactions={account.transactions} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}