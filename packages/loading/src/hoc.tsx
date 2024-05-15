import React from "react";
import type { LoadingState, LoadingAction, LoadingSubject } from "./subject";
import { Observer } from "@core/pub-sub";

function withLoading(loadingSubject: LoadingSubject) {
  return function <T> (Component: React.ComponentType<T>) {
    const displayName = Component.displayName || Component.name || "component";

    const WrapperComponent = (hocProps: Omit<T, "loading"> & { name: string } ) => {
      const { name } = hocProps;
      const [loading, setLoading] = React.useState<boolean>(false);

      const action = React.useCallback((state: LoadingState) => {
        if(state.has(name)) {
          setLoading((state.get(name)?.size || 0) > 0);
        };
      }, [name]);

      const observer = React.useMemo(() => {
        return new Observer<
          LoadingState,
          LoadingAction
        >(action, name);
      }, [name, action]);

      React.useEffect(() => {
        loadingSubject.attach(observer);

        return () => {
          loadingSubject.detach(observer);
        };
      }, [observer]);

      return (
        <Component
          loading={loading}
          {...hocProps as T}
        />
      );
    };

    WrapperComponent.displayName = displayName;

    return WrapperComponent;
  };
}

export default withLoading;
