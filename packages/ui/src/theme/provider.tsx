"use client";
import { ReactNode, useState } from "react";
import { ThemeContext } from "./context";
import { type ThemeMode } from "../types";
import { generateTheme } from "./create-theme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

type RtlProps = {
  children: ReactNode;
};

function Rtl(props: RtlProps) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

type Props = {
  dir: "ltr" | "rtl";
  children: ReactNode;
};

const ThemeProvider = ({ dir, children }: Props) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if(typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  const toggleTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  const nodes = (
    <ThemeContext.Provider value={{mode: themeMode, toggleTheme}}>
      <MuiThemeProvider theme={generateTheme(themeMode, dir)}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
  return dir === "rtl" ? ( <Rtl>{nodes}</Rtl>) : nodes;
}

export default ThemeProvider;
