import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  balance: number;
};

export function BalanceCard({ balance }: Props) {
  return (
    <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-lg font-semibold opacity-90">Saldo atual</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold tracking-wide">
          R$ {balance.toFixed(2)}
        </p>
        <div className="mt-2 text-sm opacity-80">
          Disponível para uso
        </div>
      </CardContent>
    </Card>
  );
}