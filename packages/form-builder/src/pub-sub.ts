import { SubjectBase } from "@core/pub-sub";
import { type FormAction } from "./types";

class FormBuilderSubject extends SubjectBase<FormAction, (formAction: FormAction) => void> {
  constructor(defaultValue: FormAction) {
    super(defaultValue);
  }

  action(action: FormAction, ...ids: string[]) {
    this.state = action;
    this.notify(...ids);
    this.state = null;
  }
}

const formBuilderSubject = new FormBuilderSubject(null);

const dispatchFormBuilderAction = (action: FormAction , ...ids: string[]) => {
  formBuilderSubject.action(action, ...ids);
};

export default FormBuilderSubject;
export { formBuilderSubject, dispatchFormBuilderAction };
