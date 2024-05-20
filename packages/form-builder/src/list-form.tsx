import { Observer } from "@core/pub-sub";
import { useEffect, useMemo, Fragment, type ReactNode } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { Card, type FormAction } from "./types";
import { formBuilderSubject } from "./pub-sub";
import { renderInput } from "./render-input";

type ListFormProps = Omit<Card, "isList" | "title" | "action"> & {
  formMethods: UseFormReturn;
  createContainer: (nodes: ReactNode, index: number) => ReactNode;
};

const ListForm = ({ formMethods, createContainer, name, inputs}: ListFormProps) => {
  // TODO: change component id
  const componentId = name;
  // const componentId = useMemo(() => {
  //   return path ? `${path}.${name}` : name;
  // }, [path, name]);

  const { fields, ...methods } = useFieldArray({
    name: componentId,
    control: formMethods.control,
  });

  const observerAction = (formAction: FormAction) => {
    if(formAction !== null) {
      switch (formAction["method"]) {
        case "append":
          methods["append"](formAction["value"]);
          break;

        case "prepend":
          methods["prepend"](formAction["value"]);
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
          methods["replace"](formAction["value"]);
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
    >(observerAction, componentId);
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
