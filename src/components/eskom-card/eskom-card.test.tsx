import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EskomCard from "./eskom-card";
import { IAsset } from "../../interfaces/github";
import { Themes } from "../../enums/enums";

describe("<EskomCard />", () => {
  test("it should mount", () => {
    render(<EskomCard theme={Themes.Light} downloadData={{} as IAsset} />);

    const eskomCard = screen.getByTestId("EskomCard");

    expect(eskomCard).toBeInTheDocument();
  });
});
