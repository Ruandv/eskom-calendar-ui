import { Themes } from "../../enums/enums";
import React, { useState } from "react";
import styles from "./theme-toggel.module.css";

export interface IThemeToggle {
  onToggle: (evt?: any) => void;
  currentValue: Themes;
}

function ThemeToggel({ onToggle, currentValue }: IThemeToggle) {
  const [theme, setTheme] = useState<Themes>(currentValue);
  return (
    <div
      className={`${styles.ThemeToggel} ${styles[theme]}`}
      data-testid="ThemeToggel"
      onClick={() => {
        setTheme(theme === Themes.Dark ? Themes.Light : Themes.Dark);
        onToggle(theme === Themes.Dark ? Themes.Light : Themes.Dark);
      }}
    >
      <div
        data-testid="ThemeToggelButton"
        className={`${styles.button} ${styles[theme]}`}
      >
        &nbsp;
      </div>
    </div>
  );
}

export default ThemeToggel;
