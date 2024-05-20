import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import { CountrySelector } from "@repo/ui/inputs";

type Props = {
  formMethods: UseFormReturn;
  name: string;
  label: string;
}

const CountryInput = ({ formMethods, name, label, }: Props) => {
  return (
    <Controller
      control={formMethods.control}
      name={name}
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
