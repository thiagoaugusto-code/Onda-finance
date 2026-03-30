import { BalanceCard } from "../components/BalanceCard";
import { TransactionList } from "../components/TransactionList";
import { useAccountStore } from "../store/account.store";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/auth.store";

export function DashboardPage() {
  const { balance, transactions } = useAccountStore();
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
        <div className="space-x-2">
          <Button onClick={() => navigate("/transfer")}>Transferir</Button>
          <Button variant="outline" onClick={handleLogout}>Sair</Button>
        </div>
      </div>
      <BalanceCard balance={balance} />
      <TransactionList transactions={transactions} />
    </div>
  );
}