import { FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { Option } from "../types";

type Props = {
  formMethods: UseFormReturn;
  name: string;
  options: Option[];
};

const RadioInput = ({ formMethods, name, options, }: Props) => {
  return (
    <Controller
      control={formMethods.control}
      name={name}
      render={({field: { onChange, ref, value, disabled }, }) => (
        <RadioGroup
          ref={ref}
          row
          onChange={onChange}
          value={value || ""}
        >
          {options.map((option) => (
            <FormControlLabel
              disabled={disabled}
              key={option.value}
              name={name}
              control={<Radio />}
              label={option.title}
              value={option.value}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
};

export default RadioInput;
