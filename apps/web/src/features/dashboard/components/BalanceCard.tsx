import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  balance: number;
};

export function BalanceCard({ balance }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saldo atual</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">
          R$ {balance.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
}