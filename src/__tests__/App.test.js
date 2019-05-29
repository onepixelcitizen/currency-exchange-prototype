import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { ExchangeContextProvider } from "../context/ExchangeContext";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ExchangeContextProvider>
      <App />
    </ExchangeContextProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
