import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import { TextField } from "@mui/material";

type Props = {
  formMethods: UseFormReturn;
  name: string;
  label: string;
};

const TextInput = ({ formMethods, name, label }: Props) => {
  return (
    <Controller
      name={name}
      control={formMethods.control}
      render={({ field: { ref, value, onChange, onBlur, name, disabled }, }) => (
        <TextField
          InputLabelProps={{
            shrink: Boolean(value),
          }}
          disabled={disabled}
          fullWidth
          inputRef={ref}
          label={label}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          type="text"
          value={value || ""}
        />
      )}
    />
  );
};

export default TextInput;
