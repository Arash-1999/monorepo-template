import { Controller } from "react-hook-form";
import type { FieldValues, Path, } from "react-hook-form";
import { CountrySelector } from "@repo/ui/inputs";
import type { InputBase } from "../types/internal";

type CountryInputProps<TFormValues extends FieldValues> = InputBase<TFormValues> & {
  label: string;
}

const CountryInput = <TFormValues extends FieldValues>({
  formMethods,
  name,
  label,
}: CountryInputProps<TFormValues>) => {
  return (
    <Controller
      control={formMethods.control}
      name={name as Path<TFormValues>}
      render={({ field: { value, onChange, ref } }) => (
        <CountrySelector
          label={label}
          value={value || ""}
          onChange={(v) => {
            onChange(v);
          }}
          ref={ref}
        />
      )}
    />
  );
};

export default CountryInput;
