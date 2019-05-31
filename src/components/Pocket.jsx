import React, { useState, useEffect, useContext, useCallback } from "react";
import styled from "styled-components";

import { ExchangeContext } from "../context/ExchangeContext";

const BalanceInfo = styled.div`
  padding: 2% 1%;
  font-size: 0.6em;
  color: #777;
`;

const Pocket = ({ initialPocketCurrency, activeWalletCurrency, bailOut }) => {
  const { state } = useContext(ExchangeContext);
  const [walletData] = useState(state.walletData);
  const [pocketCurrency, setPocketCurrency] = useState(initialPocketCurrency);
  const [pocketData, setPocketData] = useState(state.walletData);

  const memoizedUpdatePocketData = useCallback(
    param => {
      const pocketBalance = walletData.filter(p => {
        return p.currency === param;
      });
      setPocketData(pocketBalance[0]);
    },
    [walletData]
  );

  useEffect(() => {
    memoizedUpdatePocketData(pocketCurrency);
    activeWalletCurrency(pocketCurrency);
  }, [memoizedUpdatePocketData, pocketCurrency, activeWalletCurrency]);

  useEffect(() => {
    if (bailOut !== undefined) {
      setPocketCurrency(bailOut);
    }
  }, [bailOut]);

  const { symbol, balance } = pocketData;

  return (
    <>
      <select
        value={pocketCurrency}
        onChange={e => setPocketCurrency(e.target.value)}
      >
        {walletData.map(v => {
          return (
            <option key={v.currency} value={v.currency}>
              {v.currency}
            </option>
          );
        })}
      </select>

      <BalanceInfo>
        <small>Balance:</small> {symbol}
        {balance}
      </BalanceInfo>
    </>
  );
};

export default Pocket;
