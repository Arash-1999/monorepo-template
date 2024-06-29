import { useState, useEffect, useCallback, } from "react";
import { ProviderProps, ProviderInternalProps, DataDefault, } from "./types";

const Provider = function <TStore extends DataDefault>({
  Context,
  checkAccess,
  setLoading,
}: ProviderInternalProps<TStore>) {
  return function({
    children,
    pathname,
    navigate,
  }: ProviderProps) {
    const [value, setValue] = useState<Partial<TStore>>({});

    const checkAccessCallback = useCallback(async (route: string, value: Partial<TStore>) => {
      setLoading(true, ["GLOBAL_LOADING"]);
      return await checkAccess(navigate, route, value)
        .then(
          (data) => {
            setValue({...value, ...data});
            setLoading(false, ["GLOBAL_LOADING"]);
            return true;
          },
          () => {
            return false;
          }
        );
    }, [navigate]);

    useEffect(() => {
      checkAccessCallback(pathname, value);
    }, [pathname]);

    // console.log(guardList);

    return (
      <Context.Provider
        value={{
          data: value,
          checkAccess: async () => {
            // TODO: use chekcAccess function
            return false;
          },
        }}
      >
        {children}
      </Context.Provider>
    );
  }
};

export default Provider;
