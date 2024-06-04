import type { UseFormReturn, FieldValues, } from "react-hook-form";

type InputBase<TFormValues extends FieldValues> = {
  formMethods: UseFormReturn<TFormValues>;
  name: string;
};

export type {
  InputBase
};
