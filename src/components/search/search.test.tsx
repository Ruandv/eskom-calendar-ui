import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Search from "./search";
import { Themes } from "../../enums/enums";

describe("<Search />", () => {
  test("it should mount", () => {
    render(<Search theme={Themes.Dark} />);

    const search = screen.getByTestId("Search");

    expect(search).toBeInTheDocument();
  });
});
