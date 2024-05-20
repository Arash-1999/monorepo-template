import { Rating } from "@mui/material";
import { Controller, type UseFormReturn } from "react-hook-form";

type Props = {
  formMethods: UseFormReturn;
  name: string;
};

const RatingInput = ({ formMethods, name, }: Props) => {
  return (
    <Controller
      control={formMethods.control}
      name={name}
      render={({ field: { onChange, ref, value, disabled }, }) => (
        <Rating
          ref={ref}
          value={value || 0}
          size="large"
          onChange={(_ ,v) => {
            onChange(v);
          }}
          disabled={disabled}
        />
      )}
    />
  );
};

export default RatingInput;
