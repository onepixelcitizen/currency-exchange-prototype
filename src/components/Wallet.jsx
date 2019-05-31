import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import ContentEditable from "react-contenteditable";

import { ExchangeContext } from "../context/ExchangeContext";
import Pocket from "./Pocket";

const WalletWrapper = styled.div`
  display: flex;
  flex-flow: row;
  padding: 4%;
  & > div {
    width: 50%;
    &:nth-child(2) {
      text-align: right;
      & > div {
        position: relative;
        padding: 5px 10px;
        float: right;
        outline: none;
        border-bottom: 1px dashed #d4d4d4;

        &:before {
          position: absolute;
          top: 5px;
          left: -10px;
          color: #d4d4d4;
        }
        &.plus {
          &:before {
            content: "-";
          }
        }
        &.minus {
          &:before {
            content: "+";
          }
        }
      }
    }
  }
`;

const Wallet = ({
  initialWalletCurrency,
  thisWalletCurrency,
  bailOutValue
}) => {
  const fromCurrencyRef = useRef(initialWalletCurrency);
  const toCurrencyRef = useRef(initialWalletCurrency);
  const { state, dispatch } = useContext(ExchangeContext);
  const [localWalletCurrency, setLocalCurrency] = useState();

  const getCorrectRate = (from, to) => {
    const currencyRate = state.exchangeRates.find(data => data.base === from);
    if (currencyRate !== undefined) {
      return currencyRate.rates[to];
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (fromCurrencyRef.current !== state.transaction.fromCurrency) {
      dispatch({
        type: "SET_TRANSACTION",
        payload: state.transaction.flipped
          ? {
              fromValue: parseFloat(
                state.transaction.toValue *
                  getCorrectRate(
                    state.transaction.toCurrency,
                    state.transaction.fromCurrency
                  )
              ).toFixed(2)
            }
          : {
              toValue: parseFloat(
                state.transaction.fromValue *
                  getCorrectRate(
                    state.transaction.fromCurrency,
                    state.transaction.toCurrency
                  )
              ).toFixed(2)
            }
      });
    }

    if (toCurrencyRef.current !== state.transaction.toCurrency) {
      dispatch({
        type: "SET_TRANSACTION",
        payload: state.transaction.flipped
          ? {
              fromValue: parseFloat(
                state.transaction.toValue *
                  getCorrectRate(
                    state.transaction.toCurrency,
                    state.transaction.fromCurrency
                  )
              ).toFixed(2)
            }
          : {
              toValue: parseFloat(
                state.transaction.fromValue *
                  getCorrectRate(
                    state.transaction.fromCurrency,
                    state.transaction.toCurrency
                  )
              ).toFixed(2)
            }
      });
    }

    fromCurrencyRef.current = state.transaction.fromCurrency;
    toCurrencyRef.current = state.transaction.toCurrency;
  }, [state.transaction.fromCurrency, state.transaction.toCurrency]); // eslint-disable-line react-hooks/exhaustive-deps

  const removeCharacter = (str, pos) => {
    const part1 = str.substring(0, pos);
    const part2 = str.substring(pos + 1, str.length);
    return part1 + part2;
  };

  const handleChange = event => {
    let value = event.target.value;

    if (/\.\d{3}$/.test(value)) {
      value = value.substring(0, value.length - 1);
    }

    if (/.*\..*\..*$/.test(value)) {
      value = removeCharacter(value, value.lastIndexOf("."));
    }

    if (state.transaction.fromCurrency === localWalletCurrency) {
      dispatch({
        type: "SET_TRANSACTION",
        payload: {
          fromValue: value,
          toValue: parseFloat(
            value * state.transaction.currentExchangeRate
          ).toFixed(2)
        }
      });
    } else {
      dispatch({
        type: "SET_TRANSACTION",
        payload: {
          toValue: value,
          fromValue: parseFloat(
            value *
              getCorrectRate(
                state.transaction.toCurrency,
                state.transaction.fromCurrency
              )
          ).toFixed(2)
        }
      });
    }
  };

  const activeWalletCurrency = cur => {
    thisWalletCurrency(cur);
    setLocalCurrency(cur);
  };

  const localThis = state.transaction.fromCurrency === localWalletCurrency;
  const from =
    state.transaction.fromValue === "0.00" ? "" : state.transaction.fromValue;
  const to =
    state.transaction.toValue === "0.00" ? "" : state.transaction.toValue;

  const validateNumber = event => {
    const keyCode = event.keyCode || event.which;
    const string = String.fromCharCode(keyCode);
    const regex = /[0-9.]|\./;

    if (!regex.test(string)) {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
    }
  };

  return (
    <>
      <WalletWrapper data-testid="wallet">
        <div>
          <Pocket
            initialPocketCurrency={initialWalletCurrency}
            activeWalletCurrency={activeWalletCurrency}
            bailOut={bailOutValue}
          />
        </div>
        <div>
          <ContentEditable
            html={localThis ? from.toString() : to.toString()}
            onChange={handleChange}
            onKeyPress={validateNumber}
            className={localThis ? "plus" : "minus"}
          />
        </div>
      </WalletWrapper>
    </>
  );
};

export default Wallet;
