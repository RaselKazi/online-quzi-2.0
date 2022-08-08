import React, { useContext, useEffect } from "react";
import { Store } from "../Data/Store/Store";

export default function useTheme() {
  const { state, dispatch } = useContext(Store);

  const { theme } = state;

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const themeHandler = () => {
    const colorTheme = theme === "light" ? "dark" : "light";
    dispatch({
      type: "UPDATE_THEME",
      payload: colorTheme,
    });
  };
  return themeHandler;
}
