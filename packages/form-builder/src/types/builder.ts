import type { ReactNode } from "react";
import type { UseFormProps, UseFormReturn, FieldValues } from "react-hook-form";
import type { Input } from "./inputs";

type ActionCreator<T extends FieldValues> = (actionArg: {
  formMethods: UseFormReturn<T>;
  name: string;
  path?: string;
}) => ReactNode;

type ListCard = {
  isList: false;
};
type NormalCard = {
  isList: true;
};

type Card<T extends FieldValues> = (ListCard | NormalCard) & {
  title: ReactNode;
  name: string;
  inputs: Input<T>[];
  action?: ActionCreator<T>;
};

type BuilderProps<TFormValues extends FieldValues> = {
  onSubmit: (v: TFormValues) => void;
  cards: Card<TFormValues>[];
  formId: string;
  defaultValues: UseFormProps<TFormValues>["defaultValues"];
};

export type {
  BuilderProps,
  Card,
};
