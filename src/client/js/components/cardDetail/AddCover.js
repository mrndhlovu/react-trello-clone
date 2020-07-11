import React, { useState, Fragment } from "react";

import { Button } from "semantic-ui-react";

import AddCoverImage from "./AddCoverImage";
import DropdownButton from "../sharedComponents/DropdownButton";
import UIMessage from "../sharedComponents/UIMessage";
import UIWrapper from "../sharedComponents/UIWrapper";
import UIDivider from "../sharedComponents/UIDivider";
import UIContainer from "../sharedComponents/UIContainer";
import { useCardDetailContext } from "../../utils/hookUtils";

const AddCover = ({ color, buttonSize, upward = true }) => {
  const { hasCover, handleRemoveCover } = useCardDetailContext();

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
          <UIMessage
            success={true}
            fontSize="11px"
            margin="10px 10px"
            message="Seems you don't have card covers. Lets add one now!"
          />

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
          <AddCoverImage />

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

export default AddCover;
