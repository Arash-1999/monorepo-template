import { lightTheme } from "@/shared/config/theme";

interface CreateThemeProps {
    dir: "rtl" | "ltr";
    // mode: 'light' | 'dark';
}

const createTheme = ({ dir }: CreateThemeProps) => {
    return {
        dir,
        // ...(mode === 'light' ? lightTheme : darkTheme),
        ...lightTheme,
    };
};

export { createTheme };
