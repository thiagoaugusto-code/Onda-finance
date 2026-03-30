import { z } from "zod";
import { useAccountStore } from "../../dashboard/store/account.store";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const transferSchema = z.object({
  amount: z.number().min(0.01, "Valor deve ser maior que 0"),
  description: z.string().min(1, "Descrição é obrigatória"),
  toAccountId: z.string().min(1, "Selecione uma conta de destino"),
});

type TransferForm = z.infer<typeof transferSchema>;

export function TransferPage() {
  const { transfer, accounts, currentAccountId } = useAccountStore();
  const navigate = useNavigate();

  const availableAccounts = accounts.filter(a => a.id !== currentAccountId);

  function onSubmit(data: TransferForm) {
    transfer(data.amount, data.description, data.toAccountId);
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-0">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Transferência</CardTitle>
          <p className="text-gray-600">Transfira dinheiro entre suas contas</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form
            schema={transferSchema}
            defaultValues={{ amount: 0, description: "", toAccountId: "" }}
            onSubmit={onSubmit}
          >
            <FormField
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="amount" className="text-gray-700 font-semibold">Valor</FormLabel>
                  <FormControl>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      className="h-12 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage name="amount" />
                </FormItem>
              )}
            />
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
                  <FormMessage name="description" />
                </FormItem>
              )}
            />
            <FormField
              name="toAccountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Conta de Destino</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200">
                        <SelectValue placeholder="Selecione uma conta" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id} className="text-lg py-3">
                          {account.name} - Saldo: R$ {account.balance.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage name="toAccountId" />
                </FormItem>
              )}
            />
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Transferir
              </Button>
            </div>
          </Form>
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              ← Voltar ao Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}