import React from "react";
import styled, { css } from "styled-components";
import { Card } from "@material-ui/core";

const Pagination = ({ totalpokemons, pokemonsPerPage, switchPage }) => {
  const Nav = styled.nav``;
  const List = styled.ul`
    display: flex;
    flex-direction: row;
    padding: 5px;
    align-items: center;
    justify-content: center;
  `;
  const Page = styled.ul`
    padding: 5px;
    background: #f9e01d;
    width: 40px;
    height: 40px;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    &&:hover {
      background: #1a5cb0;
    }
  `;
  const Link = styled.a`
    text-decoration: none;
    font-size: 20px;
    font-weight: 800;
    color: #1a5cb0;
    ${Page}:hover & {
      color: #f9e01d;
    }
  `;
  const arrNumbers = [];
  for (let i = 1; i <= Math.ceil(totalpokemons / pokemonsPerPage); i++) {
    arrNumbers.push(i);
  }
  return (
    <List>
      {arrNumbers.map((pageNumber) => (
        <Page key={pageNumber}>
          <Link onClick={() => switchPage(pageNumber)} href="!#">
            {pageNumber}
          </Link>
        </Page>
      ))}
    </List>
  );
};

export default Pagination;
