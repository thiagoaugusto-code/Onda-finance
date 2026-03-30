import { z } from "zod";
import { useAccountStore } from "../../dashboard/store/account.store";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const transferSchema = z.object({
  amount: z.number().min(0.01, "Valor deve ser maior que 0"),
  description: z.string().min(1, "Descrição é obrigatória"),
});

type TransferForm = z.infer<typeof transferSchema>;

export function TransferPage() {
  const transfer = useAccountStore((s) => s.transfer);
  const navigate = useNavigate();

  function onSubmit(data: TransferForm) {
    transfer(data.amount, data.description);
    navigate("/dashboard");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Transferência</CardTitle>
        </CardHeader>
        <CardContent>
          <Form
            schema={transferSchema}
            defaultValues={{ amount: 0, description: "" }}
            onSubmit={onSubmit}
          >
            <FormField
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="amount">Valor</FormLabel>
                  <FormControl>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
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
                  <FormLabel htmlFor="description">Descrição</FormLabel>
                  <FormControl>
                    <Input id="description" {...field} />
                  </FormControl>
                  <FormMessage name="description" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Transferir
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}