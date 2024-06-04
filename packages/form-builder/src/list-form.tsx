import { Observer } from "@core/pub-sub";
import { useEffect, useMemo, Fragment, } from "react";
import { useFieldArray, } from "react-hook-form";
import type { ReactNode } from "react";
import type { UseFormReturn, FieldValues, ArrayPath, } from "react-hook-form";
import type { FormAction } from "./types/internal";
import type { Card } from "./types";
import { formBuilderSubject } from "./pub-sub";
import { renderInput } from "./render-input";

type ListFormProps<TFormValues extends FieldValues> = Omit<Card<TFormValues>, "isList" | "title" | "action"> & {
  formMethods: UseFormReturn<TFormValues>;
  createContainer: (nodes: ReactNode, index: number) => ReactNode;
};

const ListForm = <TFormValues extends FieldValues,>({ formMethods, createContainer, name, inputs}: ListFormProps<TFormValues>) => {
  // TODO: change component id
  const componentId = name;
  const {
    fields,
    ...methods
  } = useFieldArray({
    name: componentId as ArrayPath<TFormValues>,
    control: formMethods.control,
  });

  const observerAction = (formAction: FormAction<TFormValues>) => {
    if(formAction !== null) {
      switch (formAction["method"]) {
        case "append":
          methods["append"](...formAction["value"]);
          break;

        case "prepend":
          methods["prepend"](...formAction["value"]);
          break;

        case "insert":
          methods["insert"](...formAction["value"]);
          break;

        case "swap":
          methods["swap"](...formAction["value"]);
          break;

        case "move":
          methods["move"](...formAction["value"]);
          break;

        case "update":
          methods["update"](...formAction["value"]);
          break;

        case "replace":
          methods["replace"](...formAction["value"]);
          break;

        case "remove":
          methods["remove"](formAction["value"]);
          break;
      }
    }
  };

  const observer = useMemo(() => {
    return new Observer<
      FormAction,
      (formAction: FormAction) => void
    >(observerAction as (formAction: FormAction) => void, componentId);
  }, []);

  useEffect(() => {
    formBuilderSubject.attach(observer);

    return () => {
      formBuilderSubject.detach(observer);
    }
  }, [observer]);

  return (
    <Fragment>
      {fields.map((field, i) => {
        return (
          <Fragment key={field.id}>
            {createContainer((
              <Fragment>
                {inputs.map((input, j) => (
                  <Fragment key={j}>
                    {/* TODO: render inputs */}
                    {/* {componentId}.{i}.{input.name} */}
                    {renderInput(formMethods, input, `${componentId}.${i}`)}
                  </Fragment>
                ))}
              </Fragment>
            ), i)}
          </Fragment>
        )
      }) }
    </Fragment>
  );
};

export default ListForm;
