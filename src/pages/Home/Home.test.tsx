import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PagesHome from "./Home";
import { Themes } from "../../enums/enums";

describe("<PagesHome />", () => {
  test("it should mount", () => {
    render(<PagesHome assetName="" theme={Themes.Dark} />);

    const pagesHome = screen.getByTestId("PagesHome");

    expect(pagesHome).toBeInTheDocument();
  });
});
