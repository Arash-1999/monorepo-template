import type { Context, ReactNode, } from "react";
import type { Entries, DataDefault } from "./utils";

// external and internal config types(it adds canResolve field in parsing config)
type GuardConfigBase<TStore, TExtend extends boolean = false> = {
  [key in keyof TStore]: {
    name: key;
    fallback: string;
    // PERF: if it has no deps fn should be like () => Promise<TStore[key]>;
    fn: (data: Partial<TStore>) => Promise<TStore[key]>;
    deps?: Exclude<keyof TStore, key>[];
  } & (TExtend extends false ? {} : {
    canResolve?: Exclude<keyof TStore, key>[];
  });
};
type GuardConfig<TStore> = GuardConfigBase<TStore>;
type GuardConfigInternal<TStore> = GuardConfigBase<TStore, true>;

type SetLoadingFn = (status: boolean, ids: string[]) => void;

interface GuardContextValue<TData extends DataDefault> {
  data: Partial<TData>;
  checkAccess: (route: string) => Promise<boolean>;
}

type RoutesConfig<TStore> = {
  [key: string]: {
    [key in "can-activate" | "can-activate-child"]?: (keyof TStore)[];
  }
};

type NavigateFunction = (to: string) => void;

type ProviderProps = {
  children: ReactNode;
  pathname: string;
  navigate: NavigateFunction;
};
type ProviderInternalProps<TStore extends DataDefault> = {
  Context: Context<GuardContextValue<TStore>>;
  getRouteGuards: (route: string) => string;
  checkAccess: (
    navigate: NavigateFunction,
    pathname: string,
    store: Partial<TStore>,
  ) => Promise<Partial<TStore>>;
  setLoading: SetLoadingFn,
};

// guard main class
type GuardCreatorClass<TStore extends DataDefault> = {
  /* fields */
  context: Context<GuardContextValue<TStore>>;

  /* methods */
  provider: () => React.FC<ProviderProps>;
}

export type {
  DataDefault,
  Entries,
  GuardConfig,
  GuardConfigInternal,
  GuardContextValue,
  GuardCreatorClass,
  NavigateFunction,
  ProviderInternalProps,
  ProviderProps,
  RoutesConfig,
  SetLoadingFn,
};
