import React from "react";

export type LocaleContextValue = {
  lang: string;
  dir: "rtl" | "ltr";
};

export const LocaleContext = React.createContext<LocaleContextValue>({
  lang: "en",
  dir: "ltr",
});

export const useLocale = (): LocaleContextValue => {
  return React.useContext(LocaleContext);
};
