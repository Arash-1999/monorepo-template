import { createTheme } from "@mui/material";
import type { ThemeMode, Direction } from "../types";

/* type declaration for extending mui Theme */
// declare module "@mui/material/styles" {
//   interface Theme {
//     dropShadows: [string, string, string];
//   }
//   interface ThemeOptions {
//     dropShadows?: [string, string, string];
//   }
// }

/* create theme */
const generateTheme = (mode: ThemeMode, dir: Direction) => {
  const baseTheme = {
    direction: dir,
  };

  return createTheme({
    ...baseTheme,

    ...(mode === "light" ? {
      palette: {
        mode: "light",
        background: {
          paper: "#f7f7f7",
        },
      },
    } : {
      /* dark mode theme */
      palette: {
        mode: "dark",
      },
    }),
  });
};

export { generateTheme };
