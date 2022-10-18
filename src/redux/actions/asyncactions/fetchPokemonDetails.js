import axios from "axios";
import {
  storePokemonSpeciesDetails,
  storePokemonStrengthsDetails,
} from "../actioncreator/actionCreator";

/**
 * fetch pokemon decsription and details
 * @param {*} id
 * @returns pokemon decsription and other details
 */
export const loadPokemonDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      let endpoints = [
        `https://pokeapi.co/api/v2/pokemon-species/${id}`,
        ` https://pokeapi.co/api/v2/type/${id}`,
      ];

      axios.all(endpoints.map((url) => axios.get(url))).then(
        axios.spread((species, strengths) => {
          if ((species.data, strengths.data)) {
            dispatch(storePokemonSpeciesDetails(species.data));
            dispatch(storePokemonStrengthsDetails(strengths.data));
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};
