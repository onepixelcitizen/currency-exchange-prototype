import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { ExchangeContext } from "../context/ExchangeContext";

const Wrapper = styled.div`
  color: #e91d63;
  padding: 7px 20px;
  font-size: 0.5em;
  display: ${props => (props.showHide ? "block" : "none")};
`;

const Notification = () => {
  const { state, dispatch } = useContext(ExchangeContext);
  const [showHide, setShowHide] = useState(false);

  useEffect(() => {
    const wallet = state.walletData.find(
      wallet => wallet.currency === state.transaction.fromCurrency
    );
    if (wallet !== undefined) {
      const checkBalance =
        wallet.balance < parseFloat(state.transaction.fromValue) ? true : false;
      setShowHide(checkBalance);
      dispatch({
        type: "SET_BALANCE_STATUS",
        payload: { exceedsBalance: checkBalance }
      });
    }
  }, [state, dispatch]);

  return (
    <Wrapper showHide={showHide} className="notification">
      Exceeds balance
    </Wrapper>
  );
};

export default Notification;
