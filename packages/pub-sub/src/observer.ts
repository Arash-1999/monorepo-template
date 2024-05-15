import { ActionBase, DefaultAction, ObserverType, SubjectType } from "./types";

class Observer<T, K extends ActionBase<T> = DefaultAction<T>>
  implements ObserverType<T, K>
{
  public action: K;
  public name: string;

  constructor(action: K, name: string) {
    this.action = action;
    this.name = name;
  }

  update(s: SubjectType<T, K>) {
    this.action(s.state);
  }
}

export { Observer };
