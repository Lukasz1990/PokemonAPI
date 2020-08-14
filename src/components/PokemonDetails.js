import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import {
  Box,
  Container,
  Card,
  Typography,
  makeStyles,
} from "@material-ui/core";

const Wrapper = styled.div`
  display: flex;
  min-width: 1200px;
  padding: 40px;
  margin: 0 auto;
  flex-direction: column;
  background: #ffff;
  height: 70vh;
`;
const Img = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Col = styled.div`
  min-width: 300px;
  margin-top: 50px;
`;
const Content = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CustomTable = styled.table`
  min-width: 350px;

  margin: 0 auto;
  border-spacing: 2px;
  color: #1a5cb0;
`;
const Header = styled.thead``;
const Row = styled.tr`
  font-size: 17px;
  text-transform: uppercase;
  font-weight: 600;
  background: #f4f4f4;
  border-spacing: 1px 1px;
`;
const HeaderCol = styled.th`
  min-width: 350px;
  background: #f9e01d;
  height: 40px;
  font-size: 16x;
  font-weight: 800;
  font-style: italic;
  color: #1a5cb0;
`;
const Column = styled.td`
  padding-left: 10px;
  margin: 5px;
`;
const ImgCol = styled.td`
  padding-left: 10px;
  margin: 5px;
  margin-top: -15px;
`;
const Title = styled.span`
  margin: 5px;
  margin-top: 10px;
  font-size: 40px;
  font-weight: 800;
  font-style: italic;
  color: #1a5cb0;
  text-transform: uppercase;
  margin-left: 20px;
`;
const TitleContainer = styled.div``;
const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px;
`;
const Buttons = styled.span`
  background: #f9e01d;
  width: 150px;
  height: 30px;
  font-size: 16x;
  font-weight: 800;
  font-style: italic;
  color: #1a5cb0;
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  padding-top: 5px;
  margin-left: 20px;
  margin-right: 20px;
`;

const Body = styled.tbody``;

const PokemonDetails = ({ PokemonId }) => {
  const [switchPokemon, setSwitchPokemon] = useState(PokemonId);
  const POKEMON_URL = `https://pokeapi.co/api/v2/pokemon/${switchPokemon}`;
  const [fetchedPokemon, setFetchedPokemon] = useState("");
  const [stats, setStats] = useState("");
  const filteredStats = stats.slice(1);
  useEffect(() => {
    async function fetchPokemons() {
      const response = await axios(POKEMON_URL);

      const data = await response.data;
      setFetchedPokemon(data);

      setStats(data.stats);
    }
    fetchPokemons();
  }, [POKEMON_URL]);

  const statsHeaders = [
    {
      id: 1,
      title: "ATAK",
    },
    {
      id: 2,
      title: "OBRONA",
    },
    {
      id: 3,
      title: "SP.ATAK",
    },
    {
      id: 4,
      title: "SP.OBRONA",
    },
    {
      id: 5,
      title: "ŻYCIE",
    },
  ];
  return (
    <Wrapper>
      <Container>
        <Box>
          <Img>
            <img src="../images/pokemon.png"></img>
          </Img>
        </Box>

        <Content>
          <Col>
            <Header>
              <Row>
                <HeaderCol>Przyrosty</HeaderCol>
              </Row>
            </Header>
            <CustomTable>
              <Body>
                <Row>
                  <Column>
                    {statsHeaders.map((header) => (
                      <Row key={header.id}>{header.title}</Row>
                    ))}
                  </Column>

                  {filteredStats &&
                    filteredStats.map((stat, i) => (
                      <Row key={i}>+{stat.base_stat}</Row>
                    ))}
                </Row>
              </Body>
            </CustomTable>
          </Col>
          <ImgCol>
            {fetchedPokemon && (
              <Img>
                <img
                  src={fetchedPokemon.sprites.front_default}
                  width="300"
                  height="300"
                />
              </Img>
            )}
            <BottomContainer>
              <Buttons onClick={() => setSwitchPokemon(switchPokemon - 1)}>
                Powrót
              </Buttons>
              <TitleContainer>
                <Title>{fetchedPokemon.id}</Title>
                <Title>{fetchedPokemon.name}</Title>
              </TitleContainer>

              <Buttons onClick={() => setSwitchPokemon(switchPokemon + 1)}>
                Następny
              </Buttons>
            </BottomContainer>
          </ImgCol>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default PokemonDetails;
