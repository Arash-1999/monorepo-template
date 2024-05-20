import { type ReactNode } from "react";
import { type Input } from "./types";
import { type UseFormReturn } from "react-hook-form";
import ListForm from "./list-form";
import { Grid } from "@mui/material";
import CountryInput from "./components/country-input";
import RadioInput from "./components/radio";
import TextInput from "./components/text";
import CheckboxInput from "./components/checkbox";
import RatingInput from "./components/rating";
import SliderInput from "./components/slider";

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

  const commonProps = {
    name: path,
    label: input.label,
    formMethods,
  }
  switch (input.type) {
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

    case "radio":
      result = (
        <RadioInput key={path} options={input.options} {...commonProps} />
      );
      break;

    case "checkbox":
      result = (
        <CheckboxInput key={path} {...commonProps} />
      );
      break;

    case "rating":
      result = (
        <RatingInput key={path} {...commonProps} />
      );
      break;

    case "slider":
      result = (
        <SliderInput
          key={path}
          min={input.min}
          max={input.max}
          count={input.count}
          step={input.step}
          {...commonProps}
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
