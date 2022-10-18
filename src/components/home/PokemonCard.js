import React, { memo, useState } from "react";
import { Card, Image } from "semantic-ui-react";
import { getbackgroundGradient } from "../../utils/utils";
import PokemonDetails from "../details/PokemonDetails";
import "./styles/PokemonCard.scss";

const PokemonCard = ({ pokemon }) => {
  const [pokemonDetailsPage, setPokemonDetailsPage] = useState(false);
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
  const backgroundGradient = getbackgroundGradient(pokemon.types);
  const formatedId = pokemon.id.toString().padStart(3, 0);
  return (
    <>
      <Card
        centered
        style={{ background: backgroundGradient }}
        onClick={() => setPokemonDetailsPage(true)}
      >
        <Image
          className="pokemonimage"
          src={url}
          wrapped
          ui={false}
          alt="Pokemon Image"
          loading="lazy"
        />
        <Card.Content>
          <Card.Header>{pokemon.name}</Card.Header>
          <Card.Meta>
            <span className="date">{formatedId}</span>
          </Card.Meta>
        </Card.Content>
      </Card>
      {pokemonDetailsPage && (
        <PokemonDetails
          closePokemonDetailsPage={setPokemonDetailsPage}
          setModalOpen={pokemonDetailsPage}
          selectedPokemon={pokemon}
          pokemonImage={
            <Card centered style={{ background: backgroundGradient }}>
              <Image className="pokemonimage" src={url} wrapped ui={false} />
            </Card>
          }
          formatedId={formatedId}
        />
      )}
    </>
  );
};

export default memo(PokemonCard);
