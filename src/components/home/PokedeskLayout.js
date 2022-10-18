import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, GridRow, GridColumn, Icon, Input } from "semantic-ui-react";
import PokemonCard from "./PokemonCard";
import CustomDropdown from "./CustomDropdown";
import {
  FILTER_TYPE_GENDER,
  FILTER_TYPE_TYPE,
} from "../../constants/constants";
import "./styles/PokedeskLayout.scss";
import { Loader } from "../Loader";
import MobileFilter from "./MobileFilter";

const PokedeskLayout = ({ pokemonList, loadPokemonList, searchPokemon }) => {
  const state = useSelector((state) => state);
  const [openMobileFilter, setOpenMobileFilter] = useState(false);

  /**
   * on scroll pokemon list fetch next page data
   * @param {*} e
   */
  const onScrollList = (e) => {
    const totalScrollHeight = e.target.scrollHeight - e.target.clientHeight;
    if (parseInt((e.target.scrollTop / totalScrollHeight) * 100) === 90) {
      loadPokemonList();
    }
  };

  return (
    <>
      <Grid divied="vertically" className="headercontainer">
        <GridRow className="rowone">
          <GridColumn className="header">Pokédex</GridColumn>
          <GridColumn className="verticaldivider"></GridColumn>
          <GridColumn className="headerdescription">
            Searh for any Pokémon that exist on the planet
          </GridColumn>
        </GridRow>
        <GridRow className="rowtwo">
          <GridColumn width={7}>
            <div className="label">Search by</div>
            <Input
              fluid
              icon="search"
              className="searchbox"
              placeholder="Name or Number"
              onChange={searchPokemon}
            />
          </GridColumn>

          <GridColumn className="responsivedropdown" width={4}>
            <div className="label">Type</div>
            <CustomDropdown filterType={FILTER_TYPE_TYPE}></CustomDropdown>
          </GridColumn>

          <GridColumn className="responsivedropdown" width={4}>
            <div className="label">Gender</div>
            <CustomDropdown filterType={FILTER_TYPE_GENDER}></CustomDropdown>
          </GridColumn>

          <GridColumn className="hamburgermenu">
            <Icon
              name="sliders"
              size="big"
              onClick={() => setOpenMobileFilter(true)}
            ></Icon>
          </GridColumn>
        </GridRow>

        <GridRow id="scrollableDiv" onScroll={onScrollList}>
          {!state.isLoading || pokemonList.length > 0 ? (
            pokemonList.map((pokemon) => {
              return <PokemonCard pokemon={pokemon} key={pokemon.id} />;
            })
          ) : (
            <Loader />
          )}
        </GridRow>

        {openMobileFilter && (
          <MobileFilter
            open={openMobileFilter}
            closeFilterModal={() => setOpenMobileFilter(false)}
          ></MobileFilter>
        )}
      </Grid>
    </>
  );
};

export default memo(PokedeskLayout);
