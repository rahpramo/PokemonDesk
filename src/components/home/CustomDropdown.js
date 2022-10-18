import React, { useState, memo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "semantic-ui-react";
import {
  FILTER_TYPE_GENDER,
  FILTER_TYPE_TYPE,
} from "../../constants/constants";
import {
  filterPokemonListonGender,
  filterPokemonListonType,
  getPokemonTypes,
  removeFilterCriteria,
  storeFilterCriteria,
  storeFilterCriteriatoCache,
} from "../../redux/actions/asyncactions/fetchPokemon";
import "./styles/CustomDropdown.scss";

const CustomDropdown = ({
  filterType,
  isFilteredApplied,
  fromMobile,
  openDropdown,
  addMobileFilterKeys,
}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    loadPokemonTypes();
  }, []);

  useEffect(() => {
    setOpen(openDropdown);
  }, [openDropdown]);
  /**
   *fetch pokemon types
   * @param {*} offset
   * @returns
   */
  const loadPokemonTypes = () => {
    if (isFilteredApplied) return false;
    dispatch(getPokemonTypes());
  };

  /**
   * when click outside of dropdown close dropdown
   */
  const appContainer = document.querySelector(".App");
  if (appContainer) {
    appContainer.addEventListener("click", (e) => {
      if (!e.target.parentElement.classList.contains("checkbox")) {
        open && setOpen(false);
      } else {
        return false;
      }
    });
  }

  const applyTypeFilter = (e, data) => {
    if (fromMobile) {
      addMobileFilterKeys(data, FILTER_TYPE_TYPE);
    } else {
      filterOnType(e, data);
    }
  };
  const filterOnType = (e, data) => {
    if (data.checked && !state.cachedKeys.includes(data.label)) {
      dispatch(filterPokemonListonType(data.value));
      dispatch(storeFilterCriteria(data.label));
      dispatch(storeFilterCriteriatoCache(data.label));
    } else if (data.checked) {
      dispatch(storeFilterCriteria(data.label));
    } else {
      dispatch(removeFilterCriteria(data.label));
    }
  };
  /**
   * type options for filter
   */
  const typeOptions = (
    <div className="dropdownmenu">
      {state.pokemonTypes &&
        state.pokemonTypes.length > 0 &&
        state.pokemonTypes.map((type, id) => (
          <Checkbox
            key={id}
            label={type.name}
            onChange={(e, data) => {
              applyTypeFilter(e, data);
            }}
            value={type.url}
            // checked={typefilterCriteria?.includes(type.url)}
          />
        ))}
    </div>
  );

  const applyGenderFilter = (e, data) => {
    if (fromMobile) {
      addMobileFilterKeys(data, FILTER_TYPE_GENDER);
    } else {
      filterOnGender(e, data);
    }
  };
  /**
   * filter main list on selected gender
   * @param {*} e
   * @param {*} data
   */
  const filterOnGender = (e, data) => {
    if (data.checked && !state.cachedKeys.includes(data.label)) {
      dispatch(filterPokemonListonGender(data.value));
      dispatch(storeFilterCriteria(data.label));
      dispatch(storeFilterCriteriatoCache(data.label));
    } else if (data.checked) {
      dispatch(storeFilterCriteria(data.label));
    } else {
      dispatch(removeFilterCriteria(data.label));
    }
  };
  /**
   * default gender options for filter
   */
  const genderOptions = (
    <div className="dropdownmenu">
      <Checkbox
        label="Male"
        onChange={(e, data) => {
          applyGenderFilter(e, data);
        }}
        value={2}
        //   checked={typefilterCriteria?.includes(2)}
      />
      <Checkbox
        label="Female"
        onChange={(e, data) => {
          applyGenderFilter(e, data);
        }}
        value={1}
        //     checked={genderfilterCriteria?.includes(1)}
      />
      <Checkbox
        label="Genderless"
        onChange={(e, data) => {
          applyGenderFilter(e, data);
        }}
        value={3}
        //   checked={genderfilterCriteria?.includes(3)}
      />
    </div>
  );
  const filterList = (
    <div
      className={open ? "open dropdowncontent" : " dropdowncontent"}
      data-dropdownkey="dropdownel"
    >
      {filterType === FILTER_TYPE_TYPE ? typeOptions : genderOptions}
    </div>
  );

  const mobilefilterList = (
    <div
      className={open ? "open dropdowncontent" : " dropdowncontent"}
      data-dropdownkey="dropdownel"
    >
      {filterType === FILTER_TYPE_TYPE ? typeOptions : genderOptions}
    </div>
  );

  return !fromMobile ? (
    <div className="desktopdropdown" data-dropdownkey="dropdownel">
      <button
        className="dropbtn"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {filterType === FILTER_TYPE_TYPE ? (
          <>
            Normal + <strong>5 More</strong>
          </>
        ) : (
          <>
            Male + <strong>2 More</strong>
          </>
        )}
      </button>
      {filterList}
    </div>
  ) : (
    mobilefilterList
  );
};

export default memo(CustomDropdown);
