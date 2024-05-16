"use client";
import { useContext } from "react";
import { ThemeContext } from "./context";
import { Switch } from "@mui/material";

const ThemeToggle = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <Switch
        checked={mode === "dark"}
        onChange={(e) => {
          toggleTheme(e.target.checked ? "dark" : "light");
        }}
      />
    </>
  );
};

export default ThemeToggle;
