import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Label from "./Label";

test("Renders Person component correctly", async () => {
  const { getByText } = render(<Label label="Nathan" />);
  expect(document.getElementsByTagName("p").length).toBe(1);
  const htmlElement = getByText("Nathan");
  expect(htmlElement).not.toBeFalsy();
});
