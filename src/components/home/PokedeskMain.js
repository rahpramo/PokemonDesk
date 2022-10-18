import React from "react";
import { useEffect } from "react";
import PokedeskLayout from "./PokedeskLayout";
import { useDispatch, useSelector } from "react-redux";
import { initiateGetPokemonList } from "../../redux/actions/asyncactions/fetchPokemon";
import {
  storeFilteredResults,
  storeIsFilterApplied,
} from "../../redux/actions/actioncreator/actionCreator";
import { getGender } from "../../utils/utils";
export const PokedeskMain = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    loadPokemonList();
  }, []);

  /**
   * intiate fetching pokemon list
   * @param {*} offset
   * @returns
   */
  const loadPokemonList = (offset = 0) => {
    if (state.isFilteredApplied) return false;
    dispatch(initiateGetPokemonList(offset));
  };

  /**
   * search functionality using name or id
   */
  const handleSearchChange = React.useCallback((e, data) => {
    if (!data.value) {
      dispatch(storeIsFilterApplied(false));
    } else {
      const pokedexList = state.pokemonList.filter((pokemon) => {
        return (
          pokemon.name.startsWith(data.value) ||
          pokemon.id === Number(data.value)
        );
      });
      dispatch(storeFilteredResults(pokedexList));
      dispatch(storeIsFilterApplied(true));
    }
  });

  /**
   * clears any applied filter
   */
  const clearFilterResults = () => {
    dispatch(storeFilteredResults([]));
    dispatch(storeIsFilterApplied(false));
  };

  /**
   * if filter criteria previosuly checked and if pokemon list previosuly fetched
   * without refecthing pokemon list based on filter criteria use exisiting list
   *
   * @returns filtered pokemon list
   */
  const getFilterResultsWithCachedData = () => {
    const uniqIds = [];
    let pokemonlist = [];
    if (
      state.filterCriteria?.[0] &&
      state.filterCriteria[0]["typeKeys"] &&
      state.filterCriteria[0]["genderKeys"]
    ) {
      pokemonlist = [...state.filteredresults];
    } else {
      state.cachedFilterData.map((pokemon) => {
        if (pokemon.gender) {
          if (
            state.filterCriteria.includes(pokemon.gender) &&
            !uniqIds.includes(pokemon.id)
          ) {
            uniqIds.push(pokemon.id);
            pokemonlist.push(pokemon);
          }
        } else if (pokemon.types && pokemon.types.length > 0) {
          return pokemon.types.map((pokeType) => {
            if (
              state.filterCriteria.includes(pokeType.type.name) &&
              !uniqIds.includes(pokemon.id)
            ) {
              uniqIds.push(pokemon.id);
              pokemonlist.push(pokemon);
            }
          });
        }
      });
    }

    return pokemonlist;
  };
  const getPokemonInitialList = () => {
    return state.pokemonList;
  };
  return (
    <PokedeskLayout
      pokemonList={
        state.isFilteredApplied
          ? getFilterResultsWithCachedData()
          : getPokemonInitialList()
      }
      loadPokemonList={() => {
        loadPokemonList(state.currentOffset);
      }}
      searchPokemon={handleSearchChange}
    />
  );
};
