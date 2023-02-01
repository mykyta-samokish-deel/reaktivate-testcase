import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppHeader } from "../AppHeader";
import defaultProps from "../__mocks__/AppHeader.mock";

describe("AppHeader", () => {
  let component;

  beforeEach(() => {
    component = render(<AppHeader data={defaultProps} />);
  });

  it("renders ok", () => {
    expect(screen.getByText("all books")).toBeTruthy();
    expect(screen.getByText("private")).toBeTruthy();
    expect(screen.getByText("add book")).toBeTruthy();
    expect(screen.getByText("reset")).toBeTruthy();
  });

  test("clicking at radio buttons trigger jest fn", async () => {
    await fireEvent.click(screen.getByText("private"));
    expect(defaultProps.toggleType).toBeCalled();

    await fireEvent.click(screen.getByText("all books"));
    expect(defaultProps.toggleType).toHaveBeenCalledTimes(1);
  });

  test("clicking at 'add book' btn triggers jest fn", async () => {
    await fireEvent.click(screen.getByText("add book"));
    expect(defaultProps.addBook).toHaveBeenCalledTimes(1);
  });

  test("clicking at 'reset' btn triggers jest fn", async () => {
    await fireEvent.click(screen.getByText("reset"));
    expect(defaultProps.reset).toHaveBeenCalledTimes(1);
  });

  test("when requestStatus is loading, show loading text", async () => {
    component.rerender(
      <AppHeader data={{ ...defaultProps, requestStatus: "loading" }} />
    );
    expect(screen.getByText("loading")).toBeTruthy();
  });

  test("when requestStatus is failed, show error text", async () => {
    component.rerender(
      <AppHeader data={{ ...defaultProps, requestStatus: "failed" }} />
    );
    expect(screen.getByText("error")).toBeTruthy();
  });
});
