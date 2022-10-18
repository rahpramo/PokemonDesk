import axios from "axios";
import { getGender } from "../../../utils/utils";
import {
  getPokemonList,
  removeFilterCriteriafromState,
  setLoader,
  storecachedFilterData,
  storeCurrentOffset,
  storeFilterCriteriatoCacheState,
  storeFilterCriteriatoState,
  storeFilteredResults,
  storeIsFilterApplied,
  storeMobileFilterCriteriaToState,
  storePokemonTypes,
  storeTotalCount,
  updateView,
} from "../actioncreator/actionCreator";

/**
 * fetching pokemon list and corresponding details
 * @param {*} offset
 * @param {*} limit
 * @returns pokemon list
 */
export const initiateGetPokemonList = (offset = 0, limit = 20) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const endPoints = [];
      const pokemonList = [...state.pokemonList];
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );

      if (response.data.results && response.data.results.length > 0) {
        response.data.results.map((poke) => {
          endPoints.push(poke.url);
        });
      }
      await axios
        .all(endPoints.map((endpoint) => axios.get(endpoint)))
        .then((detailedList) => {
          detailedList.map((pokedetails) => pokemonList.push(pokedetails.data));
        });
      dispatch(getPokemonList(pokemonList));
      dispatch(storeTotalCount(response.data.count));
      dispatch(storeCurrentOffset(state.currentOffset + 20));
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * fetch pokemon types for filter
 * @returns pokemon types to store
 */
export const getPokemonTypes = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/type");
      if (response.data.results && response.data.results.length > 0) {
        dispatch(storePokemonTypes(response.data.results));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

/**
 * filered list based on type and retun filter result
 * @param {*} url
 * @returns filtered data and filter flag
 */
export const filterPokemonListonType = (url) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const endPoints = [];
      dispatch(setLoader(true));
      const pokemonList = [];
      const response = await axios.get(url);
      if (response.data.pokemon && response.data.pokemon.length > 0) {
        if (response.data.pokemon && response.data.pokemon.length > 0) {
          response.data.pokemon.map((poke) => {
            endPoints.push(poke?.pokemon?.url);
          });
        }
      }
      await axios
        .all(endPoints.map((endpoint) => axios.get(endpoint)))
        .then((detailedList) => {
          detailedList.map((pokedetails) => pokemonList.push(pokedetails.data));
        });
      dispatch(storeFilteredResults(pokemonList));
      dispatch(
        storecachedFilterData([...state.cachedFilterData, ...pokemonList])
      );
      dispatch(setLoader(false));
    } catch (err) {
      dispatch(setLoader(false));
      console.log(err);
    }
  };
};
/**
 * filered list based on gender and retun filter result
 * @param {*} url
 * @returns filtered data and filter flag
 */
export const filterPokemonListonGender = (genderId) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const endPoints = [];
      const gender = getGender(genderId);
      dispatch(setLoader(true));

      const pokemonList = [];
      const response = await axios.get(
        `https://pokeapi.co/api/v2/gender/${genderId}`
      );
      if (
        response.data.pokemon_species_details &&
        response.data.pokemon_species_details.length > 0
      ) {
        response.data.pokemon_species_details.map((poke) => {
          const species_url = poke?.pokemon_species?.url;
          const pokeId = species_url
            .split("pokemon-species/")[1]
            .replace("/", "");
          endPoints.push(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
        });
      }

      await axios
        .all(endPoints.map((endpoint) => axios.get(endpoint)))
        .then((detailedList) => {
          detailedList.map((pokedetails) =>
            pokemonList.push({ ...pokedetails.data, gender: gender })
          );
        });
      dispatch(setLoader(false));
      console.log(pokemonList, "from fetch on gender");
      dispatch(storeFilteredResults(pokemonList));
      dispatch(
        storecachedFilterData([...state.cachedFilterData, ...pokemonList])
      );
    } catch (err) {
      dispatch(setLoader(false));
      console.log(err);
    }
  };
};
/**
 * remove filter criteria on uncheck
 * @param {*} filterKey
 * @returns updated filter criteria list
 */
export const removeFilterCriteria = (filterKey) => {
  return async (dispatch, getState) => {
    const state = getState();
    const criteria = state.filterCriteria.filter((ct) => ct !== filterKey);
    if (criteria.length === 0) {
      dispatch(storeIsFilterApplied(false));
    }
    dispatch(removeFilterCriteriafromState(criteria));
  };
};
/**
 * add filter criteria on check
 * @param {*} filterKey
 * @returns updated filter criteria list
 */
export const storeFilterCriteria = (filterKey) => {
  return async (dispatch, getState) => {
    const state = getState();
    let criteria = [];
    if (Array.isArray(filterKey)) {
      criteria = [...filterKey];
    } else {
      if (!state.filterCriteria.includes(filterKey)) {
        criteria = [...state.filterCriteria, filterKey];
      }
    }
    dispatch(storeFilterCriteriatoState(criteria));
    dispatch(storeIsFilterApplied(true));
  };
};

/**
 * maintain used filter to avoid refetching on selecting same filter again
 * @param {*} filterKey
 * @returns cached filter keys
 */
export const storeFilterCriteriatoCache = (filterKey) => {
  return async (dispatch, getState) => {
    const state = getState();
    let criteria = [];
    if (Array.isArray(filterKey)) {
      criteria = [...filterKey];
    } else {
      criteria = [...state.cachedKeys, filterKey];
    }
    dispatch(storeFilterCriteriatoCacheState(criteria));
  };
};

export const applyMobileFilterCriteria = (mobilefilterKeys) => {
  return async (dispatch, getState) => {
    const state = getState();
    if (
      mobilefilterKeys["typeKeys"] &&
      mobilefilterKeys["typeKeys"].length > 0
    ) {
      mobilefilterKeys["typeKeys"].forEach((url) =>
        dispatch(filterPokemonListonType(url))
      );
    }
    if (mobilefilterKeys["genderKeys"] && mobilefilterKeys["genderKeys"] > 0) {
      mobilefilterKeys["genderKeys"].forEach((genderId) =>
        dispatch(filterPokemonListonGender(genderId))
      );
    }
    // const criteria = [...state.mobileFilterKeys, filterKey];
    //dispatch(storeMobileFilterCriteriaToState(criteria));
  };
};
