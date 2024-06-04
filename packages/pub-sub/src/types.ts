export type ActionBase<T> = (s: T) => void;
export type DefaultAction<T> = React.Dispatch<React.SetStateAction<T>>;

export type SubjectType<T, K extends ActionBase<T> = DefaultAction<T>> = {
  /* values */
  state: T;

  /* methods */
  attach: (o: ObserverType<T, K>) => void;
  checkAttach: (name: string) => boolean;
  detach: (o: ObserverType<T, K>) => void;
  notify: () => void;
};

export type ObserverType<T, K extends ActionBase<T> = DefaultAction<T>> = {
  /* values */
  action: K;
  name: string;

  /* methods */
  update: (subject: SubjectType<T, K>) => void;
};
