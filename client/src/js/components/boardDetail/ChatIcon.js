import React from "react";
import styled from "styled-components";

import { Icon } from "semantic-ui-react";

const Container = styled.div`
  position: absolute;
  bottom: ${props => (props.mobile ? "1%" : "8%")};
  right: ${props => (props.mobile ? "2%" : "1%")};
`;

const ChatIcon = ({ handleChatsOpen, mobile }) => {
  return (
    <Container mobile={mobile}>
      <Icon
        circular
        size="large"
        name="users"
        link
        open
        onClick={handleChatsOpen}
      />
    </Container>
  );
};

export default ChatIcon;
