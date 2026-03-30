import { create } from "zustand";
import { persist } from "zustand/middleware";

type Transaction = {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
};

type AccountState = {
  balance: number;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  transfer: (amount: number, description: string) => void;
};

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      balance: 4580.75,
      transactions: [
        {
          id: 1,
          type: "income",
          amount: 1200,
          description: "PIX recebido",
        },
        {
          id: 2,
          type: "expense",
          amount: 250,
          description: "Mercado",
        },
        {
          id: 3,
          type: "expense",
          amount: 89.9,
          description: "Uber",
        },
      ],
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...transaction, id: Date.now() },
          ],
        })),
      transfer: (amount, description) =>
        set((state) => ({
          balance: state.balance - amount,
          transactions: [
            ...state.transactions,
            {
              id: Date.now(),
              type: "expense",
              amount,
              description,
            },
          ],
        })),
    }),
    {
      name: "account-storage",
    }
  )
);