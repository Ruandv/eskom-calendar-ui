import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TopDownloads from "./top-downloads";
import { Themes } from "../../enums/enums";

describe("<TopDownloads />", () => {
  test("it should mount", () => {
    render(<TopDownloads theme={Themes.Dark} />);

    const topDownloads = screen.getByTestId("TopDownloads");

    expect(topDownloads).toBeInTheDocument();
  });
});
