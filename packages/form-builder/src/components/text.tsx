import { Controller } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";
import { TextField } from "@mui/material";
import { InputBase } from "../types/internal";

type TextInputProps<TFormValues extends FieldValues> = InputBase<TFormValues> & {
  label: string;
};

const TextInput = <TFormValues extends FieldValues,>({
  formMethods,
  name,
  label,
}: TextInputProps<TFormValues>) => {
  return (
    <Controller
      name={name as Path<TFormValues>}
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
