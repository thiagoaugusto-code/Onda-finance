import { z } from "zod";
import { useAccountStore } from "../../dashboard/store/account.store";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

// Schema de validação para o formulário de transferência usando Zod
// Define as regras de validação para cada campo do formulário
const transferSchema = z.object({
  amount: z.number().min(0.01, "Valor deve ser maior que 0"), // Valor mínimo de R$ 0,01
  description: z.string().min(1, "Descrição é obrigatória"), // Descrição não pode ser vazia
  toAccountId: z.string().min(1, "Selecione uma conta de destino"), // Conta de destino obrigatória
});

// Tipo TypeScript inferido do schema Zod para tipagem do formulário
type TransferForm = z.infer<typeof transferSchema>;

// Componente principal da página de transferência entre contas
export function TransferPage() {
  // Hooks do Zustand para gerenciar estado das contas e navegação
  const { transfer, accounts, currentAccountId } = useAccountStore(); // Store de contas
  const navigate = useNavigate(); // Hook para navegação programática

  // Estado local para controlar exibição da mensagem de erro de saldo insuficiente
  const [insufficientFundsError, setInsufficientFundsError] = useState(false);

  // Filtra as contas disponíveis para transferência (exclui a conta atual)
  const availableAccounts = accounts.filter(a => a.id !== currentAccountId);

  // Encontra a conta atual do usuário para validação de saldo
  const currentAccount = accounts.find(a => a.id === currentAccountId);

  // Função executada quando o formulário é submetido
  function onSubmit(data: TransferForm) {
    // Validação de saldo insuficiente antes de executar a transferência
    if (!currentAccount || data.amount > currentAccount.balance) {
      setInsufficientFundsError(true); // Exibe mensagem de erro
      return; // Interrompe a execução
    }

    // Se saldo for suficiente, prossegue com a transferência
    setInsufficientFundsError(false); // Remove mensagem de erro se existir
    transfer(data.amount, data.description, data.toAccountId); // Executa transferência
    navigate("/dashboard"); // Redireciona para dashboard após sucesso
  }

  return (
    // Container principal com fundo gradiente e centralização
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      {/* Card principal do formulário com sombra e efeitos hover */}
      <Card className="w-full max-w-md bg-white rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-0">
        {/* Cabeçalho do card com título e descrição */}
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Transferência</CardTitle>
          <p className="text-gray-600">Transfira dinheiro entre suas contas</p>
        </CardHeader>

        {/* Conteúdo do card com espaçamento vertical */}
        <CardContent className="space-y-6">
          {/* Mensagem de erro de saldo insuficiente - só aparece quando insufficientFundsError é true */}
          {insufficientFundsError && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
              {/* Indicador visual de erro com ícone e texto */}
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <span className="text-red-700 font-semibold text-lg">Saldo insuficiente</span>
              </div>
              {/* Texto explicativo do erro */}
              <p className="text-red-600 text-sm mt-2">
                O valor solicitado é maior que o saldo disponível na conta atual.
              </p>
            </div>
          )}

          {/* Formulário de transferência com validação Zod */}
          <Form
            schema={transferSchema}
            defaultValues={{ amount: 0, description: "", toAccountId: "" }}
            onSubmit={onSubmit}
          >
            {/* Campo do valor da transferência */}
            <FormField
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="amount" className="text-gray-700 font-semibold">Valor</FormLabel>
                  <FormControl>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01" // Permite centavos
                      className="h-12 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} // Converte string para number
                    />
                  </FormControl>
                  <FormMessage name="amount" /> {/* Exibe erros de validação do campo */}
                </FormItem>
              )}
            />
            {/* Campo da descrição da transferência */}
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description" className="text-gray-700 font-semibold">Descrição</FormLabel>
                  <FormControl>
                    <Input
                      id="description"
                      className="h-12 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage name="description" /> {/* Exibe erros de validação do campo */}
                </FormItem>
              )}
            />

            {/* Campo de seleção da conta de destino */}
            <FormField
              name="toAccountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Conta de Destino</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:border-blue-400">
                        <SelectValue placeholder="Selecione uma conta de destino" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white border-2 border-gray-200 shadow-xl">
                      {/* Mapeia todas as contas disponíveis para transferência */}
                      {availableAccounts.map((account) => (
                        <SelectItem
                          key={account.id}
                          value={account.id}
                          className="text-lg py-3 px-4 hover:bg-blue-50 focus:bg-blue-50 cursor-pointer transition-colors duration-150"
                        >
                          {/* Layout visual da opção com indicador e informações */}
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div> {/* Indicador visual */}
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">{account.name}</span> {/* Nome da conta */}
                              <span className="text-sm text-gray-500">Saldo: R$ {account.balance.toFixed(2)}</span> {/* Saldo disponível */}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage name="toAccountId" /> {/* Exibe erros de validação do campo */}
                </FormItem>
              )}
            />
            {/* Container do botão de submit com espaçamento superior */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Transferir {/* Botão que dispara a validação e transferência */}
              </Button>
            </div>
          </Form>

          {/* Seção de navegação - botão para voltar ao dashboard */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")} // Navegação programática para dashboard
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              ← Voltar ao Dashboard {/* Botão de navegação secundária */}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}