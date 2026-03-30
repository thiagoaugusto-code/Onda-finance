type Transaction = {
  id: number;
  type: "income" | "expense";
  description: string;
  amount: number;
  fromAccount?: string;
  toAccount?: string;
};

type Props = {
  transactions: Transaction[];
};

export function TransactionList({ transactions }: Props) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Últimas transações</h2>

      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex justify-between rounded-lg border p-3"
        >
          <div>
            <span>{transaction.description}</span>
            {transaction.fromAccount && transaction.toAccount && (
              <div className="text-sm text-gray-500">
                {transaction.fromAccount} → {transaction.toAccount}
              </div>
            )}
          </div>
          <span
            className={
              transaction.type === "income" ? "text-green-600" : "text-red-600"
            }
          >
            {transaction.type === "income" ? "+" : "-"}R$ {transaction.amount.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}