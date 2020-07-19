import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";

import { Button } from "semantic-ui-react";

import { useCardDetailContext } from "../../utils/hookUtils";
import AddCoverImage from "./AddCoverImage";
import DropdownButton from "../sharedComponents/DropdownButton";
import UIContainer from "../sharedComponents/UIContainer";
import UIDivider from "../sharedComponents/UIDivider";
import UIWrapper from "../sharedComponents/UIWrapper";

const AddCover = ({ color, buttonSize, upward = true }) => {
  const {
    hasCover,
    handleRemoveCover,
    handleMakeCover,
  } = useCardDetailContext();

  const [addCover, setAddCover] = useState(false);

  return (
    <DropdownButton
      icon="image"
      buttonText="Cover"
      header="Cover"
      callback={() => setAddCover(false)}
      color={color}
      size={buttonSize}
      upward={upward}
      className="add-cover-dropdown"
    >
      {!hasCover && !addCover ? (
        <UIContainer width="300px">
          <div className="wordWrap padded">
            <span>Seems you don't have card covers. Lets add one now!</span>
          </div>

          <Button
            content="Add cover"
            positive
            fluid
            size="tiny"
            onClick={() => setAddCover(true)}
          />
        </UIContainer>
      ) : (
        <UIWrapper className="add-image-container">
          <AddCoverImage handleMakeCover={handleMakeCover} />

          {hasCover && (
            <Fragment>
              <UIDivider />
              <Button
                content="Remove Cover"
                fluid
                compact
                onClick={() => handleRemoveCover()}
              />
            </Fragment>
          )}
        </UIWrapper>
      )}
    </DropdownButton>
  );
};

AddCover.propTypes = {
  buttonSize: PropTypes.string,
  color: PropTypes.string,
  upward: PropTypes.bool,
};

export default AddCover;
