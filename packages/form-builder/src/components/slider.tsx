import { Box, Slider, Typography } from "@mui/material";
import { Controller, type UseFormReturn } from "react-hook-form";

type Props = {
  formMethods: UseFormReturn;
  name: string;
  label: string;
  count?: number;
  min?: number;
  max?: number;
  step?: number;
  scale?: (v: number) => number;
};

const SliderInput = ({
  formMethods,
  name,
  label,
  min = 0,
  max = 100,
  count = 1,
  step = 1,
}: Props) => {
  return (
    <Controller
      defaultValue={count > 1 ? Array.from({length: count}, (_, i) => Math.floor((i + 1) * ((max - min) / (count + 1) ) + min)) : 0}
      control={formMethods.control}
      name={name}
      render={({ field: { onChange, ref, value, disabled }, }) => (
        <Box sx={{ px: "12px", }}>
          <Typography>
            {label}
          </Typography>
          <Slider
            min={min}
            max={max}
            ref={ref}
            step={step}
            value={value}
            onChange={(_ ,v) => {
              onChange(v);
            }}
            disabled={disabled}
          />
        </Box>
      )}
    />
  );
};

export default SliderInput;
