import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { ExchangeContext } from "../context/ExchangeContext";

const Button = styled.button`
  background: #e91e63;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor pointer;
  outline: none;
  font-size: .6em;
  transition: all 0.2s;

  &:hover {
    background: #000;
  }

  &:disabled {
    cursor: not-allowed;
  }

`;

const findKey = (obj, currency) => {
  const condition = element => {
    if (element.currency === currency) {
      return element;
    }
  };
  return obj.findIndex(condition);
};

const ExchangeButton = () => {
  const { state, dispatch } = useContext(ExchangeContext);
  const [disabled, setDisabled] = useState(state.transaction.exceedsBalance);

  useEffect(() => {
    const { exceedsBalance } = state.transaction;
    setDisabled(exceedsBalance);
  }, [state.transaction.exceedsBalance]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleExchange = e => {
    e.preventDefault();
    const { fromCurrency, fromValue, toCurrency, toValue } = state.transaction;

    if (disabled) {
      return;
    }

    if (
      fromValue === "" ||
      toValue === "" ||
      fromValue === "0.00" ||
      toValue === "0.00"
    ) {
      return;
    }

    const decrimentValue =
      parseFloat(
        state.walletData[findKey(state.walletData, fromCurrency)].balance
      ) - parseFloat(fromValue);

    const incrementValue =
      parseFloat(
        state.walletData[findKey(state.walletData, toCurrency)].balance
      ) + parseFloat(toValue);

    dispatch({
      type: "UPDATE_WALLET",
      payload: {
        key: findKey(state.walletData, fromCurrency),
        balance: decrimentValue.toFixed(2)
      }
    });

    dispatch({
      type: "UPDATE_WALLET",
      payload: {
        key: findKey(state.walletData, toCurrency),
        balance: incrementValue.toFixed(2)
      }
    });

    dispatch({
      type: "SET_TRANSACTION",
      payload: {
        fromValue: "",
        toValue: ""
      }
    });
  };
  return (
    <Button
      type="button"
      disabled={disabled && "disabled"}
      onClick={handleExchange}
      data-testid="exchangeButton"
    >
      Exchange
    </Button>
  );
};

export default ExchangeButton;
