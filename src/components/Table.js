import React, { useState } from "react";
import {
  Box,
  Container,
  Modal,
  Typography,
  makeStyles,
} from "@material-ui/core";
import styled, { css } from "styled-components";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PokemonDetails from "./PokemonDetails";

const CustomTable = styled.table`
  margin: 0 auto;
  border-spacing: 0 1px;
  color: #1a5cb0;
`;
const Header = styled.thead``;
const Row = styled.tr`
  font-size: 17px;
  text-transform: uppercase;
  font-weight: 600;
  background: #f4f4f4;
  &&:hover {
    background: #1a5cb0;
  }
`;
const HeaderCol = styled.th`
  min-width: 110px;
  background: #f9e01d;
  height: 50px;
  font-size: 16x;
  font-weight: 800;
  font-style: italic;
`;
const Column = styled.td`
  padding-left: 10px;
`;
const ColumnId = styled.td`
  padding-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;
const ColumnType = styled.td`
  padding-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Body = styled.tbody``;
const StyledType = styled.span`
  font-weight: 600;
`;
const Centered = styled.span`
  display: flex;
  justify-content: center;
`;
const ColumnName = styled.td`
  padding-left: 10px;
  ${Row}:hover & {
    color: #f9e01d;
  }
`;

const WeightandMore = styled.span`
  cursor: pointer;
  display: flex;
  justify-content: center;
  ${Row}:hover & {
    &::before {
      content: "więcej>";
      color: #f9e01d;
      text-transform: lowercase;
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  modal: {},
  paper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 3),
  },
  modalText: {
    color: theme.palette.text.secondary,
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
}));

const Table = ({ filteredPokemons, pokemons }) => {
  const [open, setOpen] = useState(false);
  const [PokemonId, setPokemonId] = useState("");
  const [Pokemon, setPokemon] = useState("");
  const classes = useStyles();

  const ShowMoreHandler = (pokemon, id) => {
    setPokemonId(id);
    setPokemon(pokemon);
    setOpen(true);
  };

  const handleModal = () => {
    setOpen(!open);
  };

  const headers = [
    {
      id: 1,
      title: "ID",
    },
    {
      id: 2,
      title: "POKEMON",
    },
    {
      id: 3,
      title: "NAZWA",
    },
    {
      id: 4,
      title: "MIN.LVL",
    },
    {
      id: 5,
      title: "TYP",
    },
    {
      id: 6,
      title: "WAGA",
    },
  ];

  return (
    <div>
      <CustomTable>
        <Header>
          <Row>
            {headers.map((header) => (
              <HeaderCol keys={header.id}>{header.title}</HeaderCol>
            ))}
          </Row>
        </Header>
        <Body>
          {filteredPokemons.map((pokemon) => (
            <Row keys={pokemon.id}>
              <ColumnId>
                <StyledType>{pokemon.id}</StyledType>
              </ColumnId>
              <Column>
                <img src={pokemon.sprites.front_default} alt="" />
              </Column>
              <ColumnName>{pokemon.name}</ColumnName>
              <Column>
                <Centered>{pokemon.base_experience}</Centered>
              </Column>
              <ColumnType>
                <StyledType> {pokemon.types[0].type.name}</StyledType>
              </ColumnType>
              <Column>
                <WeightandMore
                  onClick={() => ShowMoreHandler(pokemon, pokemon.id)}
                >
                  {pokemon.weight}
                </WeightandMore>
              </Column>
            </Row>
          ))}
        </Body>
      </CustomTable>
      <Modal
        className={classes.modal}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        open={open}
        onClose={handleModal}
      >
        <div>
          <PokemonDetails
            PokemonId={PokemonId}
            Pokemon={Pokemon}
            pokemons={pokemons}
            filteredPokemons={filteredPokemons}
            onClose={handleModal}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Table;
