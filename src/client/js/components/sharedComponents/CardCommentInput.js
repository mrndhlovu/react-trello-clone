import React, { useState, Fragment } from "react";
import styled from "styled-components";

import { Form, Button, TextArea } from "semantic-ui-react";
import UserAvatar from "./UserAvatar";
import { getUserInitials } from "../../utils/appUtils";
import UIWrapper from "./UIWrapper";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 16fr;
  align-items: center;
  padding-bottom: 10px;
`;

const ButtonContainer = styled.div`
  margin-left: 9%;
`;

const FormWrapper = styled.div`
  margin-left: 20px;
`;

const CardCommentInput = ({ comment, saveComment, user }) => {
  const [newComment, setNewComment] = useState(null);
  const [focus, setFocus] = useState(false);

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSaveClick = () => {
    const id = comment ? comment.id : null;
    saveComment(newComment, id);
    setNewComment(null);
    setFocus(false);
  };

  return (
    <Fragment>
      <Container>
        <UIWrapper padding="10px 0 10px 10px">
          <UserAvatar padding="18px" userInitials={getUserInitials(user)} />
        </UIWrapper>
        <FormWrapper>
          <Form>
            <Form.Field>
              <TextArea
                rows={1}
                id="comment-input"
                placeholder={comment ? comment : "Write a comment"}
                onFocus={() => setFocus(true)}
                onBlur={() => !newComment && setFocus(false)}
                onChange={(e) => handleChange(e)}
              />
            </Form.Field>
          </Form>
        </FormWrapper>
      </Container>
      {focus && (
        <ButtonContainer>
          <Button
            content="Save"
            positive
            size="tiny"
            onClick={() => handleSaveClick()}
          />
        </ButtonContainer>
      )}
    </Fragment>
  );
};

export default CardCommentInput;