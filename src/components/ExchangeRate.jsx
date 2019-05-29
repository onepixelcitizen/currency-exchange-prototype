import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { ExchangeContext } from "../context/ExchangeContext";
import loader from "../assets/loader.svg";

const ExchangeWrapper = styled.div`
  position: absolute;
  top: 45%;
  left: 52%;
  margin-left: -50px;
  padding: 5px 20px;
  border: 1px solid #4caf50;
  color: #000;
  background: #fff;
  border-radius: 20px;
  font-size: 0.5em;
  min-width: 57px;
`;

const Loader = styled.img`
  width: 15px;
  margin: 0 auto;
  display: block;
`;

const ExchangeRate = () => {
  const { state, dispatch } = useContext(ExchangeContext);
  const [symbolOne, setExchangeFromSymbol] = useState();
  const [symbolTwo, setExchangeToSymbol] = useState();
  const [currencyOne, setCurrencyOne] = useState();
  const [currencyTwo, setCurrencyTwo] = useState();
  const [rate, setRate] = useState();

  useEffect(() => {
    const getSymbolOne = state.walletData.filter(c => {
      return c.currency === state.transaction.fromCurrency;
    });

    const getSymbolTwo = state.walletData.filter(c => {
      return c.currency === state.transaction.toCurrency;
    });

    if (getSymbolOne[0] !== undefined && getSymbolTwo[0] !== undefined) {
      setExchangeFromSymbol(getSymbolOne[0].symbol);
      setExchangeToSymbol(getSymbolTwo[0].symbol);
      setCurrencyOne(getSymbolOne[0].currency);
      setCurrencyTwo(getSymbolTwo[0].currency);
    }
  }, [
    state.transaction.fromCurrency,
    state.transaction.toCurrency,
    state.walletData
  ]);

  useEffect(() => {
    if (state.exchangeRates.length !== 0) {
      const currencyRate = state.exchangeRates.find(
        data => data.base === currencyOne
      );
      let rate = currencyRate.rates[currencyTwo];
      if (rate !== undefined) {
        setRate(rate.toFixed(4));
      }
    }
  }, [state, currencyOne, currencyTwo]);

  useEffect(() => {
    dispatch({
      type: "SET_CURRENT_EXCHANGE_RATE",
      payload: { currentExchangeRate: rate }
    });
  }, [rate, dispatch]);

  return (
    <ExchangeWrapper>
      {rate === undefined ? (
        <Loader src={loader} alt="Loader..." />
      ) : (
        `${symbolOne}1 = ${symbolTwo} ${rate}`
      )}
    </ExchangeWrapper>
  );
};

export default ExchangeRate;
