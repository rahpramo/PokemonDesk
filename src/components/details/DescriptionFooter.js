import { useSelector } from "react-redux";
import { getGender } from "../../utils/utils";
import { colorConstants } from "../../constants/constants";
import "./styles/PokemonDetails.scss";
export const DescriptionFooter = ({ selectedPokemon }) => {
  const state = useSelector((state) => state);
  return (
    <div className="footerData">
      <div>
        Height<div>{selectedPokemon.height}</div>
      </div>
      <div>
        Weight<div>{selectedPokemon.weight}</div>
      </div>
      <div>
        Gender(s)
        <div>{getGender(state.pokemonSpeciesDetails?.gender_rate)}</div>
      </div>
      <div>
        Egg Groups
        <div>
          {state.pokemonSpeciesDetails?.egg_groups?.map((eggGroups, id) => (
            <span key={id}>{eggGroups.name}&nbsp;</span>
          ))}
        </div>
      </div>
      <div>
        Abilities
        <div>
          {selectedPokemon.abilities?.map((abilityObj, id) => (
            <span key={id}>{abilityObj.ability.name}&nbsp;</span>
          ))}
        </div>
      </div>
      <div>
        Types{" "}
        <div>
          {selectedPokemon.types?.map((typeObj, id) => (
            <span
              key={id}
              style={{
                background: colorConstants[typeObj.type.name],
                border: "1px solid #2E3156",
                padding: "4px",
              }}
            >
              {typeObj.type.name}&nbsp;
            </span>
          ))}
        </div>
      </div>
      <div>
        Weak Against
        <div>
          {state.pokemonStrengthsDetails?.damage_relations[
            "double_damage_from"
          ]?.map((damage, id) => (
            <span
              key={id}
              style={{
                background: colorConstants[damage.name],
                border: "1px solid #2E3156",
                padding: "4px",
              }}
            >
              {damage.name}&nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
