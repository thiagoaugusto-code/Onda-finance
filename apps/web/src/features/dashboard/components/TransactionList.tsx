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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Últimas transações</h2>

      {transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📊</div>
          <p>Nenhuma transação ainda</p>
        </div>
      ) : (
        transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center rounded-lg border border-gray-200 p-4 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex-1">
              <span className="font-medium text-gray-900">{transaction.description}</span>
              {transaction.fromAccount && transaction.toAccount && (
                <div className="text-sm text-gray-500 mt-1 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  {transaction.fromAccount} → {transaction.toAccount}
                </div>
              )}
            </div>
            <span
              className={`font-bold text-lg ${
                transaction.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {transaction.type === "income" ? "+" : "-"}R$ {transaction.amount.toFixed(2)}
            </span>
          </div>
        ))
      )}
    </div>
  );
}