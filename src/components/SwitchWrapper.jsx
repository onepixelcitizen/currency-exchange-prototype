import React, { useState } from "react";
import styled from "styled-components";

import SwitchButton from "../components/SwitchButton";
import ExchangeRate from "../components/ExchangeRate";
import Notification from "../components/Notification";
import ExchangeButton from "../components/ExchangeButton";

const Wrapper = styled.div`
  position: relative;
  width: 50vw;
  display: flex;
  flex-direction: ${props =>
    props.swapPositions ? "column-reverse" : "column"}
  font-weight: normal;
  background: rgb(247,247,247);
  background: linear-gradient(0deg, rgba(247,247,247,1) 50%, rgba(255,255,255,1) 50%);
  border-radius: 4px;
  color: #282b34;

  button {
    & + button {
      position: absolute;
      bottom: -50px;
    }
  }

  .notification {
    position: absolute;
    top: 31%;
    right: 0%;
  }

`;

function SwitchWrapper({ children, walletOneCurrency, walletTwoCurrency }) {
  const [toggle, setToggle] = useState();

  return (
    <Wrapper swapPositions={toggle}>
      {children}
      <ExchangeRate />
      <Notification />
      <SwitchButton
        walletOneCurrency={walletOneCurrency}
        walletTwoCurrency={walletTwoCurrency}
        toggleValue={setToggle}
      />
      <ExchangeButton />
    </Wrapper>
  );
}

export default SwitchWrapper;
