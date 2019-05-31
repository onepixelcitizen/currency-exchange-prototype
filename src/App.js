import React, { useState, useEffect, useContext, useRef } from "react";

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
  const [bailOutValueOne, setBailOutValueOne] = useState();
  const [bailOutValueTwo, setBailOutValueTwo] = useState();
  const previousWalletOneCurrency = useRef();
  const previousWalletTwoCurrency = useRef();

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

    const myTimeout = setInterval(() => {
      fetchExchangeRates(["USD", "EUR", "GBP"]);
    }, 10000);

    return () => {
      clearInterval(myTimeout);
    };
  }, [dispatch]);

  useEffect(() => {
    if (walletOneCurrency !== undefined && walletTwoCurrency !== undefined) {
      if (walletOneCurrency === walletTwoCurrency) {
        if (previousWalletOneCurrency.current !== walletOneCurrency) {
          setBailOutValueTwo(previousWalletOneCurrency.current);
        } else {
          setBailOutValueOne(previousWalletTwoCurrency.current);
        }
      }
    }
    previousWalletOneCurrency.current = walletOneCurrency;
    previousWalletTwoCurrency.current = walletTwoCurrency;
  }, [walletOneCurrency, walletTwoCurrency]);

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
          bailOutValue={bailOutValueOne}
        />
        <Wallet
          initialWalletCurrency="USD"
          thisWalletCurrency={fromWalletTwo}
          bailOutValue={bailOutValueTwo}
        />
      </SwitchWrapper>
    </>
  );
}

export default App;
