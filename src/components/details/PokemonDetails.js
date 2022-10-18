import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Icon } from "semantic-ui-react";
import { loadPokemonDetails } from "../../redux/actions/asyncactions/fetchPokemonDetails";
import { DescriptionFooter } from "./DescriptionFooter";
import "./styles/PokemonDetails.scss";

const PokemonDetails = ({
  setModalOpen,
  selectedPokemon,
  pokemonImage,
  formatedId,
  closePokemonDetailsPage,
}) => {
  const [open, setOpen] = React.useState(false);
  const [readMoreStr, setReadMoreStr] = React.useState("");
  const [openReadMore, setOpenReadMore] = React.useState(false);
  const [detailedDescription, setDetailedDescription] = React.useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(loadPokemonDetails(selectedPokemon.id));
  }, []);

  /**
   * set pokemon description modal open
   */
  useEffect(() => {
    setOpen(setModalOpen);
  }, [setModalOpen]);

  /**
   * on load required data of pokemon like species and strengths update modal
   */
  useEffect(() => {
    const combinedDescription = [];
    state.pokemonSpeciesDetails?.flavor_text_entries?.map((textEntry) => {
      if (textEntry.language.name === "en") {
        const modifiedStr = textEntry.flavor_text.replace(/[^a-zA-Z ]/g, " ");
        if (!combinedDescription.includes(modifiedStr)) {
          combinedDescription.push(modifiedStr);
        }
      }
    });
    const updatedStr = combinedDescription.join(" ").trim();
    const truncateStr = updatedStr.substring(0, 850);
    const remianingStr = updatedStr.substring(850);
    setReadMoreStr(remianingStr);
    setDetailedDescription(truncateStr);
  }, [state.pokemonSpeciesDetails, state.pokemonStrengthsDetails]);

  return (
    <Modal
      onClose={() => {
        setOpen(false);
        closePokemonDetailsPage(false);
      }}
      onOpen={() => setOpen(true)}
      open={open}
      className="detailspage"
      onClick={() => setOpenReadMore(false)}
    >
      <Modal.Content>
        <div className="mobileHeader">
          <div>
            {selectedPokemon.name}
            <br></br>
            {formatedId}
          </div>
          <Icon
            name="times circle outline"
            onClick={() => {
              setOpen(false);
              closePokemonDetailsPage(false);
            }}
          ></Icon>
        </div>

        <div className="displayImg">{pokemonImage}</div>
        <div>
          <div className="detailsHeader">
            <div>{selectedPokemon.name}</div>
            <div className="verticaldivider"></div>
            <div>{formatedId}</div>
            <div className="verticaldivider"></div>
            <Icon
              name="times circle outline"
              onClick={() => {
                setOpen(false);
                closePokemonDetailsPage(false);
              }}
            ></Icon>
          </div>
          <span>
            {detailedDescription}{" "}
            <a
              className="clicktoreadmoreBtn"
              onClick={(e) => {
                e.stopPropagation();
                setOpenReadMore(!openReadMore);
              }}
            >
              read more
            </a>
            <div
              className="readmorePopup"
              on="click"
              onClose={() => setOpenReadMore(false)}
              onOpen={() => setOpenReadMore(true)}
              open={openReadMore}
              trigger={<a>read more</a>}
              content={readMoreStr}
              basic
              position="bottom left"
              style={{ display: openReadMore ? "block" : "none" }}
            >
              {readMoreStr}
            </div>
          </span>
        </div>
      </Modal.Content>
      <DescriptionFooter selectedPokemon={selectedPokemon} />
    </Modal>
  );
};

export default PokemonDetails;
