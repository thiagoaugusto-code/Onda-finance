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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Gerencie suas contas bancárias</p>
          </div>
          <div className="flex space-x-4">
            <Button
              onClick={() => navigate("/transfer")}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Transferir entre Contas
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              Sair
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {accounts.map((account) => (
            <Card key={account.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  {account.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <BalanceCard balance={account.balance} />
                <TransactionList transactions={account.transactions} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}