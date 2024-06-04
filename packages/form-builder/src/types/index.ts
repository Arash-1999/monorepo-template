import type { UseFormReturn, FieldValues, } from "react-hook-form";
import type { Card } from "./builder";

export type CardCreatorProps<T extends FieldValues> = Omit<Card<T>, "isList"> & {
  formMethods: UseFormReturn<T>;
};

// export type { DeepPartial } from "react-hook-form";
export * from "./builder";
export * from "./inputs";
