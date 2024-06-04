import { SubjectBase } from "@core/pub-sub";
import type { FormAction } from "./types/internal";
import type { FieldArrayPath, FieldValues } from "react-hook-form";
 
// TODO: change subject class to make it type safe with form value generic type

class FormBuilderSubject extends SubjectBase<FormAction, (formAction: FormAction) => void> {
  constructor(defaultValue: FormAction) {
    super(defaultValue);
  }

  // TODO: change list of ids to single id (test it's good or not)
  action(action: FormAction, ...ids: string[]) {
    this.state = action;
    this.notify(...ids);
    this.state = null;
  }
}

const formBuilderSubject = new FormBuilderSubject(null);

// TODO: test type safety
// TODO: change FormAction generic input depend on given ids
const dispatchFormBuilderAction = <TFormValues extends FieldValues>(
  action: FormAction<TFormValues>,
  ...ids: FieldArrayPath<TFormValues>[]
) => {
  formBuilderSubject.action(action, ...ids);
};

export default FormBuilderSubject;
export {
  formBuilderSubject,
  dispatchFormBuilderAction,
};
