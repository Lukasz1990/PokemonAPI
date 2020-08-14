import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import Table from "./Table";
import Pagination from "./Pagination";
const Container = styled.div`
  max-width: 700px;
`;
const Img = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const Main = () => {
  const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon?limit=60&offset=60";
  const [pokemons, setPokemons] = useState("");
  const [pokemonsPerPage, setPokemonsPerPage] = useState(10);
  const [currentPage, setSetCurrentPage] = useState(1);
  const lastPokemon = currentPage * pokemonsPerPage;
  const firstPokemon = lastPokemon - pokemonsPerPage;
  const filteredPokemons = pokemons.slice(firstPokemon, lastPokemon);

  useEffect(() => {
    async function fetchPokemons() {
      const response = await axios(POKEMON_URL);

      const data = await response.data;
      const results = data.results;
      const newData = await Promise.all(
        results.map((pokemon) => {
          return pokemon.url;
        })
      );
      getAllData(newData);
    }
    fetchPokemons();
  }, []);

  const getAllData = async (newData) => {
    const fetchedPokemons = await Promise.all(
      newData.map(async (url) => {
        const resp = await axios(url);
        const data_resp = await resp.data;
        return data_resp;
      })
    );
    setPokemons(fetchedPokemons);
  };

  const switchPage = (pageNumber) => setSetCurrentPage(pageNumber);

  return (
    <Container>
      <Img>
        <img src="../images/pokemon.png"></img>
      </Img>
      {pokemons ? (
        <Table filteredPokemons={filteredPokemons} pokemons={pokemons} />
      ) : null}
      <Pagination
        totalpokemons={pokemons.length}
        pokemonsPerPage={pokemonsPerPage}
        switchPage={switchPage}
      />
    </Container>
  );
};

export default Main;
