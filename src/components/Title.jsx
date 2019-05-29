import React from "react";
import styled from "styled-components";

var TitleWrapper = styled.h1`
  font-weight: normal;
  font-size: 0.7em;
  color: #4e5465;
`;

function Title({ children }) {
  return <TitleWrapper>{children}</TitleWrapper>;
}

export default Title;
