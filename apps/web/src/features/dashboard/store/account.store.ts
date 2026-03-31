import { create } from "zustand";
import { persist } from "zustand/middleware";

// Tipo que define a estrutura de uma transação bancária
type Transaction = {
  id: number; // Identificador único da transação
  type: "income" | "expense"; // Tipo: receita ou despesa
  amount: number; // Valor da transação
  description: string; // Descrição da transação
  fromAccount?: string; // Conta de origem (opcional, usado em transferências)
  toAccount?: string; // Conta de destino (opcional, usado em transferências)
};

// Tipo que define a estrutura de uma conta bancária
type Account = {
  id: string; // Identificador único da conta
  name: string; // Nome da conta (ex: "Conta Principal", "Conta Secundária")
  balance: number; // Saldo atual da conta
  transactions: Transaction[]; // Lista de transações da conta
};

// Interface que define o estado e ações da store de contas
type AccountState = {
  accounts: Account[]; // Array com todas as contas disponíveis
  currentAccountId: string; // ID da conta atualmente selecionada
  addTransaction: (transaction: Omit<Transaction, "id">) => void; // Adiciona nova transação
  transfer: (amount: number, description: string, toAccountId: string) => void; // Realiza transferência entre contas
  getCurrentAccount: () => Account; // Retorna a conta atualmente selecionada
  setCurrentAccountId: (id: string) => void; // Define qual conta está ativa
};

// Store principal de gerenciamento de contas usando Zustand com persistência
export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      // Estado inicial com dados mock das contas
      accounts: [
        {
          id: "main",
          name: "Conta Principal",
          balance: 100000.75, // Saldo inicial alto para testes
          transactions: [
            {
              id: 1,
              type: "income",
              amount: 12000, // Receita de PIX
              description: "PIX recebido",
            },
            {
              id: 2,
              type: "expense",
              amount: 250, // Despesa com mercado
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
      // Função principal de transferência entre contas
      // VALIDAÇÃO DE SALDO: Verifica se a conta de origem tem saldo suficiente
      transfer: (amount, description, toAccountId) =>
        set((state) => {
          // Busca as contas de origem e destino
          const fromAccount = state.accounts.find(a => a.id === state.currentAccountId);
          const toAccount = state.accounts.find(a => a.id === toAccountId);

          // VALIDAÇÃO: Se contas não existem ou saldo insuficiente, interrompe a transferência
          if (!fromAccount || !toAccount || fromAccount.balance < amount) return state;

          // Cria transação de despesa para a conta de origem
          const expenseTransaction: Transaction = {
            id: Date.now(),
            type: "expense",
            amount,
            description,
            fromAccount: fromAccount.name, // Registra conta de origem
            toAccount: toAccount.name, // Registra conta de destino
          };

          // Cria transação de receita para a conta de destino
          const incomeTransaction: Transaction = {
            id: Date.now() + 1, // ID único diferente
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
      // Função auxiliar que retorna a conta atualmente selecionada
      getCurrentAccount: () => {
        const state = get();
        return state.accounts.find(a => a.id === state.currentAccountId)!;
      },
      // Função para alterar qual conta está ativa no momento
      setCurrentAccountId: (id: string) => {
        set({ currentAccountId: id });
      },
    }),
    // Configuração do middleware de persistência - salva estado no localStorage
    {
      name: "account-storage", // Chave usada para armazenar no localStorage
    }
  )
);