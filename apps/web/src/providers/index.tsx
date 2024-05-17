"use client";
import React from "react";
import { getDirection } from "@core/i18n/utils";
import { LocaleContext } from "./contexts/locale";
import { ThemeProvider } from "@repo/ui/theme";
import { Modal } from "@lib/global-modal";

type Props = {
  children: React.ReactNode;
  locale: string;
};

const Providers = ({ children, locale }: Props) => {
  const localeContextValue = React.useMemo(() => {
    return {
      lang: locale,
      dir: getDirection(locale),
    };

  }, [locale]);

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <ThemeProvider dir={localeContextValue.dir}>
        {children}
        <Modal />
      </ThemeProvider>
    </LocaleContext.Provider>
  );
};

export default Providers;
