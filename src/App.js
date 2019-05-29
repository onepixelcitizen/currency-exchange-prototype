import React, { useState, useEffect, useContext } from "react";

import "./App.css";
import getExchangeRates from "./api/exchange";
import { ExchangeContext } from "./context/ExchangeContext";
import Wallet from "./components/Wallet";
import SwitchWrapper from "./components/SwitchWrapper";
import Title from "./components/Title";

function App() {
  const { dispatch } = useContext(ExchangeContext);
  const [walletOneCurrency, fromWalletOne] = useState();
  const [walletTwoCurrency, fromWalletTwo] = useState();

  useEffect(() => {
    const fetchExchangeRates = async currencies => {
      try {
        const requests = currencies.map(currency => {
          return getExchangeRates(currency);
        });

        const exchangeRates = await Promise.all(requests);

        dispatch({
          type: "SET_EXCHANGE_RATES",
          payload: exchangeRates
        });
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      }
    };
    fetchExchangeRates(["USD", "EUR", "GBP"]);
    setInterval(() => {
      fetchExchangeRates(["USD", "EUR", "GBP"]);
    }, 10000);
  }, [dispatch]);

  return (
    <>
      <Title>
        Currency Exchange Prototype{" "}
        <span role="img" aria-label="Rocket">
          &#x1F680;
        </span>
      </Title>
      <SwitchWrapper
        walletOneCurrency={walletOneCurrency}
        walletTwoCurrency={walletTwoCurrency}
      >
        <Wallet
          initialWalletCurrency="EUR"
          thisWalletCurrency={fromWalletOne}
        />
        <Wallet
          initialWalletCurrency="USD"
          thisWalletCurrency={fromWalletTwo}
        />
      </SwitchWrapper>
    </>
  );
}

export default App;
