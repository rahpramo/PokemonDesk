import { colorConstants } from "../constants/constants";

/**
 *
 * @param {*} types array
 * @returns background color gradient for pokemon card
 */
export const getbackgroundGradient = (types) => {
  const colorcodes = [];
  types &&
    types.map((poketype) => {
      colorcodes.push(colorConstants[poketype.type.name]);
    });
  if (colorcodes.length > 1) {
    return `linear-gradient(180deg, ${colorcodes[0]} 0%, ${colorcodes[1]} 100%)`;
  } else {
    return colorcodes[0];
  }
};

/**
 *
 * @returns gender obj
 */
export const genderMap = () => {
  return {
    2: "Male",
    1: "Female",
    3: "Genderless",
  };
};

/**
 *
 * @param {*} genderId
 * @returns gender label
 */
export const getGender = (genderId) => {
  const genderObj = genderMap();
  return genderObj[genderId];
};
