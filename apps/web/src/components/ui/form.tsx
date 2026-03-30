import * as React from "react";
import { useForm, FormProvider, useController, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

type FormProps = {
  schema: z.ZodSchema;
  defaultValues?: Record<string, any>;
  onSubmit: (data: any) => void;
  children: React.ReactNode;
};

export function Form({
  schema,
  defaultValues,
  onSubmit,
  children,
}: FormProps) {
  const methods = useForm({
    resolver: zodResolver(schema as any),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
}

type FormFieldProps = {
  name: string;
  render: (props: { field: any }) => React.ReactNode;
};

export function FormField({ name, render }: FormFieldProps) {
  const { field } = useController({ name });
  return render({ field });
}

type FormItemProps = {
  children: React.ReactNode;
  className?: string;
};

export function FormItem({ children, className }: FormItemProps) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

type FormLabelProps = {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
};

export function FormLabel({ children, className, htmlFor }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    >
      {children}
    </label>
  );
}

type FormControlProps = {
  children: React.ReactNode;
};

export function FormControl({ children }: FormControlProps) {
  return <div className="relative">{children}</div>;
}

type FormMessageProps = {
  name: string;
  className?: string;
};

export function FormMessage({ name, className }: FormMessageProps) {
  const { formState: { errors } } = useFormContext();
  const error = errors?.[name];
  if (!error || typeof error !== 'object' || !('message' in error) || typeof error.message !== 'string') return null;
  return (
    <p className={cn("text-sm font-medium text-destructive", className)}>
      {error.message}
    </p>
  );
}