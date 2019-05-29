import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { ExchangeContext } from "../context/ExchangeContext";

const ToggleButton = styled.button`
  position: absolute;
  top: 41%;
  right: -12px;
  padding: 2px 7px;
  background: #fff;
  border: none;
  border-radius: 30px;
  outline: none;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0px 0px 0px 3px #282b34;
  transition: all 0.2s;

  @media (min-width: 900px) {
    padding: 5px 10px;
    right: -14px;
  }

  &:hover {
    background: #4caf4f;
    color: #fff;
  }
`;

const SwitchButton = ({
  toggleValue,
  walletOneCurrency,
  walletTwoCurrency
}) => {
  const { state, dispatch } = useContext(ExchangeContext);
  const [toggle, updateToggle] = useState(true);

  const handleToggle = () => {
    updateToggle(!toggle);
    toggleValue(toggle);
  };

  useEffect(() => {
    dispatch({
      type: "SET_TRANSACTION",
      payload: {
        fromCurrency: toggle ? walletOneCurrency : walletTwoCurrency,
        toCurrency: toggle ? walletTwoCurrency : walletOneCurrency,
        flipped: toggle ? false : true
      }
    });
  }, [toggle, dispatch, walletOneCurrency, walletTwoCurrency]);

  useEffect(() => {
    dispatch({
      type: "SET_TRANSACTION",
      payload: {
        fromValue: state.transaction.toValue,
        toValue: state.transaction.fromValue
      }
    });
  }, [toggle, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return <ToggleButton onClick={handleToggle}>↕</ToggleButton>;
};

export default SwitchButton;
