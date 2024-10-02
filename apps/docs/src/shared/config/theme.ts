import { keyframes } from "@emotion/react";
/*
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-xs: 0 1px rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
*/

const spin = keyframes`
    to {
      transform: rotate(360deg);
    }
`;
const ping = keyframes`
    75%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
`;
const pulse = keyframes`
    50% {
      opacity: 0.5;
    }
`;
const bounce = keyframes`
    0%,
    100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }

    50% {
      transform: none;
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
`;

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
const breakpoint: Record<Breakpoint, { value: string; next?: Breakpoint }> = {
  xs: { value: "0px", next: "sm" },
  sm: { value: "40rem", next: "md" },
  md: { value: "48rem", next: "lg" },
  lg: { value: "64rem", next: "xl" },
  xl: { value: "80rem", next: "xxl" },
  xxl: { value: "96rem" },
};

const base = {
  atomic: {
    "100": "#E6EAED",
    "200": "#B5C1CA",
    "400": "#8498A6",
    "600": "#596E7B",
    "800": "#35424A",
    "1000": "#3C4A53",
  },
  "caribbean-green": {
    "100": "#",
    "200": "#",
    "400": "#",
    "600": "#",
    "800": "#",
    "1000": "#00BEA5",
  },
  yellow: {
    "100": "#FCF3DB",
    "200": "#F9E6B8",
    "400": "#F6DA94",
    "600": "#F3CD71",
    "800": "#F2C75F",
    "1000": "#F0C14D",
  },
  pink: {
    "100": "#fcdde3",
    "200": "#f9bac7",
    "400": "#f798ac",
    "600": "#f47590",
    "800": "#f26482",
    "1000": "#f15374",
  },
  "gray-blue": {
    "100": "#",
    "200": "#",
    "400": "#",
    "600": "#",
    "800": "#",
    "1000": "#",
  },
};

const lightTheme = {
  mode: "light",
  color: {
    primary: {
      light: base["caribbean-green"][1000],
      main: base["caribbean-green"][1000],
      dark: base["caribbean-green"][1000],
      contrastText: "#fff",
    },
    secondary: {},
    background: {
      button: {
        primary: base["caribbean-green"][1000],
        secondary: base["gray-blue"][400],
        tertiary: base["atomic"][400],
        disabled: "",
      },
      input: {},
    },
    text: {
      primary: base["atomic"][1000],
      secondary: base["gray-blue"][400],
      tertiary: base["atomic"][400],
      disabled: "",

      button: {
        primary: base["atomic"][1000],
        secondary: base["gray-blue"][400],
        tertiary: base["atomic"][400],
        disabled: "",
      },
      input: {},
    },
    divider: base["atomic"][200],
  },
  radius: {
    xs: "0.25rem",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    xxl: "1rem",
  },
  shadow: {
    // TODO: add shadows
  },
  animation: {
    bounce,
    ping,
    pulse,
    spin,
  },
  breakpoint: {
    keys: Object.entries(breakpoint).reduce<
      Partial<Record<Breakpoint, string>>
    >((acc, cur) => {
      acc[cur[0] as Breakpoint] = cur[1].value;
      return acc;
    }, {}),

    up: (key: Breakpoint) => `@media (min-width: ${breakpoint[key].value})`,
    down: (key: Breakpoint) => `@media (max-width: ${breakpoint[key].value})`,
    between: (k1: Breakpoint, k2: Breakpoint) =>
      `@media (min-width: ${breakpoint[k1].value}) and (max-width: ${breakpoint[k2].value})`,
    only: (key: Breakpoint) => {
      if (breakpoint[key].next) {
        const nextKey = breakpoint[key].next as Breakpoint;
        return `@media (min-width: ${breakpoint[key].value}) and (max-width: ${breakpoint[nextKey].value})`;
      } else {
        return `@media (min-width: ${breakpoint[key].value})`;
      }
    },
    not: (key: Breakpoint) => {
      if (breakpoint[key].next) {
        const nextKey = breakpoint[key].next as Breakpoint;
        return `@media (max-width: ${breakpoint[key].value}) and (min-width: ${breakpoint[nextKey].value})`;
      } else {
        return `@media (max-width: ${breakpoint[key].value})`;
      }
    },
  },
};

const darkTheme = {
  mode: "dark",
};

export { lightTheme, darkTheme };
