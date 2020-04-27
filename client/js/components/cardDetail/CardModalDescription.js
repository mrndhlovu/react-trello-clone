import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _debounce from "debounce";

import { Header, Icon, TextArea, Form, Button } from "semantic-ui-react";
import CardDetailHeader from "../sharedComponents/CardDetailHeader";
import CardDetailSegment from "../sharedComponents/CardDetailSegment";

const StyledHeader = styled(Header)`
  font-size: 16px !important;
`;

const Description = styled.div`
  margin-left: 33px;
`;

const StyledTextArea = styled(TextArea)`
  background-color: #091e420a !important;
`;

const ButtonsWrapper = styled.div`
  margin-top: 10px;
`;

const DescriptionContent = styled.div`
  margin-bottom: 60px;
`;

const DescriptionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardModalDescription = ({
  board,
  handleBoardUpdate,
  listPosition,
  activeCard,
}) => {
  const [hideSaveButton, setHideSaveButton] = useState(true);
  const [description, setDescription] = useState(activeCard.description);
  const [editing, setEditing] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    let newBoard;

    newBoard = {
      ...board,
      lists: [
        ...board.lists.map((list) =>
          list.position === listPosition
            ? {
                ...list,
                cards: [
                  ...list.cards.map((card) =>
                    card.position === activeCard.position
                      ? { ...card, description }
                      : { ...card }
                  ),
                ],
              }
            : list
        ),
      ],
    };

    description && handleBoardUpdate(newBoard, "lists", "description");
    setHideSaveButton(!hideSaveButton);
    setUpdated(true);
  };

  useEffect(() => {
    if (!updated) return;
    setEditing(false);
  }, [updated, activeCard, description]);

  return (
    <CardDetailSegment>
      <StyledHeader>
        <DescriptionHeader>
          <CardDetailHeader
            description="Description"
            icon="align left"
            flipped="vertically"
          />

          <Button
            onClick={() => setEditing(!editing)}
            size="tiny"
            content="Edit"
            floated="right"
          />
        </DescriptionHeader>
      </StyledHeader>
      <Description>
        {editing && (
          <Form>
            <StyledTextArea
              placeholder="Add a more detailed description"
              defaultValue={description}
              onFocus={() => setHideSaveButton(!hideSaveButton)}
              onBlur={_debounce(() => setHideSaveButton(!hideSaveButton), 500)}
              onChange={(e) => handleChange(e)}
            />
            {!hideSaveButton && (
              <ButtonsWrapper>
                <Button
                  content="Save"
                  positive
                  size="tiny"
                  onClick={() => handleSave()}
                />
                <Icon
                  onClick={() => setHideSaveButton(!hideSaveButton)}
                  name="close"
                />
              </ButtonsWrapper>
            )}
          </Form>
        )}

        {description && !editing && (
          <DescriptionContent>
            <p>{description}</p>
          </DescriptionContent>
        )}
      </Description>
    </CardDetailSegment>
  );
};

export default CardModalDescription;
