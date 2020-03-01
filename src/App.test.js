import React from "react";
import { render } from "@testing-library/react";

import App from "./App";
import getDogData from "./api/index";

it("gets a list and object of dog breed data, then renders that list", async () => {
  const { list, data } = await getDogData();

  expect(list).toHaveLength(92);
  const expectedKeys = ["primaryBreed", "image", "types"];
  let testObj = list[0];
  Object.keys(testObj).forEach(key => {
    expect(expectedKeys).toContain(key);
    expect(data[testObj["primaryBreed"]]).not.toBeUndefined();
  });
  expect(Object.keys(data)).toHaveLength(92);

  const { getByTestId } = render(<App />);

  expect(getByTestId("BreedList")).toBeTruthy();
});
