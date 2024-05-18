import { type ReactNode } from "react";
import { type Input } from "./types";
import { type UseFormReturn, Controller } from "react-hook-form";
import ListForm from "./list-form";
import { Grid, TextField } from "@mui/material";
import CountryInput from "./components/country-input";

const createContainer = (nodes: ReactNode) => {
  return (
    <Grid item xs={12}>
      {nodes}
    </Grid>
  );
};

const renderInput = (formMethods: UseFormReturn, input: Input, name: string) => {
  let result: ReactNode;

  const path = `${name}.${input.name}`;

  switch (input.type) {
    case "text":
      result = (
        <Controller
          name={path}
          control={formMethods.control}
          render={({ field: {ref, value, onChange, onBlur, name, disabled }, }) => (
            <TextField
              InputLabelProps={{
                shrink: Boolean(value),
              }}
              disabled={disabled}
              fullWidth
              inputRef={ref}
              label={input.label}
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              type="text"
              value={value || ""}
            />
          )}
        />
      );
      break;

    case "country":
      result = (
        <CountryInput
          key={path}
          name={path}
          formMethods={formMethods}
        />
      );
      break;

    // TODO: handle other input types in types file

    case "list":
      result = (
        <ListForm
          key={path}
          name={path}
          formMethods={formMethods}
          createContainer={createContainer}
          inputs={input.inputs}
        />
      );
      if(input.createContainer) {
        result = input.createContainer({ ...input, name: path, })(result);
      }
      break;

    default:
      result = (
        <></>
      );
      break;
  }

  if (input.type !== "list") {
    return (
      <Grid item key={path} xs={4}>
        {result}
      </Grid>
    );
  }
  return result;
};

export { renderInput };
