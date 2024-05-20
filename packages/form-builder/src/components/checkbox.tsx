import { FormControlLabel, Checkbox } from "@mui/material";
import { Controller, type UseFormReturn } from "react-hook-form";

type Props = {
  formMethods: UseFormReturn;
  name: string;
  label: string;
};

const CheckboxInput = ({ formMethods, name, label, }: Props) => {
  return (
    <Controller
      control={formMethods.control}
      name={name}
      render={({ field: { onChange, ref, value, disabled }, }) => (
        <FormControlLabel
          disabled={disabled}
          name={name}
          control={<Checkbox />}
          checked={value || false}
          onChange={onChange}
          inputRef={ref}
          label={label}
        />
      )}
    />
  );
};

export default CheckboxInput;
