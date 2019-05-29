import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ExchangeContextProvider } from "./context/ExchangeContext";

ReactDOM.render(
  <ExchangeContextProvider>
    <App />
  </ExchangeContextProvider>,
  document.getElementById("root")
);
