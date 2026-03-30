import { create } from "zustand";
import { persist } from "zustand/middleware";

type Transaction = {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
  fromAccount?: string;
  toAccount?: string;
};

type Account = {
  id: string;
  name: string;
  balance: number;
  transactions: Transaction[];
};

type AccountState = {
  accounts: Account[];
  currentAccountId: string;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  transfer: (amount: number, description: string, toAccountId: string) => void;
  getCurrentAccount: () => Account;
  setCurrentAccountId: (id: string) => void;
};

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      accounts: [
        {
          id: "main",
          name: "Conta Principal",
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
        },
        {
          id: "secondary",
          name: "Conta Secundária",
          balance: 1000.0,
          transactions: [],
        },
      ],
      currentAccountId: "main",
      addTransaction: (transaction) =>
        set((state) => {
          const account = state.accounts.find(a => a.id === state.currentAccountId);
          if (!account) return state;
          const newTransaction = { ...transaction, id: Date.now() };
          return {
            accounts: state.accounts.map(a =>
              a.id === state.currentAccountId
                ? { ...a, transactions: [...a.transactions, newTransaction] }
                : a
            ),
          };
        }),
      transfer: (amount, description, toAccountId) =>
        set((state) => {
          const fromAccount = state.accounts.find(a => a.id === state.currentAccountId);
          const toAccount = state.accounts.find(a => a.id === toAccountId);
          if (!fromAccount || !toAccount || fromAccount.balance < amount) return state;

          const expenseTransaction: Transaction = {
            id: Date.now(),
            type: "expense",
            amount,
            description,
            fromAccount: fromAccount.name,
            toAccount: toAccount.name,
          };
          const incomeTransaction: Transaction = {
            id: Date.now() + 1,
            type: "income",
            amount,
            description,
            fromAccount: fromAccount.name,
            toAccount: toAccount.name,
          };

          return {
            accounts: state.accounts.map(a => {
              if (a.id === state.currentAccountId) {
                return {
                  ...a,
                  balance: a.balance - amount,
                  transactions: [...a.transactions, expenseTransaction],
                };
              } else if (a.id === toAccountId) {
                return {
                  ...a,
                  balance: a.balance + amount,
                  transactions: [...a.transactions, incomeTransaction],
                };
              }
              return a;
            }),
          };
        }),
      getCurrentAccount: () => {
        const state = get();
        return state.accounts.find(a => a.id === state.currentAccountId)!;
      },
      setCurrentAccountId: (id: string) => {
        set({ currentAccountId: id });
      },
    }),
    {
      name: "account-storage",
    }
  )
);