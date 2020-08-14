import React from "react";
import styled, { css } from "styled-components";

const Button = styled.button`
  font-size: "14px";
`;
const Button = ({ OnClickHandler, children }) => {
  return <Button onClick={OnClickHandler}>{children}</Button>;
};

export default Button;
