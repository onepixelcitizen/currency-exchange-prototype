import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import { ExchangeContextProvider } from "../context/ExchangeContext";
import ExchangeButton from "../components/ExchangeButton";

afterEach(cleanup);

test("renders button with default text", () => {
  const handleExchange = jest.fn();

  const { getByText } = render(
    <ExchangeContextProvider>
      <ExchangeButton onClick={handleExchange} />
    </ExchangeContextProvider>
  );

  expect(getByText("Exchange")).toBeInTheDocument();
  expect(getByText("Exchange")).toBeVisible();
  expect(getByText("Exchange")).not.toHaveAttribute("disabled");
});
