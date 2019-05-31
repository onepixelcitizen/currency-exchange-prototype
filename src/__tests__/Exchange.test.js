import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import { ExchangeContextProvider } from "../context/ExchangeContext";
import App from "../App";

afterEach(cleanup);

test("render * components", () => {
  const { getByText, getByLabelText, getAllByTestId, getByTestId } = render(
    <ExchangeContextProvider>
      <App />
    </ExchangeContextProvider>
  );

  const title = getByText(/Currency Exchange Prototype/i);
  const rocket = getByLabelText(/Rocket/i);
  const wallets = getAllByTestId("wallet");
  const exchangeRateComponent = getByTestId("exchangeRate");
  const toggleButton = getByTestId("toggleButton");

  expect(title).toBeVisible();
  expect(title).toContainElement(rocket);
  expect(wallets).toHaveLength(2);
  expect(exchangeRateComponent).toBeVisible();
  expect(toggleButton).toBeVisible();
});

test("exchange currency functionality", () => {
  const { container, getAllByTestId, debug } = render(
    <ExchangeContextProvider>
      <App />
    </ExchangeContextProvider>
  );

  const button = getAllByTestId("exchangeButton");
  const input1 = container.querySelector(".minus");
  const input2 = container.querySelector(".plus");

  debug(button);
  debug(input1);
  debug(input2);

  /**
   * TODO: find a way to change/set value for the contenteditable component :/
   * if there is one and then test the result of the conversion.
   * https://spectrum.chat/testing-library/general/possible-to-simulate-events-on-div-contenteditable-true~85c08fa4-3394-4c60-b5a2-81a6a9ee35e4
   */
});
