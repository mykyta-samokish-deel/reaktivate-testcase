import React from "react";
import { render } from "@testing-library/react";

import { Books } from "../Books";
import { emptyList, nonEmptyList } from "../__mocks__/Books.mock";

describe("Books", () => {
  it("renders empty text if request status is succeded", () => {
    const { getByText } = render(<Books books={emptyList} />);
    expect(getByText("No items in a list")).toBeTruthy();
  });

  it("renders list if request status is succeded", () => {
    const { getByText, queryByText } = render(<Books books={nonEmptyList} />);
    expect(
      getByText(`${nonEmptyList[0].author}: ${nonEmptyList[0].name}`)
    ).toBeTruthy();
    expect(
      getByText(`${nonEmptyList[1].author}: ${nonEmptyList[1].name}`)
    ).toBeTruthy();
    expect(
      queryByText(`${nonEmptyList[0].author}: ${nonEmptyList[1].name}`)
    ).not.toBeTruthy();
  });
});
