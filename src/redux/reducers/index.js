const initialState = {
  pokemonList: [],
  totalCount: 0,
  currentOffset: 0,
  pokemonTypes: [],
  filteredresults: [],
  isFilteredApplied: false,
  filterCriteria: [],
  cachedKeys: [],
  pokemonSpeciesDetails: null,
  pokemonStrengthsDetails: null,
  cachedFilterData: [],
  updateView: false,
  mobileFilterKeys: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case "UPDATE_VIEW": {
      return {
        ...state,
        updateView: action.payload,
      };
    }
    case "GET_POKEMON_LIST":
      return {
        ...state,
        pokemonList: action.payload,
      };
    case "STORE_COUNT":
      return {
        ...state,
        totalCount: action.payload,
      };
    case "STORE_CURRENT_COUNT":
      return {
        ...state,
        currentOffset: action.payload,
      };
    case "STORE_POKEMON_TYPE":
      return {
        ...state,
        pokemonTypes: action.payload,
      };
    case "STORE_FILTERED_RESULTS":
      return {
        ...state,
        filteredresults: action.payload,
      };
    case "STORE_IS_FILTER_APPLIED":
      return {
        ...state,
        isFilteredApplied: action.payload,
      };
    case "REMOVE_FILTER_CRITERIA":
      return {
        ...state,
        filterCriteria: action.payload,
      };
    case "STORE_FILTER_CRITERIA":
      return {
        ...state,
        filterCriteria: action.payload,
      };
    case "STORE_FILTER_CRITERIA_TO_CACHE":
      return {
        ...state,
        cachedKeys: action.payload,
      };

    //pokemon details
    case "STORE_POKEMON_SPECIES_DETAILS":
      return {
        ...state,
        pokemonSpeciesDetails: action.payload,
      };
    case "STORE_POKEMON_STRENGTHS_DETAILS":
      return {
        ...state,
        pokemonStrengthsDetails: action.payload,
      };
    case "STORE_CACHED_FILTER_DATA":
      return {
        ...state,
        cachedFilterData: action.payload,
      };
    case "STORE_MOBILE_FILTER_KEYS":
      return {
        ...state,
        mobileFilterKeys: action.payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
