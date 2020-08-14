import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 1600px;
  padding: 40px;
  margin: 0 auto;
  flex-direction: row;
`;
const Img = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: end;
  margin-top: 130px;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Img>
        <img src="../images/pokebackground.png"></img>
      </Img>
      {children}
    </Wrapper>
  );
};

export default Layout;
