/**
 * these are actio creators used to dispatch actions to store
 *
 */

export const getPokemonList = (list) => {
  return {
    type: "GET_POKEMON_LIST",
    payload: list,
  };
};

export const storeTotalCount = (count) => {
  return {
    type: "STORE_COUNT",
    payload: count,
  };
};

export const storeCurrentOffset = (count) => {
  return {
    type: "STORE_CURRENT_COUNT",
    payload: count,
  };
};

export const storePokemonTypes = (list) => {
  return {
    type: "STORE_POKEMON_TYPE",
    payload: list,
  };
};
export const storeFilteredResults = (list) => {
  return {
    type: "STORE_FILTERED_RESULTS",
    payload: list,
  };
};
export const storeIsFilterApplied = (flag) => {
  return {
    type: "STORE_IS_FILTER_APPLIED",
    payload: flag,
  };
};
export const removeFilterCriteriafromState = (criteria) => {
  return {
    type: "REMOVE_FILTER_CRITERIA",
    payload: criteria,
  };
};
export const storeFilterCriteriatoState = (criteria) => {
  return {
    type: "STORE_FILTER_CRITERIA",
    payload: criteria,
  };
};
export const storeFilterCriteriatoCacheState = (criteria) => {
  return {
    type: "STORE_FILTER_CRITERIA_TO_CACHE",
    payload: criteria,
  };
};

export const storePokemonSpeciesDetails = (details) => {
  return {
    type: "STORE_POKEMON_SPECIES_DETAILS",
    payload: details,
  };
};
export const storePokemonStrengthsDetails = (details) => {
  return {
    type: "STORE_POKEMON_STRENGTHS_DETAILS",
    payload: details,
  };
};
export const storecachedFilterData = (list) => {
  return {
    type: "STORE_CACHED_FILTER_DATA",
    payload: list,
  };
};
export const updateView = (flag) => {
  return {
    type: "UPDATE_VIEW",
    payload: flag,
  };
};
export const setLoader = (flag) => {
  return {
    type: "SET_LOADING",
    payload: flag,
  };
};
export const storeMobileFilterCriteriaToState = (keys) => {
  return {
    type: "STORE_MOBILE_FILTER_KEYS",
    payload: keys,
  };
};
