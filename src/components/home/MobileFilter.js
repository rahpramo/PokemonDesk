import React, { useState, memo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Icon, Input, Button } from "semantic-ui-react";
import {
  FILTER_TYPE_GENDER,
  FILTER_TYPE_TYPE,
} from "../../constants/constants";
import { storeIsFilterApplied } from "../../redux/actions/actioncreator/actionCreator";
import {
  applyMobileFilterCriteria,
  storeFilterCriteria,
  storeFilterCriteriatoCache,
} from "../../redux/actions/asyncactions/fetchPokemon";
import CustomDropdown from "./CustomDropdown";
import "./styles/MobileFilter.scss";
const MobileFilter = ({ open, closeFilterModal }) => {
  const dispatch = useDispatch();
  const [openTypeDropdown, setTypeOpenDropdown] = useState(false);
  const [openGenderDropdown, setGenderOpenDropdown] = useState(false);
  const [mobileFilterKeys, setMobileFilterKeys] = useState({});

  const applyFilter = () => {
    dispatch(applyMobileFilterCriteria(mobileFilterKeys));
    dispatch(storeFilterCriteria(mobileFilterKeys));
    dispatch(storeFilterCriteriatoCache(mobileFilterKeys));
    closeFilterModal();
  };
  const addMobileFilterKeys = (data, type) => {
    let keys = { typeKeys: [], genderKeys: [] };
    if (data.checked) {
      if (type === FILTER_TYPE_TYPE) {
        keys["typeKeys"] = [...keys["typeKeys"], data.value];
      } else {
        keys["genderKeys"] = [...keys["genderKeys"], data.value];
      }
    } else {
      if (type === FILTER_TYPE_TYPE) {
        keys["typeKeys"] = [
          ...keys["typeKeys"].filter((criteria) => criteria != data.value),
        ];
      } else {
        keys["genderKeys"] = [
          ...keys["genderKeys"].filter((criteria) => criteria != data.value),
        ];
      }
    }
    setMobileFilterKeys(keys);
  };

  const resetFilter = () => {
    dispatch(storeFilterCriteria([]));
    dispatch(storeFilterCriteriatoCache([]));
    dispatch(storeIsFilterApplied(false));
    closeFilterModal();
  };
  return (
    <Modal
      onClose={() => closeFilterModal()}
      open={open}
      closeIcon
      className="mobilefilter"
    >
      <Modal.Header>Filters</Modal.Header>
      <Modal.Content data-dropdownkey="dropdownel">
        <Input
          label={{ basic: true, content: "Type" }}
          labelPosition="left"
          placeholder="Type"
          icon={!openTypeDropdown ? "plus circle" : "minus circle"}
          className="typefilter"
          value=""
          onClick={() => {
            setTypeOpenDropdown(!openTypeDropdown);
          }}
        />
        {openTypeDropdown && (
          <CustomDropdown
            openDropdown={openTypeDropdown}
            fromMobile={true}
            filterType={FILTER_TYPE_TYPE}
            addMobileFilterKeys={addMobileFilterKeys}
          />
        )}
        <Input
          label={{ basic: true, content: "Gender" }}
          labelPosition="left"
          placeholder="Type"
          icon={!openGenderDropdown ? "plus circle" : "minus circle"}
          value=""
          onClick={() => {
            setGenderOpenDropdown(!openGenderDropdown);
          }}
          className="genderfilter"
        />
        {openGenderDropdown && (
          <CustomDropdown
            openDropdown={openGenderDropdown}
            fromMobile={true}
            filterType={FILTER_TYPE_GENDER}
            addMobileFilterKeys={addMobileFilterKeys}
          />
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => resetFilter()}>Reset</Button>
        <Button onClick={() => closeFilterModal()}>Cancel</Button>
        <Button onClick={() => applyFilter()} positive>
          Apply
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default memo(MobileFilter);
