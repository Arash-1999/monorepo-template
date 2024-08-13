"use client";
import type { FC, ReactNode } from "react";
// import { useContext } from "react";
import { Global, ThemeProvider } from "@emotion/react";
import {createTheme} from "@/shared/utils/create-theme";

const ThemeHandler: FC<{ children: ReactNode }> = ({ children }) => {
    // const localeContext = useContext(LocaleContext);
    const theme = createTheme({ dir: "ltr" });

    return (
        <ThemeProvider theme={theme}>
            <Global styles={{}} />
            {children}
        </ThemeProvider>
    );
};

export default ThemeHandler;
