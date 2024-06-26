import type { ReactNode } from "react";
import type { Input } from "./types";
import type { UseFormReturn, FieldValues, } from "react-hook-form";
import ListForm from "./list-form";
import { Grid } from "@mui/material";
/* import Inputs (start) */
import CountryInput from "./components/country-input";
import TextInput from "./components/text";
/* import Inputs (end) */

const createContainer = (nodes: ReactNode) => {
  return (
    <Grid item xs={12}>
      {nodes}
    </Grid>
  );
};

const renderInput = <T extends FieldValues>(formMethods: UseFormReturn<T>, input: Input<T>, name: string) => {
  let result: ReactNode;

  const path = `${name}.${input.name}`;

  // TODO: use path as Path<TFormValues> in commonProps instead of every single input file
  const commonProps = {
    name: path,
    label: input.label,
    formMethods,
  }
  // TODO: handle other input types in types file
  switch (input.type) {
    /* Generated Inputs (start) */
    case "text":
      result = (
        <TextInput key={path} {...commonProps} />
      );
      break;

    case "country":
      result = (
        <CountryInput key={path} {...commonProps} />
      );
      break;
    /* Generated Inputs (end) */

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
      // TODO: create default input component
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
