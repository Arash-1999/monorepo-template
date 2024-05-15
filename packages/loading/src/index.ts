import React from "react";
import withLoading from "./hoc";
import { LoadingSubject, Mode } from "./subject";

class Loading {
  private subject: LoadingSubject;

  constructor() {
    this.subject = new LoadingSubject();
  }

  withLoading<T>(Component: React.ComponentType<T>) {
    return withLoading(this.subject)(Component);
  }

  dispatchLoading(mode: Mode, sender: string, ...ids: string[]) {
    this.subject.action(mode, sender, ...ids);
  }
}

export { Loading, Mode };
