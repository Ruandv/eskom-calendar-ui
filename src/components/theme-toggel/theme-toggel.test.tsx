import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ThemeToggel from "./theme-toggel";
import { Themes } from "../../enums/enums";
import { click } from "@testing-library/user-event/dist/click";
import { act } from "react-dom/test-utils";

describe("<ThemeToggel />", () => {
  test("it should mount", () => {
    render(<ThemeToggel currentValue={Themes.Dark} onToggle={() => {}} />);

    const themeToggel = screen.getByTestId("ThemeToggel");

    expect(themeToggel).toBeInTheDocument();
  });

  test("it should toggle the theme", () => {
    render(<ThemeToggel currentValue={Themes.Dark} onToggle={() => {}} />);
    const themeToggel = screen.getByTestId("ThemeToggel");
    const spy = jest.spyOn(themeToggel, "click");
    act(() => {
      fireEvent.click(themeToggel, {});
    });
    act(() => {
      fireEvent.click(themeToggel, {});
    });
    expect(themeToggel).toBeInTheDocument();
    expect(spy).toHaveBeenCalled();
  });
});
